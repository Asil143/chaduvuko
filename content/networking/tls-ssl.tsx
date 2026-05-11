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

function TLSHandshakeSim() {
  const [version, setVersion] = useState<'1.2' | '1.3'>('1.3')
  const [step, setStep] = useState(0)

  const steps12 = [
    { from: 'C→S', msg: 'ClientHello', detail: 'Client sends: max TLS version supported, random nonce, list of cipher suites, list of compression methods, extensions (SNI, ALPN, session ticket).' },
    { from: 'S→C', msg: 'ServerHello', detail: 'Server selects TLS version, cipher suite (e.g., TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256), sends its random nonce, session ID.' },
    { from: 'S→C', msg: 'Certificate', detail: 'Server sends its X.509 certificate chain. Client verifies: trusted CA signature, hostname matches CN/SAN, certificate not expired or revoked.' },
    { from: 'S→C', msg: 'ServerHelloDone', detail: 'Server signals end of hello phase.' },
    { from: 'C→S', msg: 'ClientKeyExchange', detail: 'Client sends a PreMasterSecret encrypted with server\'s public key (RSA) OR ECDHE key share. Both sides derive the master secret and session keys.' },
    { from: 'C→S', msg: 'ChangeCipherSpec + Finished', detail: 'Client switches to encrypted mode. Sends Finished message (HMAC of all handshake messages). Verifies integrity of the handshake.' },
    { from: 'S→C', msg: 'ChangeCipherSpec + Finished', detail: 'Server switches to encrypted mode, sends its Finished. Both sides verified. TLS session established. 2 RTTs total.' },
  ]

  const steps13 = [
    { from: 'C→S', msg: 'ClientHello', detail: 'Client sends: TLS 1.3 version, random nonce, supported cipher suites, key_share extension (ECDH public key already included), supported_groups, signature_algorithms.' },
    { from: 'S→C', msg: 'ServerHello + key_share', detail: 'Server responds with its ECDH key share. Both sides can now compute the shared secret immediately. No separate key exchange round trip.' },
    { from: 'S→C', msg: 'EncryptedExtensions + Certificate + CertVerify + Finished', detail: 'All of this is already ENCRYPTED (using handshake keys derived from the shared secret). Certificate verification happens under encryption, hiding the server identity from passive observers.' },
    { from: 'C→S', msg: 'Finished (encrypted)', detail: 'Client sends Finished under encryption. TLS 1.3 handshake complete in 1 RTT. Application data can flow immediately after.' },
  ]

  const steps = version === '1.3' ? steps13 : steps12

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: N, fontFamily: 'var(--font-mono)', margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '.1em' }}>TLS Handshake Simulator</p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {(['1.2', '1.3'] as const).map(v => (
          <button key={v} onClick={() => { setVersion(v); setStep(0) }} style={{ background: version === v ? N : 'var(--bg)', color: version === v ? '#000' : 'var(--text)', border: `1px solid ${version === v ? N : 'var(--border)'}`, borderRadius: 6, padding: '7px 16px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>TLS {v}</button>
        ))}
        <div style={{ marginLeft: 8, display: 'flex', alignItems: 'center', fontSize: 12, color: 'var(--muted)' }}>
          {version === '1.2' ? '2 RTTs (before data)' : '1 RTT (before data) — 0-RTT resumption also available'}
        </div>
      </div>

      <div style={{ minHeight: 160, marginBottom: 16 }}>
        {steps.slice(0, step).map((s, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 10, alignItems: 'flex-start' }}>
            <code style={{ fontSize: 11, background: `${N}15`, color: N, padding: '3px 8px', borderRadius: 4, flexShrink: 0, marginTop: 2 }}>{s.from}</code>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{s.msg}</div>
              {i === step - 1 && <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>{s.detail}</div>}
            </div>
          </div>
        ))}
        {step === 0 && <div style={{ fontSize: 13, color: 'var(--muted)', textAlign: 'center', paddingTop: 50 }}>Click Next to step through TLS {version} handshake</div>}
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0} style={{ background: 'transparent', color: 'var(--muted)', border: '1px solid var(--border)', borderRadius: 6, padding: '7px 16px', fontSize: 13, cursor: step === 0 ? 'default' : 'pointer', opacity: step === 0 ? 0.4 : 1 }}>← Back</button>
        <button onClick={() => setStep(s => Math.min(steps.length, s + 1))} disabled={step >= steps.length} style={{ background: N, color: '#000', border: 'none', borderRadius: 6, padding: '7px 16px', fontSize: 13, fontWeight: 700, cursor: step >= steps.length ? 'default' : 'pointer', opacity: step >= steps.length ? 0.5 : 1 }}>Next →</button>
        <button onClick={() => setStep(0)} style={{ background: 'transparent', color: 'var(--muted)', border: '1px solid var(--border)', borderRadius: 6, padding: '7px 16px', fontSize: 13, cursor: 'pointer' }}>Reset</button>
      </div>
    </div>
  )
}

