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

// ── Component 1: SMTP Transaction Walkthrough ─────────────────────────────────
interface SmtpStep { id: number; dir: 'C' | 'S'; line: string; note: string }
const SMTP_STEPS: SmtpStep[] = [
  { id: 1, dir: 'S', line: '220 mail.example.com ESMTP Postfix', note: 'Server greeting (220 = service ready). Client must not send anything until receiving this.' },
  { id: 2, dir: 'C', line: 'EHLO client.sender.com', note: 'Extended HELO — announces client hostname and requests server capability list. HELO is the older, non-extended version.' },
  { id: 3, dir: 'S', line: '250-SIZE 52428800 / 250-STARTTLS / 250-AUTH LOGIN PLAIN / 250 OK', note: 'Server lists ESMTP extensions: max message size, STARTTLS availability, AUTH mechanisms. "250 OK" terminates the list.' },
  { id: 4, dir: 'C', line: 'STARTTLS', note: 'Request TLS upgrade on the existing TCP connection. After server responds 220, both sides perform the TLS handshake.' },
  { id: 5, dir: 'S', line: '220 Go ahead', note: 'TLS handshake begins immediately. All subsequent traffic is encrypted.' },
  { id: 6, dir: 'C', line: 'AUTH PLAIN AHVzZXIAcGFzcw==', note: 'Authenticate using PLAIN mechanism (base64 of \\0user\\0password). Only safe over TLS — never send credentials over plaintext SMTP.' },
  { id: 7, dir: 'S', line: '235 2.7.0 Authentication successful', note: 'Client is now authenticated and may submit the message envelope.' },
  { id: 8, dir: 'C', line: 'MAIL FROM:<sender@example.com>', note: 'Envelope sender (RFC 5321). This is what SPF checks against the sending IP. Different from the visible From: header (RFC 5322).' },
  { id: 9, dir: 'S', line: '250 2.1.0 OK', note: 'Server accepts envelope sender. May run SPF check here.' },
  { id: 10, dir: 'C', line: 'RCPT TO:<recipient@otherdomain.com>', note: 'Envelope recipient. Server checks the mailbox exists and accepts mail for this domain. Multiple RCPT TO for multiple recipients.' },
  { id: 11, dir: 'S', line: '250 2.1.5 OK', note: 'Recipient accepted.' },
  { id: 12, dir: 'C', line: 'DATA', note: 'Signal: about to send message headers and body.' },
  { id: 13, dir: 'S', line: '354 Start mail input; end with <CRLF>.<CRLF>', note: 'Server ready to receive. Client sends RFC 5322 headers + blank line + body, terminated by CRLF.CRLF.' },
  { id: 14, dir: 'C', line: 'From: sender@example.com\r\nSubject: Hello\r\n\r\nBody.\r\n.', note: 'RFC 5322 message (headers the user sees). These are separate from the SMTP envelope — an attacker can set From: to anything.' },
  { id: 15, dir: 'S', line: '250 2.0.0 OK: queued as ABC123', note: 'Message accepted into server queue. Delivery to recipient is asynchronous — SMTP guarantees accepted, not delivered.' },
  { id: 16, dir: 'C', line: 'QUIT', note: 'End session.' },
  { id: 17, dir: 'S', line: '221 2.0.0 Bye', note: 'Connection closed. TCP FIN follows.' },
]

function SmtpWalkthrough() {
  const [sel, setSel] = useState<number | null>(null)
  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: 14, padding: '28px 24px', margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: G, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 18px' }}>SMTP Session Walkthrough — click any step</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginBottom: 16 }}>
        {SMTP_STEPS.map(s => (
          <div key={s.id} onClick={() => setSel(sel === s.id ? null : s.id)}
            style={{ display: 'flex', gap: 10, padding: '7px 12px', borderRadius: 8, border: `1px solid ${sel === s.id ? G : 'var(--border)'}`, background: sel === s.id ? `${G}08` : 'transparent', cursor: 'pointer', transition: 'all 0.15s', alignItems: 'flex-start' }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: s.dir === 'C' ? '#3b82f6' : G, fontFamily: 'var(--font-mono)', minWidth: 18, flexShrink: 0, paddingTop: 2 }}>{s.dir}:</span>
            <code style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text)', flex: 1, lineHeight: 1.5 }}>{s.line.split('\r\n')[0]}</code>
          </div>
        ))}
      </div>
      {sel !== null && (() => {
        const s = SMTP_STEPS.find(x => x.id === sel)!
        return (
          <div style={{ background: `${G}08`, border: `1px solid ${G}22`, borderRadius: 10, padding: '14px 16px' }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: s.dir === 'C' ? '#3b82f6' : G, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 6px' }}>{s.dir === 'C' ? 'Client' : 'Server'}: {s.line.split('\r\n')[0]}</p>
            <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7, margin: 0 }}>{s.note}</p>
          </div>
        )
      })()}
    </div>
  )
}

