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

function EmailFlowDiagram() {
  const [step, setStep] = useState(0)
  const steps = [
    { actor: 'Mail Client (Outlook/Thunderbird)', msg: 'Compose + Submit', detail: 'User writes email. Client connects to outgoing mail server (MTA) on port 587 (SMTP Submission) with STARTTLS and SASL auth. Message submitted.' },
    { actor: 'Sender\'s MTA (mail.sender.com)', msg: 'MX Lookup + Queue', detail: 'MTA queries DNS MX records for the recipient domain. Finds the destination mail server. Queues message for delivery. Applies SPF/DKIM signing.' },
    { actor: 'SMTP Transfer', msg: 'Server-to-Server SMTP (port 25)', detail: 'Sender\'s MTA connects to recipient\'s MTA on port 25 using ESMTP. Applies STARTTLS if supported. Transfers the message using DATA command.' },
    { actor: 'Recipient\'s MTA (mail.recipient.com)', msg: 'Receive + Spam Check', detail: 'Verifies SPF (sender IP authorized?), DKIM (signature valid?), DMARC (policy check). Runs spam scoring. Delivers to mailbox store or rejects.' },
    { actor: 'Mail Client (Recipient)', msg: 'Fetch via IMAP/POP3', detail: 'Client connects to mail server on IMAP (993/TLS) or POP3 (995/TLS). IMAP syncs server-side folders; POP3 downloads and optionally deletes. Message displayed.' },
  ]
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: N, fontFamily: 'var(--font-mono)', margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '.1em' }}>Email Journey Simulator</p>
      <div style={{ minHeight: 160, marginBottom: 16 }}>
        {steps.slice(0, step).map((s, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 10 }}>
            <div style={{ fontSize: 13, color: N, flexShrink: 0 }}>{i + 1}.</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{s.actor} → {s.msg}</div>
              {i === step - 1 && <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>{s.detail}</div>}
            </div>
          </div>
        ))}
        {step === 0 && <div style={{ fontSize: 13, color: 'var(--muted)', textAlign: 'center', paddingTop: 50 }}>Click Next to trace an email from sender to recipient</div>}
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0} style={{ background: 'transparent', color: 'var(--muted)', border: '1px solid var(--border)', borderRadius: 6, padding: '7px 16px', fontSize: 13, cursor: step === 0 ? 'default' : 'pointer', opacity: step === 0 ? 0.4 : 1 }}>← Back</button>
        <button onClick={() => setStep(s => Math.min(steps.length, s + 1))} disabled={step >= steps.length} style={{ background: N, color: '#000', border: 'none', borderRadius: 6, padding: '7px 16px', fontSize: 13, fontWeight: 700, cursor: step >= steps.length ? 'default' : 'pointer', opacity: step >= steps.length ? 0.5 : 1 }}>Next →</button>
        <button onClick={() => setStep(0)} style={{ background: 'transparent', color: 'var(--muted)', border: '1px solid var(--border)', borderRadius: 6, padding: '7px 16px', fontSize: 13, cursor: 'pointer' }}>Reset</button>
      </div>
    </div>
  )
}