export default function TLSSSLModule() {
  return (
    <LearnLayout
      title="TLS/SSL — Encrypting the Internet"
      description="TLS is why HTTPS works, why your passwords aren't visible to your ISP, and why attackers can't impersonate google.com. Understanding TLS is essential for every engineer building or securing networked systems."
      section="Networking Fundamentals"
      readTime="24 min"
      updatedAt="May 2026"
    >
      <Part n="01" title="What TLS Provides (and What It Doesn't)" />
      <P>
        <Hl>TLS (Transport Layer Security)</Hl> — successor to the deprecated SSL (Secure Sockets Layer) — is the cryptographic protocol that secures the vast majority of internet traffic. It provides three security properties: <Hl>Confidentiality</Hl> (data is encrypted; an eavesdropper intercepting packets sees ciphertext, not plaintext), <Hl>Integrity</Hl> (a MAC — Message Authentication Code — prevents tampering; modified ciphertext fails verification), and <Hl>Authentication</Hl> (the server presents a certificate signed by a trusted Certificate Authority, proving it is who it claims to be).
      </P>
      <P>
        TLS does NOT provide: anonymity (the server and client IP addresses are visible to any observer; only the payload is encrypted), protection against traffic analysis (packet sizes and timing are visible), or protection against server-side compromise (a compromised server can decrypt all traffic). TLS also relies entirely on the trustworthiness of the certificate authority ecosystem — if a CA is compromised or rogue, it can issue fraudulent certificates for any domain.
      </P>
      <P>
        Current standard is <Hl>TLS 1.3</Hl> (RFC 8446, 2018). TLS 1.2 (RFC 5246, 2008) is still widely deployed and considered secure with correct cipher suite configuration. TLS 1.0 and 1.1 are officially deprecated and should be disabled everywhere (POODLE, BEAST, and other attacks). SSL 2.0 and 3.0 are completely broken and long abandoned.
      </P>

      <TLSHandshakeSim />

      <HR />
      <Part n="02" title="Certificates and the PKI Chain of Trust" />

      <H>X.509 Certificates</H>
      <P>
        A TLS certificate is an <Hl>X.509</Hl> document containing: the Subject (the entity the certificate belongs to — CN/Common Name or SAN/Subject Alternative Names for domain names), the Public Key, the Issuer (the CA that signed it), Validity Period (not before / not after), and a digital signature by the issuer's private key. When a server presents a certificate, the client verifies: (1) the signature is valid (CA's public key verifies the signature), (2) the CA is in the client's trusted root store, (3) the certificate is not expired, (4) the certificate has not been revoked (CRL/OCSP), and (5) the hostname matches the CN or a SAN entry.
      </P>

      <H>The Chain of Trust</H>
      <P>
        Certificates form a <Hl>chain</Hl>: Root CA (pre-installed in OS/browser trust stores, long-lived, kept offline) → Intermediate CA (signs end-entity certificates, shorter-lived, online) → End-Entity Certificate (your website's certificate, typically 90 days with Let's Encrypt, up to 1 year with paid CAs). The browser verifies the entire chain by checking each certificate's signature against the next certificate up the chain, until it reaches a trusted root.
      </P>
      <P>
        This design exists because Root CAs are extremely sensitive — if a Root CA's private key is compromised, it could issue fraudulent certificates for every website. Root CA private keys are stored offline in Hardware Security Modules (HSMs) in physically secured facilities. Intermediate CAs are used day-to-day; if one is compromised, only its certificates need to be revoked, not the entire root.
      </P>

      <H>Certificate Transparency (CT)</H>
      <P>
        Certificate Transparency (RFC 9162) requires all publicly-trusted certificates to be logged in public append-only CT logs. Browsers require SCTs (Signed Certificate Timestamps) proving the certificate was submitted to CT logs. This makes it impossible for a CA to issue a certificate for google.com without it appearing in the public logs — enabling Google and others to detect unauthorized certificates quickly. CT has caught several CA misissuances since its deployment.
      </P>

      <Err title="Using self-signed certificates in production">
        Self-signed certificates are not signed by a trusted CA, so browsers show scary warnings — users learn to click through warnings, training them to ignore security signals. Use Let's Encrypt for public services (free, automated, 90-day renewal via ACME protocol). Use an internal PKI (like HashiCorp Vault PKI or Microsoft CA) for internal services, and push the internal root certificate to all devices via MDM or Active Directory Group Policy.
      </Err>

      <HR />
      <Part n="03" title="TLS 1.3 vs TLS 1.2" />

      <H>What Changed in TLS 1.3</H>
      <P>
        TLS 1.3 (2018) made substantial improvements over 1.2: <Hl>Reduced to 1 RTT</Hl> for new connections (1.2 required 2 RTTs before application data); <Hl>0-RTT resumption</Hl> for reconnecting to known servers (data can be sent with the first packet, though with replay attack caveats); <Hl>Forward Secrecy mandatory</Hl> (all key exchanges use ephemeral Diffie-Hellman — if the server's private key is later compromised, past sessions can't be decrypted); <Hl>Eliminated weak cipher suites</Hl> (RSA key exchange, SHA-1, CBC mode, RC4 removed); <Hl>Encrypted the handshake</Hl> (certificate, extensions, and client hello details are encrypted, hiding them from network observers).
      </P>

      <H>Forward Secrecy</H>
      <P>
        In TLS 1.2 with RSA key exchange (non-ephemeral), the session key was encrypted with the server's RSA public key. An attacker could record all traffic today, then decrypt it tomorrow if they ever obtained the server's private key. <Hl>Forward Secrecy</Hl> prevents this: ephemeral DH/ECDH key exchanges generate new temporary key material for each session. Even if the server's long-term private key is compromised later, past sessions can't be decrypted because the ephemeral keys were discarded. TLS 1.3 makes ECDHE mandatory.
      </P>

      <H>Cipher Suites</H>
      <P>
        A TLS cipher suite specifies four algorithms: key exchange, authentication, bulk encryption, and MAC. In TLS 1.2: <code style={{ fontSize: 13, background: `${N}15`, color: N, padding: '2px 6px', borderRadius: 4 }}>TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256</code> means ECDHE key exchange, RSA authentication (certificate), AES-128-GCM encryption, SHA256 HMAC. In TLS 1.3, cipher suites only specify bulk encryption and MAC (key exchange and authentication are fixed to ECDHE and the certificate type): <code style={{ fontSize: 13, background: `${N}15`, color: N, padding: '2px 6px', borderRadius: 4 }}>TLS_AES_128_GCM_SHA256</code>.
      </P>

      <ProTip>
        Check a server's TLS configuration with <code style={{ fontSize: 12, background: `${N}15`, color: N, padding: '2px 5px', borderRadius: 4 }}>openssl s_client -connect example.com:443 -servername example.com</code>. It shows the certificate chain, cipher suite negotiated, TLS version, and any handshake errors. The website testssl.sh runs a comprehensive TLS audit against any server from the command line.
      </ProTip>

      <HR />
      <Part n="04" title="HTTPS, HSTS, and Certificate Pinning" />

      <H>HTTPS and SNI</H>
      <P>
        HTTPS is HTTP over TLS on port 443. The TLS layer operates below HTTP — TLS establishes an encrypted channel first, then HTTP runs inside it. <Hl>SNI (Server Name Indication)</Hl> — a TLS extension — allows the client to specify the hostname it's connecting to in the ClientHello, before the certificate is sent. This allows one IP address to host certificates for multiple domains (essential for CDNs and shared hosting). Without SNI, the server wouldn't know which certificate to present before the TLS handshake was complete.
      </P>

      <H>HSTS: HTTP Strict Transport Security</H>
      <P>
        <Hl>HSTS</Hl> is an HTTP response header (<code style={{ fontSize: 13 }}>Strict-Transport-Security: max-age=63072000; includeSubDomains; preload</code>) that tells the browser: "Only ever connect to this domain via HTTPS, for the next 63072000 seconds (2 years)." The browser remembers this and refuses HTTP connections, preventing SSL stripping attacks. The <code style={{ fontSize: 13 }}>preload</code> directive submits the domain to browser vendor HSTS preload lists — the HTTPS-only policy is built into Chrome, Firefox, and Safari before the user has even visited the site.
      </P>

      <HR />
      <Part n="05" title="Interview Questions" />

      <IQ q="Explain the TLS 1.3 handshake and why it's faster than TLS 1.2.">
        TLS 1.3 completes in 1 RTT vs TLS 1.2's 2 RTTs. The key difference: the client includes its ECDH key share in the ClientHello, allowing the server to immediately compute the shared secret and respond with the ServerHello, encrypted extensions, certificate, and Finished — all in one flight. In TLS 1.2, the key exchange took a separate round trip. TLS 1.3 also supports 0-RTT resumption: reconnecting clients can send application data with the first flight using a pre-shared key from the previous session, though this has replay attack implications for non-idempotent requests.
      </IQ>

      <IQ q="What is forward secrecy and why does TLS 1.3 mandate it?">
        Forward secrecy means compromise of the server's long-term private key doesn't compromise past sessions. In TLS without forward secrecy (RSA key exchange), the session key is encrypted with the server's RSA public key — recording today's traffic and obtaining the private key later allows decryption of all historical sessions. Forward secrecy uses ephemeral Diffie-Hellman key exchange: temporary DH keys are generated per session and discarded afterward. Even with the server's RSA/ECDSA private key, past sessions can't be decrypted because the ephemeral DH keys no longer exist. TLS 1.3 mandates ECDHE (ephemeral ECDH) for all connections, making forward secrecy universal.
      </IQ>

      <IQ q="How does the TLS certificate chain of trust work?">
        The browser's OS/trust store contains a set of pre-installed Root CA public keys. When a server presents its certificate chain, the browser verifies: (1) the end-entity certificate's signature was made by the intermediate CA's private key (verified using the intermediate's public key in the chain); (2) the intermediate's certificate's signature was made by the Root CA's private key (verified using the root's pre-installed public key); (3) all certificates are within their validity period; (4) none are revoked (checked via OCSP or CRL); (5) the hostname matches the certificate's CN or SAN entries. If any link in the chain fails verification, the connection is rejected with a certificate error.
      </IQ>

      <HR />
      <Part n="06" title="Key Terminology" />
      <Term t="TLS">Transport Layer Security — cryptographic protocol providing confidentiality, integrity, and server authentication.</Term>
      <Term t="X.509">Certificate format standard: subject, public key, issuer, validity period, CA signature.</Term>
      <Term t="CA">Certificate Authority — trusted entity that signs certificates, vouching for the identity of the subject.</Term>
      <Term t="ECDHE">Elliptic Curve Diffie-Hellman Ephemeral — key exchange providing forward secrecy. Mandatory in TLS 1.3.</Term>
      <Term t="SNI">Server Name Indication — TLS extension allowing multiple cert-bearing domains on one IP address.</Term>
      <Term t="HSTS">HTTP Strict Transport Security — header instructing browsers to use HTTPS-only for a domain for a set duration.</Term>
      <Term t="CT">Certificate Transparency — public audit logs of all issued certificates, enabling misissuance detection.</Term>

      <KeyTakeaways items={[
        'TLS provides confidentiality (encryption), integrity (MAC), and server authentication (certificate chain) — not anonymity.',
        'TLS 1.3 uses 1 RTT for new connections and 0-RTT for resumption; TLS 1.2 required 2 RTTs.',
        'Forward secrecy (ECDHE) ensures past sessions are safe even if the server\'s private key is later compromised.',
        'The certificate chain of trust: end-entity cert → intermediate CA → root CA (pre-installed in OS trust stores).',
        'SNI allows multiple HTTPS domains per IP address; HSTS tells browsers to refuse HTTP connections.',
        'Certificate Transparency makes all public certs visible in append-only logs, enabling rapid detection of misissuance.',
      ]} />
    </LearnLayout>
  )
}
