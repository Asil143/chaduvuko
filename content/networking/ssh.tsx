'use client'

import { useState } from 'react'
import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

const N = '#10b981'

const Part = ({ n, title }: { n: string; title: string }) => (
  <div style={{ marginBottom: 28 }}>
    <p style={{ fontSize: 11, color: N, fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 8px', letterSpacing: '.1em' }}>// Part {n}</p>
    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,3vw,30px)', fontWeight: 900, letterSpacing: '-1.5px', color: 'var(--text)', margin: 0 }}>{title}</h2>
  </div>
)
const P = ({ children }: { children: React.ReactNode }) => <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, margin: '0 0 18px' }}>{children}</p>
const H = ({ children }: { children: React.ReactNode }) => <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', margin: '32px 0 12px' }}>{children}</h3>
const Hl = ({ children }: { children: React.ReactNode }) => <strong style={{ color: N }}>{children}</strong>
const HR = () => <div style={{ borderTop: '1px solid var(--border)', margin: '48px 0' }} />
const ProTip = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: `${N}08`, border: `1px solid ${N}20`, borderRadius: 10, padding: '16px 20px', margin: '24px 0' }}>
    <p style={{ fontSize: 11, fontWeight: 700, color: N, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 8px' }}>Pro Tip</p>
    <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.85, margin: 0 }}>{children}</p>
  </div>
)
const Err = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ background: '#ef444408', border: '1px solid #ef444430', borderRadius: 10, padding: '16px 20px', margin: '24px 0' }}>
    <p style={{ fontSize: 11, fontWeight: 700, color: '#ef4444', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 8px' }}>Common Mistake — {title}</p>
    <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.85, margin: 0 }}>{children}</p>
  </div>
)
const IQ = ({ q, children }: { q: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: 40 }}>
    <div style={{ background: `${N}10`, border: `1px solid ${N}25`, borderRadius: '8px 8px 0 0', padding: '14px 18px', fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>Q: {q}</div>
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: 'none', borderRadius: '0 0 8px 8px', padding: '18px', fontSize: 14, color: 'var(--text)', lineHeight: 1.9 }}>{children}</div>
  </div>
)
const Term = ({ t, children }: { t: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', gap: 12, marginBottom: 16, alignItems: 'flex-start' }}>
    <code style={{ fontSize: 12, background: `${N}15`, color: N, padding: '3px 8px', borderRadius: 5, flexShrink: 0, marginTop: 2 }}>{t}</code>
    <span style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>{children}</span>
  </div>
)

const sshFeatures = [
  { name: 'Remote shell', cmd: 'ssh user@host', desc: 'Interactive terminal session on remote host' },
  { name: 'Execute command', cmd: 'ssh user@host "df -h"', desc: 'Run single command and return output, then disconnect' },
  { name: 'File copy (SCP)', cmd: 'scp file.txt user@host:/path/', desc: 'Secure copy over SSH; deprecated in favor of rsync/SFTP' },
  { name: 'SFTP', cmd: 'sftp user@host', desc: 'SSH-based FTP alternative; interactive file transfer' },
  { name: 'Local port forward', cmd: 'ssh -L 8080:internal:80 user@jump', desc: 'Forward localhost:8080 → jump host → internal:80. Access internal services through bastion.' },
  { name: 'Remote port forward', cmd: 'ssh -R 2222:localhost:22 user@public', desc: 'Forward public:2222 → your machine:22. Expose local service via remote server.' },
  { name: 'Dynamic SOCKS proxy', cmd: 'ssh -D 1080 user@host', desc: 'Create a SOCKS5 proxy on localhost:1080. Configure browser to tunnel all traffic.' },
  { name: 'Multiplexing', cmd: 'ControlMaster auto\nControlPath /tmp/ssh-%r@%h:%p', desc: 'SSH config: reuse existing connection for new sessions — faster logins, one auth.' },
  { name: 'Jump host', cmd: 'ssh -J jump.example.com internal-server', desc: 'Connect through a bastion/jump host to reach servers behind it.' },
  { name: 'Key-based auth', cmd: 'ssh-keygen -t ed25519', desc: 'Generate Ed25519 key pair; copy public key to ~/.ssh/authorized_keys on server.' },
]

function SSHFeatureExplorer() {
  const [selected, setSelected] = useState<string | null>(null)
  const entry = sshFeatures.find(f => f.name === selected)

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: N, fontFamily: 'var(--font-mono)', margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '.1em' }}>SSH Use Cases</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
        {sshFeatures.map(f => (
          <button key={f.name} onClick={() => setSelected(selected === f.name ? null : f.name)} style={{ background: selected === f.name ? N : 'var(--bg)', color: selected === f.name ? '#000' : 'var(--text)', border: `1px solid ${selected === f.name ? N : 'var(--border)'}`, borderRadius: 6, padding: '6px 12px', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>{f.name}</button>
        ))}
      </div>
      {entry ? (
        <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 8, padding: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: N, marginBottom: 8 }}>{entry.name}</div>
          <pre style={{ fontSize: 12, color: N, background: `${N}10`, padding: '8px 12px', borderRadius: 6, fontFamily: 'var(--font-mono)', margin: '0 0 10px', lineHeight: 1.6, overflowX: 'auto' }}>{entry.cmd}</pre>
          <div style={{ fontSize: 13, color: 'var(--muted)' }}>{entry.desc}</div>
        </div>
      ) : (
        <div style={{ fontSize: 13, color: 'var(--muted)', textAlign: 'center', padding: '20px 0' }}>Click a use case to see the command and explanation</div>
      )}
    </div>
  )
}