export default function EmailProtocolsModule() {
  return (
    <LearnLayout
      title="Email Protocols — SMTP, IMAP, POP3"
      description="Email is the internet's oldest reliable communication system. Under the hood, it's a multi-protocol chain of SMTP for delivery, IMAP/POP3 for retrieval, and SPF/DKIM/DMARC for authentication."
      section="Networking Fundamentals"
      readTime="18 min"
      updatedAt="May 2026"
    >
      <Part n="01" title="The Three Protocols of Email" />
      <P>Email involves three distinct protocols: <Hl>SMTP</Hl> for sending and server-to-server transfer, <Hl>IMAP</Hl> for synchronized access to server-side mailboxes, and <Hl>POP3</Hl> for downloading mail to a local client. Understanding which protocol handles which part of the journey explains most email delivery issues.</P>

      <EmailFlowDiagram />

      <HR />
      <Part n="02" title="SMTP: Sending and Transfer" />
      <H>SMTP Basics</H>
      <P><Hl>SMTP (Simple Mail Transfer Protocol)</Hl>, RFC 5321, is the protocol used to send email. It operates on three different ports depending on context: <Hl>Port 25</Hl> — server-to-server MTA transfer (largely blocked by ISPs for consumer connections to prevent spam); <Hl>Port 587</Hl> — client submission with mandatory authentication (SASL) and STARTTLS; <Hl>Port 465</Hl> — legacy SMTPS (implicit TLS from the start, deprecated then re-assigned).</P>
      <P>A basic SMTP conversation: EHLO (extended hello, server lists capabilities), MAIL FROM, RCPT TO, DATA (message headers + body, ends with a lone period), QUIT. The server responds with 3-digit codes: 250 OK, 550 user not found, 421 service unavailable (retry later), 535 authentication failed.</P>

      <H>SPF, DKIM, and DMARC</H>
      <P><Hl>SPF (Sender Policy Framework)</Hl> — a DNS TXT record listing IP addresses authorized to send email for a domain. A receiving server checks if the sending IP is in the SPF record. Failing SPF means the sending server isn't authorized — strong spam signal. SPF only checks the MAIL FROM envelope address, not the From: header visible to users.</P>
      <P><Hl>DKIM (DomainKeys Identified Mail)</Hl> — the sending server signs the email with a private key; the signature is added as a DKIM-Signature header. The receiving server fetches the public key from DNS (selector._domainkey.example.com) and verifies the signature. DKIM proves the message wasn't modified in transit and was sent by a server with access to the domain's private key.</P>
      <P><Hl>DMARC (Domain-based Message Authentication, Reporting & Conformance)</Hl> — builds on SPF and DKIM. A DNS TXT record at _dmarc.example.com specifies: what to do when SPF/DKIM fails (none/quarantine/reject), where to send aggregate reports (rua=), and alignment requirements. DMARC with p=reject policy effectively eliminates email spoofing for a domain — unauthorized senders' emails are rejected outright.</P>

      <Err title="Sending from port 25 directly">
        Most residential and cloud IPs are blacklisted for outbound port 25 (anti-spam measure). Use SMTP submission on port 587 with authentication. AWS EC2 blocks outbound port 25 by default; you must request it be unblocked AND verify your sending domain and reverse DNS. For transactional email in production, use dedicated services (SES, SendGrid, Mailgun) with pre-warmed IP reputations.
      </Err>

      <HR />
      <Part n="03" title="IMAP vs POP3" />
      <H>IMAP: Server-Side Synchronization</H>
      <P><Hl>IMAP (Internet Message Access Protocol)</Hl>, RFC 3501, keeps email on the server and syncs state across clients. Read/unread status, folders, flags, and messages are maintained server-side. Multiple devices (phone, laptop, web browser) see the same mailbox state. IMAP supports server-side search, so you don't need to download 10 years of email to find a message. Port: 143 (STARTTLS) or 993 (TLS). IMAP4rev1 is the standard; IMAP4rev2 (RFC 9051) adds improvements.</P>

      <H>POP3: Download and (Optionally) Delete</H>
      <P><Hl>POP3 (Post Office Protocol version 3)</Hl>, RFC 1939, downloads email to the local client and typically deletes it from the server. Simple three-state protocol: authorization (USER/PASS), transaction (LIST/RETR/DELE), update (QUIT applies changes). Used in disconnected environments or when disk space on the server is a concern. Port: 110 or 995 (TLS). In practice, POP3 with "leave on server" option behaves like a slow IMAP, but without sync — avoid for multi-device users.</P>

      <ProTip>
        Test email server connectivity and authentication with OpenSSL: <code style={{ fontSize: 12, background: `${N}15`, color: N, padding: '2px 5px', borderRadius: 4 }}>openssl s_client -connect mail.example.com:587 -starttls smtp</code>. Use <code style={{ fontSize: 12, background: `${N}15`, color: N, padding: '2px 5px', borderRadius: 4 }}>swaks</code> (Swiss Army Knife for SMTP) for scripted SMTP testing: <code style={{ fontSize: 12, background: `${N}15`, color: N, padding: '2px 5px', borderRadius: 4 }}>swaks --to user@example.com --from test@yourdomain.com --server mail.example.com --port 587 --auth LOGIN --tls</code>
      </ProTip>

      <HR />
      <Part n="04" title="Interview Questions" />
      <IQ q="Explain SPF, DKIM, and DMARC and how they work together to prevent email spoofing.">
        SPF defines which IP addresses are authorized to send for a domain (DNS TXT record). A receiving server checks if the sending IP is in the SPF record — fails = unauthorized server. DKIM adds a cryptographic signature to outbound emails; the receiving server fetches the public key from DNS and verifies the signature — proves the email was sent by a server with the domain's private key and wasn't modified. DMARC ties them together: it requires SPF and/or DKIM to align with the From: domain (not just the envelope), and specifies what to do on failure (none/quarantine/reject) plus reporting. p=reject means unauthenticated emails from your domain are rejected outright — effectively preventing spoofing.
      </IQ>
      <IQ q="What's the difference between IMAP and POP3?">
        IMAP keeps messages on the server and synchronizes state (read/unread, folders, flags) across all clients. Multiple devices see the same mailbox. Server-side search works without downloading everything. POP3 downloads messages to the local client and typically deletes them from the server — one device gets the mail. POP3 is simpler (3 states, ~10 commands) but doesn't support multi-device access. For any modern use case, IMAP is preferred. POP3 with "leave on server" is a workaround but lacks true sync.
      </IQ>

      <HR />
      <Part n="05" title="Key Terminology" />
      <Term t="SMTP">Simple Mail Transfer Protocol — transfers email between servers (port 25) and from clients to servers (port 587).</Term>
      <Term t="IMAP">Internet Message Access Protocol — server-side mailbox sync, multi-device. Port 993 (TLS).</Term>
      <Term t="POP3">Post Office Protocol v3 — download-and-optionally-delete client access. Port 995 (TLS).</Term>
      <Term t="SPF">Sender Policy Framework — DNS record listing authorized sending IPs for a domain.</Term>
      <Term t="DKIM">DomainKeys Identified Mail — cryptographic signature proving authenticity and integrity.</Term>
      <Term t="DMARC">Domain-based Message Authentication — policy tying SPF+DKIM to the visible From: domain with reject/quarantine enforcement.</Term>
      <Term t="MTA">Mail Transfer Agent — software that routes and delivers email between mail servers (Postfix, Sendmail, Exim).</Term>

      <KeyTakeaways items={[
        'Email delivery chain: client → SMTP submission (587) → sender MTA → recipient MTA (port 25) → IMAP/POP3 retrieval.',
        'SPF checks if the sending IP is authorized; DKIM signs the message; DMARC enforces alignment and sets reject/quarantine policy.',
        'IMAP keeps mail on the server with multi-device sync; POP3 downloads to local client (usually deleting from server).',
        'Port 587 + STARTTLS + SASL auth is the correct client submission path; port 25 is for server-to-server transfer.',
        'DMARC p=reject is the gold standard for preventing spoofing of your domain by unauthorized senders.',
      ]} />
    </LearnLayout>
  )
}