// ── Component 2: Protocol Comparator ─────────────────────────────────────────
interface EmailProto { id: string; name: string; port: string; role: string; stateModel: string; multiDevice: string; storage: string; security: string; useCase: string; note: string }
const EMAIL_PROTOS: EmailProto[] = [
  { id: 'smtp', name: 'SMTP', port: '25 (MTA-MTA), 587 (submit), 465 (SMTPS)', role: 'Sending and relaying email between servers', stateModel: 'Stateless sessions — each connection is a complete transaction', multiDevice: 'N/A — sending only', storage: 'N/A — routes, does not store for user access', security: 'STARTTLS on 587 (opportunistic); MTA-STS enforces TLS; DANE/TLSA for cert pinning', useCase: 'All email sending: applications, servers, transactional mail services', note: 'Port 25 blocked by residential ISPs and cloud providers to prevent botnet spam. Always use port 587 with AUTH for application email.' },
  { id: 'imap', name: 'IMAP', port: '143 (STARTTLS), 993 (IMAPS)', role: 'Client access to mailbox stored on server', stateModel: 'Stateful: not-authenticated → authenticated → selected → logout', multiDevice: 'Yes — mail stays server-side, synced across all clients', storage: 'Server-side permanent storage until explicitly deleted', security: 'IMAPS port 993 (TLS from start) or STARTTLS on 143', useCase: 'Email clients (Thunderbird, Apple Mail, Outlook) accessing Gmail, Exchange', note: 'IMAP supports server-side search, message flags, partial fetch, IDLE push notifications, and folder management. The right choice for all modern multi-device email.' },
  { id: 'pop3', name: 'POP3', port: '110 (STARTTLS), 995 (POP3S)', role: 'Download messages from server to local client', stateModel: 'Simple: connect → auth → list/retrieve → delete → quit', multiDevice: 'No — downloads and deletes from server by default', storage: 'Minimal — messages deleted after download (configurable to keep)', security: 'POP3S port 995 (TLS from start) or STARTTLS on 110', useCase: 'Legacy single-device setups; offline-first access without server storage costs', note: 'POP3 has no folders, no flags, no server-side state, no push. Essentially deprecated in favor of IMAP for all new deployments.' },
  { id: 'exchange', name: 'Exchange/EWS/Graph', port: '443 (HTTPS API)', role: 'Full enterprise email, calendar, contacts, tasks', stateModel: 'Rich stateful sessions over HTTPS with JSON/XML API', multiDevice: 'Yes — server is single source of truth', storage: 'Full messages, calendar, contacts, task data server-side', security: 'HTTPS + OAuth 2.0 (Modern Auth). Basic Auth deprecated Oct 2022.', useCase: 'Enterprise: Outlook, Teams, Office 365 integration', note: 'Microsoft deprecated Basic Auth for Exchange in 2022. All clients must use OAuth 2.0. Legacy IMAP/POP3 still available for compatibility.' },
]
const PROTO_FIELDS: { key: keyof Omit<EmailProto, 'id' | 'name' | 'note'>; label: string }[] = [
  { key: 'port', label: 'Ports' }, { key: 'role', label: 'Role' }, { key: 'stateModel', label: 'State' },
  { key: 'multiDevice', label: 'Multi-Device' }, { key: 'storage', label: 'Storage' },
  { key: 'security', label: 'Security' }, { key: 'useCase', label: 'Use Case' },
]
const protoColor = (id: string) => id === 'smtp' ? '#f59e0b' : id === 'imap' ? G : id === 'pop3' ? '#6b7280' : '#3b82f6'

function EmailProtocolComparator() {
  const [sel, setSel] = useState('imap')
  const active = EMAIL_PROTOS.find(p => p.id === sel)!
  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: 14, padding: '28px 24px', margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: G, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 18px' }}>Email Protocol Comparator</p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 22 }}>
        {EMAIL_PROTOS.map(p => (
          <button key={p.id} onClick={() => setSel(p.id)}
            style={{ padding: '8px 16px', borderRadius: 8, border: `2px solid ${sel === p.id ? protoColor(p.id) : 'var(--border)'}`, background: sel === p.id ? `${protoColor(p.id)}12` : 'transparent', color: sel === p.id ? protoColor(p.id) : 'var(--text)', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
            {p.name}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 18 }}>
        {PROTO_FIELDS.map(f => (
          <div key={f.key} style={{ display: 'flex', gap: 14, padding: '9px 12px', borderRadius: 8, border: '1px solid var(--border)', alignItems: 'flex-start' }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.06em', minWidth: 90, flexShrink: 0, paddingTop: 2 }}>{f.label}</span>
            <span style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.5 }}>{active[f.key]}</span>
          </div>
        ))}
      </div>
      <div style={{ background: `${protoColor(active.id)}08`, border: `1px solid ${protoColor(active.id)}28`, borderRadius: 10, padding: '14px 16px' }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: protoColor(active.id), fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 6px' }}>Note</p>
        <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7, margin: 0 }}>{active.note}</p>
      </div>
    </div>
  )
}

// ── Component 3: Email Authentication Stack ───────────────────────────────────
interface AuthMech { id: string; name: string; dnsRecord: string; proves: string; checks: string; limitation: string }
const AUTH_MECHS: AuthMech[] = [
  { id: 'spf', name: 'SPF', dnsRecord: 'TXT at domain apex: v=spf1 include:_spf.google.com ~all', proves: 'The sending IP is authorized to send email for the envelope MAIL FROM domain', checks: 'Receiving server queries SPF TXT at MAIL FROM domain, checks sending IP against authorized list', limitation: 'Breaks on email forwarding — forwarder IP is not in original SPF. Does not protect visible From: header.' },
  { id: 'dkim', name: 'DKIM', dnsRecord: 'TXT at selector._domainkey.domain: v=DKIM1; k=rsa; p=<pubkey>', proves: 'The message was signed by the private key holder for the d= domain and was not modified in transit', checks: 'Receiving server fetches public key from DNS at selector._domainkey.domain, verifies RSA/Ed25519 signature over h= headers + body hash', limitation: 'Does not prevent visible From: header spoofing — d= domain may differ from From: header domain. Survives forwarding (unlike SPF).' },
  { id: 'dmarc', name: 'DMARC', dnsRecord: 'TXT at _dmarc.domain: v=DMARC1; p=reject; rua=mailto:dmarc@domain', proves: 'Policy tying SPF and DKIM to the visible From: header with alignment enforcement and reporting', checks: 'At least one of SPF or DKIM must pass AND the verified domain must align with the From: header domain (relaxed: eTLD+1 match; strict: exact match)', limitation: 'Only effective on servers that implement DMARC checking. p=reject blocks legitimate mail from unconfigured sending sources — always start with p=none.' },
  { id: 'bimi', name: 'BIMI', dnsRecord: 'TXT at default._bimi.domain: v=BIMI1; l=<SVG-URL>; a=<VMC-URL>', proves: 'Brand identity — displays company logo in supporting email clients (Gmail, Apple Mail)', checks: 'Mail client fetches SVG from BIMI DNS record for DMARC-passing messages from domains with a Verified Mark Certificate', limitation: 'Requires DMARC p=quarantine or p=reject. Most require a VMC from DigiCert/Entrust (~$1,500+/yr). Not universally supported.' },
]

