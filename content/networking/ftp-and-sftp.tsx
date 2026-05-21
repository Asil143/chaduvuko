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

const protocols = [
  { name: 'FTP', port: '21 (ctrl) + dynamic (data)', encrypted: '❌ No', auth: 'Username/password in cleartext', useCase: 'Legacy; avoid for anything sensitive', active: true },
  { name: 'FTPS', port: '990 (implicit TLS) / 21 + STARTTLS', encrypted: '✓ TLS', auth: 'Username/password over TLS', useCase: 'FTP with TLS; NAT-unfriendly', active: false },
  { name: 'SFTP', port: '22 (SSH)', encrypted: '✓ SSH encryption', auth: 'SSH key or password', useCase: 'Preferred for secure file transfer', active: false },
  { name: 'SCP', port: '22 (SSH)', encrypted: '✓ SSH encryption', auth: 'SSH key or password', useCase: 'Simple file copy; no resume/directory listing', active: false },
  { name: 'rsync over SSH', port: '22 (SSH)', encrypted: '✓ SSH encryption', auth: 'SSH key', useCase: 'Delta sync; only transfers changed portions', active: false },
]

function ProtocolComparison() {
  const [selected, setSelected] = useState<string | null>(null)
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 24, margin: '32px 0', overflowX: 'auto' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: N, fontFamily: 'var(--font-mono)', margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '.1em' }}>File Transfer Protocol Comparison</p>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr>{['Protocol', 'Port', 'Encrypted?', 'Auth', 'Best For'].map(h => <th key={h} style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--muted)', fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', borderBottom: '1px solid var(--border)' }}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {protocols.map(p => (
            <tr key={p.name} onClick={() => setSelected(selected === p.name ? null : p.name)} style={{ background: selected === p.name ? `${N}08` : 'transparent', cursor: 'pointer', borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '10px 12px', fontWeight: 700, color: N, fontFamily: 'var(--font-mono)' }}>{p.name}</td>
              <td style={{ padding: '10px 12px', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)' }}>{p.port}</td>
              <td style={{ padding: '10px 12px', color: p.encrypted.startsWith('✓') ? N : '#ef4444' }}>{p.encrypted}</td>
              <td style={{ padding: '10px 12px', color: 'var(--text)', fontSize: 12 }}>{p.auth}</td>
              <td style={{ padding: '10px 12px', color: 'var(--muted)', fontSize: 12 }}>{p.useCase}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function FTPAndSFTPModule() {
  return (
    <LearnLayout
      title="FTP and SFTP — File Transfer Protocols"
      description="FTP is one of the internet's oldest protocols. SFTP replaced it for secure use. Understanding both — and why FTP's dual-connection model is a security and firewall nightmare — makes you a better network engineer."
      section="Networking Fundamentals"
      readTime="14 min"
      updatedAt="May 2026"
    >
      <Part n="01" title="FTP: The Original File Transfer Protocol" />
      <P><Hl>FTP (File Transfer Protocol)</Hl>, RFC 959 (1985), predates TLS, NAT, and modern security models. It uses <Hl>two separate TCP connections</Hl>: a control connection on port 21 (commands: USER, PASS, LIST, RETR, STOR, QUIT) and a data connection on port 20 (active mode) or a negotiated dynamic port (passive mode). This dual-connection design is the source of most FTP headaches.</P>

      <H>Active vs Passive FTP</H>
      <P>In <Hl>active mode</Hl>, the server initiates the data connection back to the client's IP and port. This breaks behind NAT (the client's private IP isn't routable from the server) and requires the client's firewall to accept inbound connections. In <Hl>passive mode</Hl>, the server listens on a dynamic high port and the client connects to it. Passive mode works through NAT but requires the server's firewall to allow a wide range of inbound high ports — typically 49152–65535. Most modern FTP deployments use passive mode.</P>

      <Err title="Using FTP for anything security-sensitive">
        FTP sends credentials and data in cleartext. USERNAME and PASSWORD are visible in packet captures. The data itself is transmitted unencrypted. Any network observer (ISP, attacker on the same network, MITM) can read everything. SFTP (over SSH) provides the same functionality with full encryption. There is no justification for using plain FTP over a network you don't completely control.
      </Err>

      <ProtocolComparison />

      <HR />
      <Part n="02" title="SFTP: Secure File Transfer via SSH" />
      <P><Hl>SFTP (SSH File Transfer Protocol)</Hl>, defined in the IETF SECSH working group drafts, is a completely different protocol from FTP — it runs as a subsystem of SSH, not as FTP with encryption. SFTP provides: directory listings, file upload/download, rename, delete, permissions, and resumable transfers — all over a single SSH connection on port 22. Authentication uses SSH keys or passwords, both encrypted in the SSH tunnel.</P>
      <P>SFTP is the right choice for: automated file sync (CI/CD artifact deployment, backup jobs), customer file upload portals, EDI (Electronic Data Interchange) with business partners, and any scenario requiring secure, authenticated file access. Tools: sftp command line, FileZilla, Cyberduck, WinSCP, Python paramiko library, rsync with <code style={{ fontSize: 13 }}>-e ssh</code>.</P>

      <H>rsync for Efficient Transfers</H>
      <P><Hl>rsync</Hl> over SSH is the gold standard for synchronizing large file collections. rsync's delta-transfer algorithm calculates checksums for file blocks and only transfers changed blocks — copying 1 TB of files where only 1 MB changed transfers only the 1 MB delta. rsync also handles directory recursion, symbolic links, permissions preservation, and deletion of files removed on source. Command: <code style={{ fontSize: 13, background: `${N}15`, color: N, padding: '2px 6px', borderRadius: 4 }}>rsync -avz --delete src/ user@host:/dst/</code>.</P>

      <ProTip>
        For SFTP key-based auth on a restricted account (e.g., only file access, no shell), set the shell to <code style={{ fontSize: 12 }}>/usr/sbin/nologin</code> and configure SSH with a <code style={{ fontSize: 12 }}>Match User sftp-user</code> block: <code style={{ fontSize: 12, background: `${N}15`, color: N, padding: '2px 5px', borderRadius: 4 }}>ForceCommand internal-sftp</code> restricts the user to SFTP only, <code style={{ fontSize: 12, background: `${N}15`, color: N, padding: '2px 5px', borderRadius: 4 }}>ChrootDirectory /srv/sftp/%u</code> jails them to their directory.
      </ProTip>

      <HR />
      <Part n="03" title="Interview Questions" />
      <IQ q="Why does FTP use two connections and what problems does this cause?">
        FTP uses a control connection (port 21) for commands and responses, and a separate data connection for actual file transfers. This separation was a design choice to keep the command channel responsive while a large file transferred. Problems: NAT breaks active mode (server tries to connect back to a private IP); firewalls must track the FTP protocol state to allow the dynamic data port; passive mode requires a range of high ports open on the server's firewall; stateful firewalls must implement FTP ALG (Application Layer Gateway) to inspect the control channel and dynamically allow the data port.
      </IQ>
      <IQ q="What's the difference between SFTP and FTPS?">
        SFTP is an entirely separate protocol from FTP — it runs as a subsystem of SSH on port 22. Not related to FTP at all despite the similar name. FTPS is FTP with TLS added — either explicit (STARTTLS upgrade on port 21) or implicit (TLS from the start on port 990). FTPS still has FTP's dual-connection architecture with all its NAT and firewall complications, now plus TLS certificate management. SFTP over SSH is simpler: one port (22), one connection, built-in key-based auth, no firewall complications. For new deployments, always prefer SFTP over FTPS.
      </IQ>

      <HR />
      <Part n="04" title="Key Terminology" />
      <Term t="FTP active mode">Server initiates data connection to client. Breaks behind NAT; requires client firewall to accept inbound.</Term>
      <Term t="FTP passive mode">Client initiates data connection to server's dynamic port. Works through NAT but requires wide server firewall open.</Term>
      <Term t="SFTP">SSH File Transfer Protocol — runs over SSH port 22; single connection; full encryption; key-based auth.</Term>
      <Term t="rsync">Efficient file sync tool using delta transfer (only changed blocks); commonly run over SSH.</Term>
      <Term t="FTP ALG">Application Layer Gateway — stateful firewall feature that inspects FTP control channel to dynamically allow data ports.</Term>

      <KeyTakeaways items={[
        'FTP uses two connections: control (port 21) and data (port 20/dynamic). This dual-channel design causes NAT and firewall complications.',
        'Plain FTP sends credentials and data in cleartext — never use it over untrusted networks.',
        'SFTP runs over SSH (port 22), not related to FTP despite the name — single connection, encrypted, key-based auth.',
        'Passive FTP is required behind NAT; active FTP breaks because the server can\'t initiate back to a private IP.',
        'rsync over SSH is the best tool for syncing large file sets — only transfers changed file blocks (delta algorithm).',
      ]} />
    </LearnLayout>
  )
}