export default function SSHModule() {
  return (
    <LearnLayout
      title="SSH — Secure Shell"
      description="SSH replaced Telnet, rsh, and rlogin overnight by making all terminal access encrypted by default. Today it is the backbone of all server administration, DevOps automation, and secure tunneling."
      section="Networking Fundamentals"
      readTime="18 min"
      updatedAt="May 2026"
    >
      <Part n="01" title="What SSH Is and How It Works" />
      <P>
        <Hl>SSH (Secure Shell)</Hl>, defined in RFC 4251–4256 (SSH-2, 2006), provides encrypted remote login, command execution, file transfer, and port forwarding. It replaced Telnet (cleartext), rsh (unauthenticated), and rlogin (host-based trust only) in the mid-1990s. SSH runs on port 22 (TCP) and consists of three layered protocols: the <Hl>Transport Layer Protocol</Hl> (key exchange, server authentication, encryption), the <Hl>User Authentication Protocol</Hl> (client authentication), and the <Hl>Connection Protocol</Hl> (multiplexed channels for shell, SFTP, port forwards).
      </P>
      <P>
        The SSH handshake: (1) Client connects to server port 22. (2) Both sides exchange version strings. (3) Key exchange (Diffie-Hellman or ECDH) establishes a shared secret; symmetric session keys are derived. (4) Server presents its host key (RSA/ECDSA/Ed25519) — client verifies it against known_hosts. (5) Client authenticates (password or public key). (6) Encrypted session begins. All subsequent communication is encrypted with symmetric keys (AES-256-GCM or ChaCha20-Poly1305 in modern SSH).
      </P>

      <SSHFeatureExplorer />

      <HR />
      <Part n="02" title="Key-Based Authentication" />

      <H>Generating and Using Keys</H>
      <P>
        Password authentication is convenient but vulnerable to brute force and credential stuffing. <Hl>Public key authentication</Hl> is far more secure: the private key (kept on your machine, never transmitted) proves your identity to the server which holds your public key. The server sends a challenge encrypted with the public key; only the correct private key can decrypt it. No password is transmitted.
      </P>
      <P>
        Generate a modern key pair: <code style={{ fontSize: 13, background: `${N}15`, color: N, padding: '2px 6px', borderRadius: 4 }}>ssh-keygen -t ed25519 -C "email@example.com"</code>. Ed25519 is preferred over RSA (shorter keys, faster, more secure). RSA at 4096 bits is also acceptable; RSA-1024 is completely broken. Never use DSA (deprecated). The private key (~/.ssh/id_ed25519) must have permissions 600; the public key (~/.ssh/id_ed25519.pub) goes into ~/.ssh/authorized_keys on the server.
      </P>

      <H>known_hosts and TOFU</H>
      <P>
        When you connect to a server for the first time, SSH asks: "The authenticity of host '...' can't be established... Are you sure you want to continue?" This is <Hl>Trust On First Use (TOFU)</Hl> — you're trusting the server's host key fingerprint on first connection and caching it in ~/.ssh/known_hosts. Subsequent connections verify the server presents the same host key. If the key changes (server reinstalled, or MITM attack), SSH warns loudly: "WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!"
      </P>
      <P>
        In automation and CI/CD, this interactive check is a problem. Solutions: use <code style={{ fontSize: 13 }}>ssh-keyscan</code> to pre-populate known_hosts from a trusted network, or use <code style={{ fontSize: 13 }}>StrictHostKeyChecking=accept-new</code> in SSH config for first connections only. Never use <code style={{ fontSize: 13 }}>StrictHostKeyChecking=no</code> (disabled verification) in production — it defeats the entire authentication chain.
      </P>

      <Err title="Using root SSH with password authentication">
        Allowing root login with password auth on SSH is one of the most common server compromises. Any server exposed to the internet receives thousands of brute-force attempts per day at port 22. Fix: disable password authentication entirely (<code style={{ fontSize: 13 }}>PasswordAuthentication no</code>), disable root login (<code style={{ fontSize: 13 }}>PermitRootLogin no</code>), use key-based auth exclusively, change the default port (security through obscurity but reduces noise), and use fail2ban or ufw rate limiting.
      </Err>

      <HR />
      <Part n="03" title="SSH Tunneling and Port Forwarding" />

      <H>Local Port Forwarding</H>
      <P>
        <code style={{ fontSize: 13, background: `${N}15`, color: N, padding: '2px 6px', borderRadius: 4 }}>ssh -L 5432:db.internal:5432 user@bastion.example.com</code>: Connects to bastion, then from bastion connects to db.internal:5432. Your local machine listens on 5432; any connection to localhost:5432 is forwarded through the encrypted SSH tunnel to db.internal:5432. Your developer can run psql -h localhost -p 5432 against the production database through the tunnel — no VPN needed.
      </P>

      <H>SSH Agent and Agent Forwarding</H>
      <P>
        <code style={{ fontSize: 13 }}>ssh-agent</code> runs as a background daemon, holding your private key in memory. When SSH needs to authenticate, it asks the agent — your private key is never exposed outside the agent. <Hl>Agent forwarding</Hl> (<code style={{ fontSize: 13 }}>ssh -A</code>) allows a remote server to use your local agent for further SSH hops — you can SSH from bastion to internal server using your local private key, without copying the private key to the bastion. Security caveat: anyone with root on the bastion can abuse the forwarded agent. Use only on trusted bastion hosts; consider jump hosts (<code style={{ fontSize: 13 }}>-J</code>) as a safer alternative.
      </P>

      <ProTip>
        Create an SSH config file (~/.ssh/config) to store host aliases: <br />
        <code style={{ fontSize: 12, display: 'block', background: `${N}10`, padding: '8px 12px', borderRadius: 6, margin: '8px 0', fontFamily: 'var(--font-mono)', lineHeight: 1.8 }}>
          Host prod-db{'\n'}
          {'  '}HostName 10.0.1.50{'\n'}
          {'  '}User deploy{'\n'}
          {'  '}IdentityFile ~/.ssh/id_ed25519_prod{'\n'}
          {'  '}ProxyJump bastion.example.com{'\n'}
          {'  '}LocalForward 5432 localhost:5432
        </code>
        Then just <code style={{ fontSize: 12, background: `${N}15`, color: N, padding: '2px 5px', borderRadius: 4 }}>ssh prod-db</code> — no flags needed.
      </ProTip>

      <HR />
      <Part n="04" title="Interview Questions" />

      <IQ q="Explain how SSH public key authentication works.">
        The server holds the user's public key in ~/.ssh/authorized_keys. During authentication: (1) Client tells server it wants to use key authentication with its public key. (2) Server verifies the public key is in authorized_keys. (3) Server generates a challenge (a random value encrypted with the client's public key). (4) Client decrypts the challenge using its private key and sends back an HMAC of the challenge and session ID. (5) Server verifies the HMAC. If correct, authentication succeeds — no password ever transmitted. The private key never leaves the client's machine (or the ssh-agent's memory if used).
      </IQ>

      <IQ q="What is SSH local port forwarding and give a practical use case?">
        Local port forwarding (<code style={{ fontSize: 13 }}>ssh -L local_port:remote_host:remote_port user@ssh_server</code>) creates a tunnel from a local port, through the SSH server, to a destination host:port accessible from the SSH server. Practical use case: accessing a production database that's firewalled from the internet but accessible from a bastion host. <code style={{ fontSize: 13 }}>ssh -L 5432:db.prod:5432 user@bastion</code> — you can then connect localhost:5432 with psql or a GUI, which travels encrypted through SSH to the bastion, then to db.prod:5432. The database only sees connections from the bastion's IP.
      </IQ>

      <HR />
      <Part n="05" title="Key Terminology" />
      <Term t="Host key">Server's long-term identity key pair. Client verifies fingerprint against known_hosts to prevent MITM.</Term>
      <Term t="authorized_keys">File on the server listing public keys allowed to authenticate. One key per line.</Term>
      <Term t="known_hosts">File on the client mapping server hostnames to their host key fingerprints.</Term>
      <Term t="SSH Agent">Background process holding private keys in memory. Eliminates repeated passphrase prompts.</Term>
      <Term t="Local forwarding">-L: Forward local port → SSH server → destination. Access internal services locally.</Term>
      <Term t="Jump host">-J bastion: SSH proxies through an intermediate bastion to reach private servers.</Term>

      <KeyTakeaways items={[
        'SSH provides encrypted remote shell, file transfer (SCP/SFTP), and port forwarding over TCP port 22.',
        'Public key authentication is more secure than passwords — never transmits the key, immune to brute force.',
        'TOFU (Trust On First Use) caches server host keys in known_hosts — a changed key triggers a security warning.',
        'Local port forwarding tunnels local ports through SSH to internal services, enabling secure access without VPN.',
        'SSH config (~/.ssh/config) centralizes connection parameters — aliases, jump hosts, key files, port forwards.',
        'Disable password auth and root login in sshd_config — use keys only, and consider non-default port to reduce log noise.',
      ]} />
    </LearnLayout>
  )
}