function EmailAuthStack() {
  const [sel, setSel] = useState('spf')
  const active = AUTH_MECHS.find(a => a.id === sel)!
  const mechColor = (id: string) => id === 'spf' ? '#f59e0b' : id === 'dkim' ? '#3b82f6' : id === 'dmarc' ? G : '#8b5cf6'
  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: 14, padding: '28px 24px', margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: G, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 18px' }}>Email Authentication Stack</p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 22 }}>
        {AUTH_MECHS.map(a => (
          <button key={a.id} onClick={() => setSel(a.id)}
            style={{ padding: '8px 18px', borderRadius: 8, border: `2px solid ${sel === a.id ? mechColor(a.id) : 'var(--border)'}`, background: sel === a.id ? `${mechColor(a.id)}12` : 'transparent', color: sel === a.id ? mechColor(a.id) : 'var(--text)', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
            {a.name}
          </button>
        ))}
      </div>
      <div style={{ background: `${mechColor(active.id)}07`, border: `1px solid ${mechColor(active.id)}22`, borderRadius: 10, padding: '18px 20px' }}>
        <p style={{ fontSize: 14, fontWeight: 700, color: mechColor(active.id), fontFamily: 'var(--font-mono)', margin: '0 0 14px' }}>{active.name}</p>
        {[
          { label: 'DNS Record', val: active.dnsRecord },
          { label: 'Proves', val: active.proves },
          { label: 'How Checked', val: active.checks },
          { label: 'Limitation', val: active.limitation },
        ].map(f => (
          <div key={f.label} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', background: 'var(--code-bg)', borderRadius: 8, padding: '8px 12px', marginBottom: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: mechColor(active.id), fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.06em', minWidth: 80, flexShrink: 0 }}>{f.label}</span>
            <span style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.5 }}>{f.val}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function EmailProtocolsPage() {
  return (
    <LearnLayout
      title="Email Protocols"
      description="SMTP, IMAP, POP3, SPF, DKIM, DMARC — the aging but critical infrastructure that delivers 300 billion emails daily, and the security stack bolted on to stop most of it from being spam."
      section="Networking Fundamentals — Module 27"
      readTime="25–35 min"
      updatedAt="May 2026"
    >

      <Chapter n={1} />
      <H2>The Oldest Living Protocol</H2>

      <StoryBox>
        <Para>1971. Ray Tomlinson sends the first network email between two machines on ARPANET. He picks the @ symbol to separate user from host — a completely arbitrary choice that became one of the most recognizable symbols in human history. The message content is lost to time; Tomlinson recalled it as "something like QWERTYUIOP." SMTP as we know it wasn't standardized until 1982 (RFC 821). Forty-three years later, the same EHLO, MAIL FROM, RCPT TO, DATA commands that Jon Postel specified are still being executed billions of times per day.</Para>
        <Para>Email is the most universal digital communication system in existence. Every internet user has an email address. It requires no central authority — any two SMTP servers can exchange mail directly. It is the only major internet protocol that is genuinely decentralized and federated. And it is deeply broken from a security perspective — because in 1982, nobody anticipated that 85% of all emails would one day be spam.</Para>
      </StoryBox>

      <Para>Email delivery involves three protocols working together: <Accent>SMTP</Accent> for sending and relaying, <Accent>IMAP</Accent> for synchronized multi-device access, and <Accent>POP3</Accent> for legacy download-and-delete access. The security stack — SPF, DKIM, and DMARC — was retrofitted decades later to address the authentication problems SMTP's designers never anticipated.</Para>

      <WowBox>
        <Para>Over 300 billion emails are sent daily. Approximately 85% are spam or malicious. The global email filtering industry represents over $3 billion annually. Without spam filtering, email would be essentially unusable. Business Email Compromise (BEC) — attackers spoofing executive email to authorize fraudulent transfers — generated $2.9 billion in losses in 2023 alone, according to the FBI. Email remains the number one initial attack vector for ransomware and data breaches.</Para>
      </WowBox>

      <Divider />

      <Chapter n={2} />
      <H2>SMTP: The Sending Protocol</H2>

      <Para>SMTP (Simple Mail Transfer Protocol) is a text-based, session-oriented protocol for sending and relaying email. Client and server exchange commands and multi-digit response codes in a defined dialogue. Every SMTP response code has three digits: first digit indicates class (2xx success, 3xx intermediate, 4xx transient failure, 5xx permanent failure).</Para>

      <H3>Port Architecture</H3>
      <Para>• <Accent>Port 25</Accent>: MTA-to-MTA server relay. No authentication required. Blocked by residential ISPs and most cloud providers to prevent botnet spam. Direct submission to port 25 is not permitted from most IP ranges.</Para>
      <Para>• <Accent>Port 587</Accent>: Mail submission with required AUTH. This is the correct port for all application email sending. Always uses STARTTLS for TLS negotiation.</Para>
      <Para>• <Accent>Port 465</Accent>: Legacy implicit TLS (SMTPS). The original SSL port, briefly deprecated then restored by RFC 8314. Some providers use this instead of 587 for implicit TLS.</Para>

      <SmtpWalkthrough />

      <H3>4xx vs 5xx: Retry vs Bounce</H3>
      <Para>The 4xx / 5xx distinction is operationally critical. A 4xx response (transient failure) means: "I can't accept this right now — try again later." The sending MTA queues the message and retries with exponential backoff, typically for 4–5 days before generating a bounce notification (NDR). A 5xx response (permanent failure) means: "this will never succeed." The message is immediately bounced back to the sender. Sending to a non-existent address returns 5xx; a temporarily overloaded server returns 4xx.</Para>

      <Divider />

      <Chapter n={3} />
      <H2>Email Delivery Architecture</H2>

      <StoryBox>
        <Para>When you click Send on an email to bob@other.com, a chain of events unfolds: your client connects to your outbound server via SMTP/587, submits the message, and disconnects. Your server's MTA queries DNS for the MX records of other.com. It opens an SMTP connection to port 25 of other.com's mail server and delivers the message. Other.com's server stores it in Bob's mailbox. When Bob opens his email client, the client connects to other.com's IMAP server and retrieves the message. Six separate TCP connections, three protocols, potentially dozens of servers for spam filtering, virus scanning, and policy enforcement — all invisible to the users.</Para>
      </StoryBox>

      <H3>Mail Agent Roles</H3>
      <Para>• <Accent>MUA (Mail User Agent)</Accent>: Client — Outlook, Thunderbird, Apple Mail, Gmail. Submits via SMTP/587, retrieves via IMAP/993.</Para>
      <Para>• <Accent>MSA (Mail Submission Agent)</Accent>: Receives from MUAs (port 587), enforces policies, signs DKIM, forwards to MTA.</Para>
      <Para>• <Accent>MTA (Mail Transfer Agent)</Accent>: Routes between servers (port 25). Examples: Postfix, Exim, Sendmail, Exchange.</Para>
      <Para>• <Accent>MDA (Mail Delivery Agent)</Accent>: Delivers to local mailboxes. Examples: Dovecot, procmail.</Para>
      <Para>• <Accent>MRA (Mail Retrieval Agent)</Accent>: IMAP/POP3 server serving client requests. Often same as MDA.</Para>

      <H3>MX Record Routing</H3>
      <Para>When delivering to user@other.com, the sending MTA queries DNS for MX records at other.com. MX records have priority values — lower number is preferred. If the primary MX is unavailable, the MTA tries lower-priority alternatives. If all are unreachable, the message is queued and retried. After the queue lifetime (typically 4–5 days), an NDR (Non-Delivery Receipt) is sent to the original sender with the failure reason. Never return a 5xx to a message you intend to deliver later — use 4xx for transient issues.</Para>

      <EmailProtocolComparator />

      <Divider />

      <Chapter n={4} />
      <H2>IMAP: Synchronized Multi-Device Access</H2>

      <Para>IMAP (Internet Message Access Protocol, RFC 3501) keeps messages on the server. Clients synchronize state — read/unread flags, folder structure, deleted messages — rather than downloading and removing from the server. Every client (phone, laptop, web UI) always sees the same mailbox state because the server is the single source of truth.</Para>

      <H3>IMAP Commands and State Machine</H3>
      <Para>IMAP connections progress through states: <Code>Not Authenticated</Code> → <Code>Authenticated</Code> (after LOGIN or AUTHENTICATE) → <Code>Selected</Code> (after SELECT mailboxname). Commands are tagged with client-assigned identifiers (A001, A002...) — the server's response references each tag, enabling pipelining. A client can send multiple commands without waiting for each response.</Para>

      <Para>Critical commands: <Code>SELECT INBOX</Code> (open folder, returns message count and recent flags), <Code>SEARCH UNSEEN</Code> (server-side search returning message IDs), <Code>FETCH 1:* ENVELOPE</Code> (bulk fetch headers without body), <Code>STORE +FLAGS (\Seen)</Code> (mark as read), <Code>EXPUNGE</Code> (actually delete \Deleted messages).</Para>

      <H3>IMAP IDLE: Push Notifications</H3>
      <Para>The IDLE command keeps the IMAP connection open in a waiting state. When new mail arrives, the server sends an unsolicited EXISTS response — the client immediately receives the notification without polling. This is the mechanism behind "push email" on mobile devices. The client sends <Code>IDLE\r\n</Code>, server responds <Code>+ idling</Code>, and both sides wait. Client terminates with <Code>DONE\r\n</Code>. Apple's iOS and Android both use IMAP IDLE for email push notification.</Para>

      <CodeBlock>{`# IMAP session (manual telnet example)
openssl s_client -connect imap.gmail.com:993

# After TLS handshake:
A001 LOGIN user@gmail.com apppassword
A002 LIST "" "*"                    # list all folders
A003 SELECT INBOX                   # open inbox
A004 SEARCH UNSEEN                  # find unread messages
A005 FETCH 1 BODY[HEADER.FIELDS (FROM SUBJECT DATE)]
A006 FETCH 1 BODY[TEXT]             # fetch body
A007 STORE 1 +FLAGS (\Seen)         # mark as read
A008 LOGOUT

# Check SMTP queue and delivery (Postfix)
mailq                      # show queued messages
postqueue -f               # flush queue
postcat -q <QUEUEID>       # inspect message`}</CodeBlock>

      <Divider />

      <Chapter n={5} />
      <H2>Email Security: SPF, DKIM, DMARC</H2>

      <StoryBox>
        <Para>2004. A phishing email arrives in millions of inboxes claiming to be from paypal@paypal.com. The From: header looks authentic. It asks users to verify their accounts. Tens of thousands enter credentials on a fake PayPal site. The attack works because SMTP has no authentication — anyone can put any From: address in an email. Nothing in the protocol prevented a server in Eastern Europe from claiming to be PayPal. The authentication stack took 12 more years to become widely deployed: SPF (2006 RFC), DKIM (2011 RFC), DMARC (2015 RFC).</Para>
      </StoryBox>

      <EmailAuthStack />

      <H3>DMARC Alignment: The Critical Concept</H3>
      <Para>DMARC alignment is what ties the three mechanisms together. For a DMARC check to pass, at least one of SPF or DKIM must (1) pass the authentication check AND (2) align — the verified domain must match the visible From: header domain. An attacker could set up evil.com with valid SPF and DKIM, then put From: ceo@legitimate.com in the message header. SPF passes for evil.com; DKIM passes for evil.com — but DMARC alignment fails because evil.com does not match legitimate.com. The DMARC policy (none/quarantine/reject) then determines what the receiving server does.</Para>

      <Para>Two alignment modes: <Accent>relaxed</Accent> (default) — subdomain OK (mail.example.com aligns with example.com). <Accent>strict</Accent> — exact domain match required. Strict alignment breaks mailing lists and legitimate subdomains, so relaxed is almost always appropriate.</Para>

      <Warn>
        <Para>Deploying DMARC p=reject before auditing all email sending sources is a career-limiting mistake. Any third-party service sending email on behalf of your domain — marketing tools, CRM systems, ticketing systems, old notification servers — must be either authorized in SPF or signing with DKIM, or their mail will be rejected. Always start with p=none, analyze rua= aggregate reports for 2–4 weeks, fix all sources, move to p=quarantine with pct=5, gradually increase to 100%, then switch to p=reject. Rushing causes legitimate email to disappear silently.</Para>
      </Warn>

      <Divider />

      <Chapter n={6} />
      <H2>DKIM Deep Dive</H2>

      <Para>DKIM (DomainKeys Identified Mail, RFC 6376) adds a cryptographic signature to every outbound message. The signature is stored in a <Code>DKIM-Signature:</Code> header. The receiving server verifies it using a public key from DNS. The signature covers specified headers plus a hash of the body.</Para>

      <H3>Reading a DKIM-Signature Header</H3>
      <Para>A typical DKIM-Signature: <Code>v=1; a=rsa-sha256; d=example.com; s=google2024; h=from:to:subject:date; bh=ABC...==; b=XYZ...==</Code></Para>
      <Para>• <Code>a=</Code>: signing algorithm (rsa-sha256 or ed25519-sha256)</Para>
      <Para>• <Code>d=</Code>: signing domain (must align with From: for DMARC)</Para>
      <Para>• <Code>s=</Code>: selector (key identifier — fetch public key from <Code>google2024._domainkey.example.com</Code>)</Para>
      <Para>• <Code>h=</Code>: signed headers list (changing any of these invalidates the signature)</Para>
      <Para>• <Code>bh=</Code>: SHA-256 hash of the canonicalized body</Para>
      <Para>• <Code>b=</Code>: the actual RSA/Ed25519 signature</Para>

      <H3>Key Rotation with Selectors</H3>
      <Para>The selector enables zero-downtime key rotation: generate new key pair → publish public key at new selector in DNS → configure signing server to use new private key → wait for old key TTL to expire → remove old DNS record → optionally revoke old key by setting <Code>p=</Code> empty in the old selector's DNS TXT record (signals "revoked" to receivers). Ed25519 DKIM is preferred for new deployments: 68-character vs 392-character public key, faster verification, no known quantum vulnerability.</Para>

      <Divider />

      <Chapter n={7} />
      <H2>SMTP TLS: STARTTLS, MTA-STS, DANE</H2>

      <Para>SMTP port 25 between servers can use STARTTLS to upgrade to TLS — but it is <Accent>opportunistic</Accent>. If the receiving server doesn't advertise STARTTLS in its EHLO capabilities, the sending server falls back to plaintext. A MITM attacker can trivially strip the STARTTLS capability from the greeting, forcing plaintext delivery. This downgrade attack was widely used by nation-state actors for years.</Para>

      <H3>MTA-STS: Mandatory TLS for Inbound Delivery</H3>
      <Para>MTA-STS (RFC 8461) publishes a policy specifying that TLS is mandatory for delivering to a domain. Setup requires two components: (1) a policy file at <Code>https://mta-sts.yourdomain.com/.well-known/mta-sts.txt</Code> listing required MX hostnames and mode (enforce/testing/none), and (2) a DNS TXT record at <Code>_mta-sts.yourdomain.com</Code> with a policy ID. Sending MTAs fetch the policy and refuse to deliver in plaintext or with invalid TLS certificates — they queue instead.</Para>

      <H3>DANE: Certificate Pinning via DNSSEC</H3>
      <Para>DANE (RFC 7672) uses DNSSEC-signed TLSA records to pin TLS certificates for mail servers. Instead of trusting public CAs, the domain owner publishes the certificate (or CA) hash directly in DNS. A DANE-supporting sending MTA fetches the TLSA record and verifies the server's certificate against it — preventing MITM even with a rogue CA certificate. Requires DNSSEC on the target domain; without DNSSEC, the TLSA records themselves could be spoofed.</Para>

      <CodeBlock>{`# MTA-STS policy file
# Host at: https://mta-sts.yourdomain.com/.well-known/mta-sts.txt
version: STSv1
mode: enforce
mx: mail.yourdomain.com
max_age: 86400

# MTA-STS DNS TXT record
# _mta-sts.yourdomain.com TXT "v=STSv1; id=20241201"

# DANE TLSA record format: usage selector matching-type hash
# _25._tcp.mail.yourdomain.com TLSA 3 1 1 <SHA256-of-SPKI>
# Generate hash:
openssl x509 -in cert.pem -pubkey -noout | openssl pkey -pubin -outform DER | openssl dgst -sha256 -binary | xxd -p -c 256

# Test SMTP TLS
openssl s_client -connect mail.yourdomain.com:25 -starttls smtp
# Check for: Verify return code: 0 (ok)`}</CodeBlock>

      <Divider />

      <Chapter n={8} />
      <H2>Email Headers: The Audit Trail</H2>

      <Para>Email headers record a complete delivery history. Every SMTP server that handles a message prepends a <Code>Received:</Code> header. Reading headers bottom-up traces the path from sender to recipient. Each Received header includes the sending server's claimed identity, the receiving server's identity, the protocol used, a message queue ID, and a timestamp.</Para>

      <H3>RFC 5321 Envelope vs RFC 5322 Message Headers</H3>
      <Para>This distinction is the root cause of most email spoofing. <Accent>RFC 5321 envelope headers</Accent>: MAIL FROM and RCPT TO — used by SMTP servers for routing, never displayed to users. SPF checks the MAIL FROM domain against the sending IP. <Accent>RFC 5322 message headers</Accent>: From:, To:, Subject:, Date:, CC: — what the user sees in their email client. DMARC checks whether the authenticated RFC 5321 domain aligns with the RFC 5322 From: domain.</Para>

      <Para>An attacker sends MAIL FROM: attacker@evil.com (authorized by SPF for evil.com) but writes From: ceo@legitimate.com in the message. The user sees the CEO's address. SPF passes for evil.com. DKIM passes for evil.com. DMARC alignment fails — evil.com does not match legitimate.com. Only DMARC catches this attack. This is why DMARC p=reject is the goal.</Para>

      <H3>Authentication-Results Header</H3>
      <Para>The final receiving server adds <Code>Authentication-Results:</Code> recording SPF, DKIM, and DMARC pass/fail. In Gmail: open the email → three-dot menu → "Show original" — the full headers are displayed. The Authentication-Results header at the top (prepended last) is the authoritative result from Gmail's infrastructure.</Para>

      <Divider />

      <Chapter n={9} />
      <H2>Deliverability: Getting Legitimate Email Delivered</H2>

      <Para>High-volume senders (transactional email, marketing) must actively manage deliverability — the probability that a legitimate email reaches the inbox rather than spam folder or being blocked entirely.</Para>

      <H3>IP Warm-Up</H3>
      <Para>New IP addresses have no sending reputation. Major ISPs (Gmail, Outlook) rate-limit mail from unknown IPs. A new server going from 0 to 1 million emails per day will immediately trigger rate limits and spam filtering. Warm-up process: start with 1,000 emails/day to the most engaged users, double every 2–3 days, monitor bounce rates and complaint rates, reach full volume after 4–8 weeks. Services like SendGrid and Mailgun manage warm-up automatically for dedicated IPs.</Para>

      <H3>Bounce and Complaint Management</H3>
      <Para>Hard bounces (5xx — address doesn't exist) must be immediately removed from your list. Sending to known-bad addresses signals poor list hygiene and damages reputation. Soft bounces (4xx — temporary failure) should be retried a few times then removed. Spam complaints from recipients must be processed via Feedback Loop (FBL) subscriptions — most major ISPs provide FBL lists that notify senders when recipients mark their mail as spam. High complaint rates (above 0.1%) trigger filtering.</Para>

      <Warn>
        <Para>Never use shared IP addresses for business-critical transactional email. Shared IPs are used by many senders — if another sender on the same IP spams, your deliverability suffers from IP reputation damage you didn't cause. Always use dedicated IPs for important transactional mail, or use a managed transactional email service (SendGrid, Postmark, Amazon SES) that provides dedicated IPs and actively manages reputation on your behalf.</Para>
      </Warn>

      <Divider />

      <Chapter n={10} />
      <H2>MIME: Multipart Messages and Attachments</H2>

      <Para>MIME (Multipurpose Internet Mail Extensions, RFC 2045–2049) extends SMTP to support non-ASCII content, HTML email, attachments, and multipart messages. The base SMTP protocol supports only 7-bit ASCII text.</Para>

      <Para>A typical HTML email has a <Code>multipart/alternative</Code> body: two parts — <Code>text/plain</Code> (plain text fallback) and <Code>text/html</Code> (HTML version). Email clients display whichever part they prefer. An email with an attachment is <Code>multipart/mixed</Code>: HTML body + one attachment. Attachments are base64-encoded within the MIME structure.</Para>

      <Para>Key MIME headers: <Code>Content-Type: multipart/mixed; boundary="abc123"</Code> defines the container and the separator string. Each part begins with <Code>--abc123</Code> and ends with <Code>--abc123--</Code> for the final part. <Code>Content-Transfer-Encoding: base64</Code> signals the content is base64 encoded. <Code>Content-Disposition: attachment; filename="file.pdf"</Code> signals this part is an attachment with the given filename.</Para>

      <CodeBlock>{`# Send multipart HTML + plain text email (Python)
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

msg = MIMEMultipart('alternative')
msg['From'] = 'sender@example.com'
msg['To']   = 'recipient@example.com'
msg['Subject'] = 'Hello'

plain = MIMEText('Hello, this is plain text.', 'plain', 'utf-8')
html  = MIMEText('<h1>Hello</h1><p>This is HTML.</p>', 'html', 'utf-8')
msg.attach(plain)
msg.attach(html)

with smtplib.SMTP('smtp.example.com', 587) as s:
    s.starttls()
    s.login('user', 'password')
    s.sendmail(msg['From'], msg['To'], msg.as_string())`}</CodeBlock>

      <Divider />

      <Chapter n={11} />
      <H2>Email Attack Patterns</H2>

      <H3>Business Email Compromise (BEC)</H3>
      <Para>The attacker spoofs or compromises a CEO/CFO/vendor email address and sends a request to an employee to transfer funds, purchase gift cards, or share credentials. BEC generated $2.9B in losses in 2023 (FBI IC3 report). Defenses: DMARC p=reject prevents external spoofing of your domain. MFA prevents account compromise. Financial approval workflows requiring out-of-band verification for large transfers prevent social engineering. Employee training to recognize urgency + financial request patterns is also essential.</Para>

      <H3>Phishing and Spear-Phishing</H3>
      <Para>Mass phishing: bulk campaigns impersonating banks, package carriers, Netflix. Spear-phishing: targeted attacks using personal details (name, company, role) to increase credibility. Email-based malware: malicious attachments (PDF with embedded JavaScript, Office macros, ISO files containing executables). URL-based: links to credential-harvesting sites. Defenses: email gateway scanning, URL rewriting/click tracking, attachment sandboxing, and user training.</Para>

      <H3>SMTP Smuggling</H3>
      <Para>A 2023-discovered attack where different SMTP servers interpret end-of-DATA sequences differently. An attacker embeds a second SMTP transaction within the first message's DATA section using carefully crafted line endings. The receiving server processes two separate messages where the outer server saw only one — the inner message bypasses SPF/DKIM/DMARC checks and potentially bypasses spam filtering. Postfix, Exim, and Sendmail all issued patches to normalize SMTP line ending handling. Ensure your MTA is patched and configured to reject non-standard DATA terminators.</Para>

      <Divider />

      <Chapter n={12} />
      <H2>Email Forensics: Header Analysis</H2>

      <CodeBlock>{`# Phishing email headers — analyze delivery path
# Read Received: headers BOTTOM-UP for delivery path

Received: from mail.attacker.net (attacker.net [198.51.100.42])
        by mx.victim.com with ESMTP id abc123       ← final hop (top)
        for <ceo@victim.com>; Mon 10:00:00 +0000
Received: from localhost ([127.0.0.1])
        by mail.attacker.net with SMTP id def456    ← attacker's server
        Mon 09:59:55 +0000

From: cfo@trusted-bank.com                          ← spoofed From:
Reply-To: attacker@evil.com                         ← real reply address
To: ceo@victim.com
Subject: Wire Transfer Request

Authentication-Results: mx.victim.com;
  spf=fail smtp.mailfrom=attacker.net               ← SPF FAIL
  dkim=none                                         ← no DKIM
  dmarc=fail action=none header.from=trusted-bank.com

# Key indicators:
# 1. Received: from attacker.net — bad IP
# 2. SPF fail for attacker.net
# 3. No DKIM signature
# 4. DMARC fail — From: domain doesn't align
# 5. Reply-To differs from From: — very suspicious`}</CodeBlock>

      <Divider />

      <Chapter n={13} />
      <H2>Common Misconceptions</H2>

      <Err title="The From: header proves who sent the email">
        <Para>The From: header (RFC 5322) is set by the sending software and has historically had zero authentication. Anyone can write any address. Phishing emails claiming to be from your bank, PayPal, or the CEO all work exactly because From: can be freely set. DMARC alignment is the only mechanism that verifies the From: header domain against an authenticated identity (SPF-verified sending IP or DKIM signature). Without DMARC p=reject on the target domain, From: is a suggestion, not a proof.</Para>
      </Err>

      <Err title="SPF passing means the email is legitimate">
        <Para>SPF verifies only that the sending IP is authorized for the MAIL FROM domain — the envelope sender, not the From: header the user sees. An attacker sets MAIL FROM: spammer@evil.com (authorized by their SPF) and From: trusted@bank.com (what the user sees). SPF passes for evil.com. DMARC alignment fails because evil.com does not match bank.com. SPF alone does not prevent from-header spoofing — DMARC alignment is required.</Para>
      </Err>

      <Err title="STARTTLS makes email as secure as HTTPS">
        <Para>SMTP STARTTLS is opportunistic — the connection falls back to plaintext if the server doesn't advertise TLS or if the capability is stripped by a MITM. This is trivially exploitable. HTTPS with HSTS enforces TLS from the start with no fallback. MTA-STS closes this gap for SMTP by making TLS mandatory for specific domains, failing delivery rather than downgrading. DANE adds certificate pinning via DNSSEC. Without MTA-STS or DANE, SMTP STARTTLS provides encryption against passive observers but not active downgrade attackers.</Para>
      </Err>

      <Err title="Email is delivered instantly like a chat message">
        <Para>Email is a store-and-forward system. The sending server accepts the message, queues it, then delivers asynchronously — typically within seconds for good mail, but potentially hours or days if the recipient's server is temporarily unavailable. The sending server retries with exponential backoff for 4–5 days before bouncing. Email has no real-time delivery guarantee by design. This is fundamentally different from messaging apps, which are designed for low-latency delivery with strong ordering guarantees.</Para>
      </Err>

      <Err title="DMARC p=reject blocks all spoofing of your domain immediately">
        <Para>DMARC p=reject asks receiving servers to reject non-aligned messages. But (1) not all receiving servers implement DMARC checks, (2) p=reject also rejects legitimate email from your domain that lacks proper SPF/DKIM — third-party tools, old servers, newsletters. You must identify and fix all sending sources before enforcing reject. The rua= aggregate reports tell you exactly what's failing. Skipping the monitoring phase causes real legitimate email to bounce silently with no user-visible error.</Para>
      </Err>

      <Divider />

      <Chapter n={14} />
      <H2>IQ Depth Check</H2>

      <IQ level="Beginner">
        <Para>Email uses three main protocols: SMTP for sending (like a postal carrier), IMAP for reading on multiple devices (mail stays on the server), and POP3 (older — downloads mail to one device and deletes from server). When you send an email, your app sends it to your mail server via SMTP, your server routes it to the recipient's server via SMTP, and the recipient's app retrieves it via IMAP. The From: address in an email can be faked — spam and phishing emails do this. SPF, DKIM, and DMARC are security mechanisms to detect faked senders.</Para>
      </IQ>

      <IQ level="Intermediate">
        <Para>SMTP ports: 25 (server-to-server relay), 587 (authenticated submission), 465 (implicit TLS). SMTP response codes: 2xx success, 4xx transient (retry), 5xx permanent (bounce). IMAP keeps mail server-side for multi-device sync; POP3 downloads and deletes. Email auth: SPF checks sending IP against MAIL FROM domain in DNS TXT. DKIM cryptographically signs messages; public key in DNS at selector._domainkey.domain. DMARC ties them together with a policy and alignment requirement — at least SPF or DKIM must pass AND align with the visible From: header. STARTTLS on port 25 is opportunistic; MTA-STS/DANE enforce TLS. Read Received: headers bottom-up to trace delivery path.</Para>
      </IQ>

      <IQ level="Senior">
        <Para>SMTP envelope (RFC 5321: MAIL FROM, RCPT TO) vs message headers (RFC 5322: From:, To:, Subject:) — completely separate. DMARC alignment catches the MAIL FROM = legitimate/From: = spoofed attack by requiring the SPF or DKIM verified domain to match the From: header domain. DMARC alignment modes: relaxed (eTLD+1 match, subdomain OK) vs strict (exact match). DKIM selector enables key rotation; Ed25519 preferred for new deployments (68-char key vs RSA's 392-char). DMARC rua= aggregate XML reports (daily per-domain) enable monitoring all sending sources before enforcing reject. MTA-STS: policy served via HTTPS, DNS TXT with policy ID for cache invalidation, max_age controls how long the policy is cached. DANE/TLSA: DNSSEC required; usage 3 (DANE-EE) = pin exact leaf cert; usage 2 (DANE-TA) = pin CA. SMTP smuggling: inconsistent DATA terminator handling allows injecting a second transaction inside the first message body.</Para>
      </IQ>

      <IQ level="PhD">
        <Para>DMARC alignment uses "organizational domain" (eTLD+1) as the alignment boundary in relaxed mode — RFC 7489 appendix A defines this as the registered domain per the Public Suffix List. DKIM oversigning: h= list should include an empty slot for each header that must not be injected above the signed one — prevents header injection attacks where an attacker prepends a second From: header to bypass alignment. ARC (Authenticated Received Chain, RFC 8617) preserves original authentication results across mailing list forwarding: the forwarder appends ARC-Seal and ARC-Message-Signature headers chaining the original authentication; the final receiver can evaluate the original chain using the ARC-Authentication-Results of the first signer. Gmail uses ARC to rescue DMARC-failing legitimate email from known trusted mailing lists. BIMI VMC (Verified Mark Certificate) is an Extended Validation-like certificate from DigiCert or Entrust asserting trademark ownership — prevents brand impersonation in the BIMI display. SMTP smuggling fix requires MTAs to normalize received data: strip bare CR, refuse LF-only line endings, and reject messages where the DATA payload contains the sequence CRLF.CRLF mid-message followed by additional SMTP commands. Post-quantum DKIM: current RSA-2048 and Ed25519 signatures face long-term threats from quantum computing; CRYSTALS-Dilithium signatures (NIST PQC standard) would increase DKIM-Signature size from ~250 bytes to ~2420 bytes — potentially causing delivery failures on servers with header size limits or DKIM parser buffer limits. Open research: DMARC enforcement interaction with ARC chain manipulation; formal verification of DMARC policy inheritance across subdomain hierarchies; email metadata leakage in encrypted-at-rest email storage systems.</Para>
      </IQ>

      <Divider />

      <KeyTakeaways items={[
        'Email uses three protocols: SMTP for sending/relaying (ports 25/587/465), IMAP for server-side synchronized access (port 993), POP3 for legacy download-delete (port 995).',
        'SMTP is a session-based text protocol — EHLO/MAIL FROM/RCPT TO/DATA — with 4xx (transient: retry) and 5xx (permanent: bounce) response codes.',
        'The From: header in an email has no inherent authentication — phishing and spoofing attacks exploit this. SPF, DKIM, and DMARC exist to verify sender identity via DNS.',
        'SPF verifies the sending IP against the MAIL FROM domain. DKIM cryptographically signs the message. DMARC ties both to the visible From: header via alignment enforcement.',
        'DMARC alignment is the key concept: at least SPF or DKIM must pass AND the verified domain must match the From: header domain — catching the spoofed-From: attack.',
        'Deploy DMARC in stages: p=none (monitor) → p=quarantine (with small pct=) → p=reject. Rushing causes legitimate email to disappear.',
        'SMTP STARTTLS is opportunistic and susceptible to downgrade attacks. MTA-STS enforces TLS for inbound delivery; DANE pins certificates via DNSSEC.',
        'Reading Received: headers bottom-up traces the delivery path; Authentication-Results records SPF/DKIM/DMARC pass/fail at the receiving server.',
        'IP warm-up, bounce management, and spam complaint rate monitoring are required for high-volume senders to maintain inbox delivery.',
        'Business Email Compromise causes $2.9B+ in annual losses — DMARC p=reject on your domain plus MFA on email accounts are the primary defenses.',
      ]} />
    </LearnLayout>
  )
}
