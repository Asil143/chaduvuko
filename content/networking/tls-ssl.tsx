'use client'

import { useState } from 'react'
import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

// ── helpers ──────────────────────────────────────────────────────────────────
const G = '#10b981'
const Chapter = ({ n }: { n: number }) => (
  <p style={{ fontSize: 11, color: G, fontFamily: 'var(--font-mono)', fontWeight: 700,
    margin: '0 0 6px', letterSpacing: '.12em', textTransform: 'uppercase' }}>
    // Chapter {n}
  </p>
)
const Divider = () => <div style={{ borderTop: '1px solid var(--border)', margin: '52px 0' }} />
const Para = ({ children }: { children: React.ReactNode }) =>
  <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, margin: '0 0 18px' }}>{children}</p>
const H2 = ({ children }: { children: React.ReactNode }) =>
  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,3vw,28px)',
    fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', margin: '0 0 20px' }}>{children}</h2>
const H3 = ({ children }: { children: React.ReactNode }) =>
  <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', margin: '28px 0 12px' }}>{children}</h3>
const Accent = ({ children }: { children: React.ReactNode }) =>
  <strong style={{ color: G }}>{children}</strong>
const Code = ({ children }: { children: React.ReactNode }) =>
  <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13, background: 'var(--code-bg)',
    padding: '2px 6px', borderRadius: 4, color: G }}>{children}</code>
const CodeBlock = ({ children }: { children: React.ReactNode }) => (
  <pre style={{ fontFamily: 'var(--font-mono)', fontSize: 13, background: 'var(--code-bg)',
    border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px',
    overflowX: 'auto', margin: '20px 0', lineHeight: 1.7, color: 'var(--text)' }}>
    {children}
  </pre>
)
const StoryBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: `${G}08`, border: `1px solid ${G}22`, borderRadius: 12,
    padding: '20px 24px', margin: '24px 0' }}>
    <p style={{ fontSize: 11, fontWeight: 700, color: G, fontFamily: 'var(--font-mono)',
      textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 10px' }}>Story</p>
    <div style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85 }}>{children}</div>
  </div>
)
const WowBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: '#8b5cf608', border: '1px solid #8b5cf630', borderRadius: 12,
    padding: '20px 24px', margin: '24px 0' }}>
    <p style={{ fontSize: 11, fontWeight: 700, color: '#8b5cf6', fontFamily: 'var(--font-mono)',
      textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 10px' }}>Wow</p>
    <div style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85 }}>{children}</div>
  </div>
)
const Warn = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: '#f59e0b08', border: '1px solid #f59e0b30', borderRadius: 12,
    padding: '20px 24px', margin: '24px 0' }}>
    <p style={{ fontSize: 11, fontWeight: 700, color: '#f59e0b', fontFamily: 'var(--font-mono)',
      textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 10px' }}>Caution</p>
    <div style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85 }}>{children}</div>
  </div>
)
const Err = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ background: '#ef444408', border: '1px solid #ef444430', borderRadius: 12,
    padding: '20px 24px', margin: '24px 0' }}>
    <p style={{ fontSize: 11, fontWeight: 700, color: '#ef4444', fontFamily: 'var(--font-mono)',
      textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 10px' }}>
      Misconception — {title}
    </p>
    <div style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85 }}>{children}</div>
  </div>
)
const IQ = ({ level, children }: { level: 'Beginner' | 'Intermediate' | 'Senior' | 'PhD'; children: React.ReactNode }) => {
  const colors: Record<string, string> = {
    Beginner: '#10b981', Intermediate: '#3b82f6', Senior: '#8b5cf6', PhD: '#f97316'
  }
  const c = colors[level]
  return (
    <div style={{ background: `${c}08`, border: `1px solid ${c}30`, borderRadius: 12,
      padding: '20px 24px', margin: '24px 0' }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: c, fontFamily: 'var(--font-mono)',
        textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 10px' }}>
        IQ — {level}
      </p>
      <div style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85 }}>{children}</div>
    </div>
  )
}

// ── Interactive Component 1: TLS Handshake Visualizer ────────────────────────
type HandshakeVersion = 'tls12' | 'tls13'
interface TlsStep {
  id: number
  sender: 'client' | 'server' | 'both'
  message: string
  rtt: number
  note: string
}

const TLS12_STEPS: TlsStep[] = [
  { id: 1, sender: 'client', message: 'ClientHello', rtt: 1, note: 'TLS version, random, cipher suite list, extensions (SNI, ALPN)' },
  { id: 2, sender: 'server', message: 'ServerHello', rtt: 1, note: 'Chosen cipher suite, server random, session ID' },
  { id: 3, sender: 'server', message: 'Certificate', rtt: 1, note: 'X.509 cert chain — client verifies against trusted root store' },
  { id: 4, sender: 'server', message: 'ServerKeyExchange', rtt: 1, note: 'ECDHE: server DH public key + signature for authentication' },
  { id: 5, sender: 'server', message: 'ServerHelloDone', rtt: 1, note: 'Server finished its part of negotiation' },
  { id: 6, sender: 'client', message: 'ClientKeyExchange', rtt: 2, note: 'Client DH public key — both sides derive pre-master secret' },
  { id: 7, sender: 'client', message: 'ChangeCipherSpec', rtt: 2, note: 'Signals: all further records are encrypted' },
  { id: 8, sender: 'client', message: 'Finished', rtt: 2, note: 'HMAC over all handshake messages — proves both sides computed same keys' },
  { id: 9, sender: 'server', message: 'ChangeCipherSpec', rtt: 2, note: 'Server switches to encrypted mode' },
  { id: 10, sender: 'server', message: 'Finished', rtt: 2, note: 'Handshake complete — application data can now flow' },
]

const TLS13_STEPS: TlsStep[] = [
  { id: 1, sender: 'client', message: 'ClientHello', rtt: 1, note: 'TLS 1.3 version, random, cipher suite list, key_share extension (DH public key), supported_groups' },
  { id: 2, sender: 'server', message: 'ServerHello', rtt: 1, note: 'Chosen cipher, key_share response — both sides derive handshake keys immediately' },
  { id: 3, sender: 'server', message: 'EncryptedExtensions', rtt: 1, note: 'Extensions encrypted from here; ALPN, server name, etc.' },
  { id: 4, sender: 'server', message: 'Certificate', rtt: 1, note: 'Certificate is now encrypted — middleboxes cannot passively inspect' },
  { id: 5, sender: 'server', message: 'CertificateVerify', rtt: 1, note: 'Signature over handshake transcript with server private key' },
  { id: 6, sender: 'server', message: 'Finished', rtt: 1, note: 'HMAC over transcript — 1-RTT: server done, client can send data now' },
  { id: 7, sender: 'client', message: 'Finished', rtt: 2, note: 'Client Finished + optional early data (0-RTT) — handshake complete' },
]

function TlsHandshakeVisualizer() {
  const [version, setVersion] = useState<HandshakeVersion>('tls13')
  const [activeStep, setActiveStep] = useState<number | null>(null)

  const steps = version === 'tls13' ? TLS13_STEPS : TLS12_STEPS
  const rtts = version === 'tls13' ? 1 : 2
  const active = steps.find(s => s.id === activeStep)

  const senderColor = (s: TlsStep['sender']) => {
    if (s === 'client') return '#3b82f6'
    if (s === 'server') return G
    return '#8b5cf6'
  }

  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: 14, padding: '28px 24px', margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: G, fontFamily: 'var(--font-mono)',
        textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 18px' }}>
        TLS Handshake Visualizer
      </p>

      {/* Version toggle */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
        {(['tls13', 'tls12'] as HandshakeVersion[]).map(v => (
          <button key={v} onClick={() => { setVersion(v); setActiveStep(null) }}
            style={{ padding: '8px 18px', borderRadius: 8, border: `1px solid ${version === v ? G : 'var(--border)'}`,
              background: version === v ? `${G}18` : 'transparent', color: version === v ? G : 'var(--text)',
              fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-mono)' }}>
            {v === 'tls13' ? 'TLS 1.3 (1-RTT)' : 'TLS 1.2 (2-RTT)'}
          </button>
        ))}
      </div>

      {/* RTT indicator */}
      <div style={{ background: `${G}10`, border: `1px solid ${G}25`, borderRadius: 8,
        padding: '10px 16px', marginBottom: 20, fontSize: 13, color: G, fontFamily: 'var(--font-mono)' }}>
        Handshake latency: {rtts} RTT{rtts > 1 ? 's' : ''} before first application byte
        {version === 'tls13' && ' — 0-RTT resumption is possible on subsequent connections'}
      </div>

      {/* Message list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 20 }}>
        {steps.map(step => (
          <div key={step.id} onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
            style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px',
              borderRadius: 8, border: `1px solid ${activeStep === step.id ? senderColor(step.sender) : 'var(--border)'}`,
              background: activeStep === step.id ? `${senderColor(step.sender)}10` : 'transparent',
              cursor: 'pointer', transition: 'all 0.15s' }}>
            <span style={{ fontSize: 11, color: '#6b7280', fontFamily: 'var(--font-mono)', width: 20, flexShrink: 0 }}>
              {step.id}.
            </span>
            <span style={{ fontSize: 12, fontWeight: 700, color: senderColor(step.sender),
              fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.05em',
              width: 60, flexShrink: 0 }}>
              {step.sender === 'client' ? '← C' : step.sender === 'server' ? 'S →' : '↔'}
            </span>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', fontFamily: 'var(--font-mono)', flex: 1 }}>
              {step.message}
            </span>
            <span style={{ fontSize: 11, color: '#6b7280', fontFamily: 'var(--font-mono)', flexShrink: 0 }}>
              RTT {step.rtt}
            </span>
          </div>
        ))}
      </div>

      {/* Detail panel */}
      {active && (
        <div style={{ background: `${senderColor(active.sender)}08`, border: `1px solid ${senderColor(active.sender)}30`,
          borderRadius: 10, padding: '16px 18px' }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: senderColor(active.sender),
            fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 8px' }}>
            {active.message}
          </p>
          <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.7, margin: 0 }}>{active.note}</p>
        </div>
      )}
    </div>
  )
}

// ── Interactive Component 2: Cipher Suite Inspector ──────────────────────────
interface CipherSuite {
  id: string
  name: string
  keyExchange: string
  auth: string
  encryption: string
  mac: string
  pfs: boolean
  strength: 'strong' | 'acceptable' | 'weak' | 'broken'
  tlsVersions: string
  note: string
}

const CIPHER_SUITES: CipherSuite[] = [
  {
    id: 'tls13_aes128',
    name: 'TLS_AES_128_GCM_SHA256',
    keyExchange: 'ECDHE (built-in)',
    auth: 'Certificate (separate)',
    encryption: 'AES-128-GCM',
    mac: 'SHA-256 (AEAD)',
    pfs: true,
    strength: 'strong',
    tlsVersions: 'TLS 1.3 only',
    note: 'TLS 1.3 separates key exchange from cipher suite. ECDHE always used. AEAD provides authentication.',
  },
  {
    id: 'tls13_aes256',
    name: 'TLS_AES_256_GCM_SHA384',
    keyExchange: 'ECDHE (built-in)',
    auth: 'Certificate (separate)',
    encryption: 'AES-256-GCM',
    mac: 'SHA-384 (AEAD)',
    pfs: true,
    strength: 'strong',
    tlsVersions: 'TLS 1.3 only',
    note: 'Stronger AES key size. Preferred for high-security environments (government, finance).',
  },
  {
    id: 'tls12_ecdhe_rsa_aes128',
    name: 'ECDHE-RSA-AES128-GCM-SHA256',
    keyExchange: 'ECDHE',
    auth: 'RSA',
    encryption: 'AES-128-GCM',
    mac: 'SHA-256 (AEAD)',
    pfs: true,
    strength: 'strong',
    tlsVersions: 'TLS 1.2',
    note: 'The gold standard for TLS 1.2. ECDHE provides PFS; GCM is authenticated encryption.',
  },
  {
    id: 'tls12_ecdhe_rsa_chacha20',
    name: 'ECDHE-RSA-CHACHA20-POLY1305',
    keyExchange: 'ECDHE',
    auth: 'RSA',
    encryption: 'ChaCha20',
    mac: 'Poly1305 (AEAD)',
    pfs: true,
    strength: 'strong',
    tlsVersions: 'TLS 1.2 / 1.3',
    note: 'Preferred on mobile devices — ChaCha20 is faster than AES on CPUs without hardware acceleration.',
  },
  {
    id: 'tls12_dhe_rsa_aes256',
    name: 'DHE-RSA-AES256-SHA256',
    keyExchange: 'DHE (finite-field)',
    auth: 'RSA',
    encryption: 'AES-256-CBC',
    mac: 'HMAC-SHA256',
    pfs: true,
    strength: 'acceptable',
    tlsVersions: 'TLS 1.2',
    note: 'DHE with small DH groups (< 2048 bits) is vulnerable to Logjam. CBC mode requires careful padding.',
  },
  {
    id: 'tls12_rsa_aes256',
    name: 'RSA-AES256-SHA',
    keyExchange: 'RSA',
    auth: 'RSA',
    encryption: 'AES-256-CBC',
    mac: 'HMAC-SHA1',
    pfs: false,
    strength: 'acceptable',
    tlsVersions: 'TLS 1.0–1.2',
    note: 'RSA key exchange: client encrypts pre-master secret with server public key. No PFS — compromise of server key decrypts past sessions.',
  },
  {
    id: 'tls10_rc4_sha',
    name: 'RC4-SHA',
    keyExchange: 'RSA',
    auth: 'RSA',
    encryption: 'RC4',
    mac: 'HMAC-SHA1',
    pfs: false,
    strength: 'broken',
    tlsVersions: 'TLS 1.0–1.2',
    note: 'RC4 is cryptographically broken (NOMORE attack). RFC 7465 prohibits RC4 in TLS. Do not use.',
  },
  {
    id: 'ssl3_exp_rc4',
    name: 'EXP-RC4-MD5',
    keyExchange: 'RSA',
    auth: 'RSA',
    encryption: 'RC4-40 (export)',
    mac: 'HMAC-MD5',
    pfs: false,
    strength: 'broken',
    tlsVersions: 'SSL 3.0',
    note: 'Export-grade cipher limited to 40-bit keys by 1990s US export law. FREAK attack downgrades to these. MD5 is collision-broken.',
  },
]

const STRENGTH_COLOR: Record<string, string> = {
  strong: G,
  acceptable: '#f59e0b',
  weak: '#f97316',
  broken: '#ef4444',
}

function CipherSuiteInspector() {
  const [selected, setSelected] = useState<string | null>('tls13_aes128')
  const [filter, setFilter] = useState<'all' | 'strong' | 'acceptable' | 'broken'>('all')

  const filtered = CIPHER_SUITES.filter(c => filter === 'all' || c.strength === filter)
  const active = CIPHER_SUITES.find(c => c.id === selected)

  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: 14, padding: '28px 24px', margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: G, fontFamily: 'var(--font-mono)',
        textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 18px' }}>
        Cipher Suite Inspector
      </p>

      {/* Filter */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
        {(['all', 'strong', 'acceptable', 'broken'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{ padding: '6px 14px', borderRadius: 8,
              border: `1px solid ${filter === f ? (f === 'all' ? G : STRENGTH_COLOR[f]) : 'var(--border)'}`,
              background: filter === f ? `${f === 'all' ? G : STRENGTH_COLOR[f]}15` : 'transparent',
              color: filter === f ? (f === 'all' ? G : STRENGTH_COLOR[f]) : 'var(--text)',
              fontSize: 12, fontWeight: 600, cursor: 'pointer', textTransform: 'capitalize' }}>
            {f}
          </button>
        ))}
      </div>

      {/* Cipher list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 20 }}>
        {filtered.map(cs => (
          <div key={cs.id} onClick={() => setSelected(cs.id === selected ? null : cs.id)}
            style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px',
              borderRadius: 8, border: `1px solid ${selected === cs.id ? STRENGTH_COLOR[cs.strength] : 'var(--border)'}`,
              background: selected === cs.id ? `${STRENGTH_COLOR[cs.strength]}10` : 'transparent',
              cursor: 'pointer', transition: 'all 0.15s' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', flexShrink: 0,
              background: STRENGTH_COLOR[cs.strength] }} />
            <code style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text)', flex: 1 }}>
              {cs.name}
            </code>
            <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: '#6b7280', flexShrink: 0 }}>
              {cs.tlsVersions}
            </span>
            {cs.pfs && (
              <span style={{ fontSize: 11, fontWeight: 700, color: G,
                fontFamily: 'var(--font-mono)', flexShrink: 0 }}>PFS</span>
            )}
          </div>
        ))}
      </div>

      {/* Detail panel */}
      {active && (
        <div style={{ background: `${STRENGTH_COLOR[active.strength]}08`,
          border: `1px solid ${STRENGTH_COLOR[active.strength]}30`, borderRadius: 10, padding: '18px 20px' }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: STRENGTH_COLOR[active.strength],
            fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 14px' }}>
            {active.name}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: 10, marginBottom: 14 }}>
            {[
              { label: 'Key Exchange', val: active.keyExchange },
              { label: 'Auth', val: active.auth },
              { label: 'Encryption', val: active.encryption },
              { label: 'MAC', val: active.mac },
              { label: 'PFS', val: active.pfs ? 'Yes' : 'No' },
              { label: 'Strength', val: active.strength },
            ].map(f => (
              <div key={f.label} style={{ background: 'var(--code-bg)', borderRadius: 8, padding: '10px 12px' }}>
                <p style={{ fontSize: 11, color: '#6b7280', fontFamily: 'var(--font-mono)',
                  textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 4px' }}>{f.label}</p>
                <p style={{ fontSize: 13, fontWeight: 600, color: f.label === 'PFS' ? (active.pfs ? G : '#ef4444') :
                  f.label === 'Strength' ? STRENGTH_COLOR[active.strength] : 'var(--text)',
                  fontFamily: 'var(--font-mono)', margin: 0 }}>{f.val}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7, margin: 0 }}>{active.note}</p>
        </div>
      )}
    </div>
  )
}

// ── Interactive Component 3: Certificate Chain Explorer ──────────────────────
interface CertLevel {
  id: string
  label: string
  subject: string
  issuer: string
  validFrom: string
  validTo: string
  publicKey: string
  keyUsage: string
  san: string
  selfSigned: boolean
  note: string
}

const CERT_CHAIN: CertLevel[] = [
  {
    id: 'root',
    label: 'Root CA',
    subject: 'CN=ISRG Root X1, O=Internet Security Research Group, C=US',
    issuer: '(self-signed)',
    validFrom: '2015-06-04',
    validTo: '2035-06-04',
    publicKey: 'RSA 4096-bit',
    keyUsage: 'Certificate Sign, CRL Sign',
    san: 'N/A (CA certificate)',
    selfSigned: true,
    note: "Root CAs are self-signed — they're trusted because they're pre-installed in your OS/browser trust store. Let's Encrypt root.",
  },
  {
    id: 'intermediate',
    label: 'Intermediate CA',
    subject: "CN=R3, O=Let's Encrypt, C=US",
    issuer: 'ISRG Root X1',
    validFrom: '2020-09-04',
    validTo: '2025-09-15',
    publicKey: 'RSA 2048-bit',
    keyUsage: 'Certificate Sign, CRL Sign, OCSP Signing',
    san: 'N/A (CA certificate)',
    selfSigned: false,
    note: "Intermediate CAs sign end-entity certs. Root CAs stay offline in HSMs — the intermediate's private key is used daily.",
  },
  {
    id: 'leaf',
    label: 'Leaf Certificate',
    subject: 'CN=example.com',
    issuer: "R3, Let's Encrypt",
    validFrom: '2024-01-15',
    validTo: '2024-04-15',
    publicKey: 'ECDSA P-256',
    keyUsage: 'Digital Signature, Key Encipherment',
    san: 'DNS: example.com, DNS: www.example.com',
    selfSigned: false,
    note: "Leaf cert proves server identity. 90-day validity forces regular renewal. SANs list all valid domain names.",
  },
]

function CertificateChainExplorer() {
  const [selected, setSelected] = useState<string | null>('leaf')

  const active = CERT_CHAIN.find(c => c.id === selected)
  const certColor = (id: string) => {
    if (id === 'root') return '#f97316'
    if (id === 'intermediate') return '#8b5cf6'
    return G
  }

  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: 14, padding: '28px 24px', margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: G, fontFamily: 'var(--font-mono)',
        textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 18px' }}>
        Certificate Chain Explorer
      </p>

      {/* Chain visualization */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, marginBottom: 24 }}>
        {CERT_CHAIN.map((cert, i) => (
          <div key={cert.id} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div onClick={() => setSelected(cert.id === selected ? null : cert.id)}
              style={{ width: '100%', maxWidth: 400, padding: '14px 20px',
                border: `2px solid ${selected === cert.id ? certColor(cert.id) : 'var(--border)'}`,
                borderRadius: 10, background: selected === cert.id ? `${certColor(cert.id)}10` : 'var(--code-bg)',
                cursor: 'pointer', transition: 'all 0.15s', textAlign: 'center' }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: certColor(cert.id),
                fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 4px' }}>
                {cert.label}
              </p>
              <p style={{ fontSize: 12, color: 'var(--text)', fontFamily: 'var(--font-mono)', margin: 0 }}>
                {cert.subject.split(',')[0]}
              </p>
            </div>
            {i < CERT_CHAIN.length - 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '4px 0' }}>
                <div style={{ width: 2, height: 10, background: 'var(--border)' }} />
                <div style={{ fontSize: 11, color: '#6b7280', fontFamily: 'var(--font-mono)' }}>signs</div>
                <div style={{ width: 2, height: 10, background: 'var(--border)' }} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Detail */}
      {active && (
        <div style={{ background: `${certColor(active.id)}08`, border: `1px solid ${certColor(active.id)}30`,
          borderRadius: 10, padding: '18px 20px' }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: certColor(active.id),
            fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 14px' }}>
            {active.label} — Fields
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
            {[
              { label: 'Subject', val: active.subject },
              { label: 'Issuer', val: active.issuer },
              { label: 'Valid From', val: active.validFrom },
              { label: 'Valid To', val: active.validTo },
              { label: 'Public Key', val: active.publicKey },
              { label: 'Key Usage', val: active.keyUsage },
              { label: 'SAN', val: active.san },
              { label: 'Self-Signed', val: active.selfSigned ? 'Yes (trusted via OS store)' : 'No' },
            ].map(f => (
              <div key={f.label} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#6b7280',
                  fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.06em',
                  minWidth: 80, flexShrink: 0 }}>{f.label}</span>
                <span style={{ fontSize: 12, color: 'var(--text)', fontFamily: 'var(--font-mono)',
                  lineHeight: 1.5 }}>{f.val}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7, margin: 0 }}>{active.note}</p>
        </div>
      )}
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function TlsSslPage() {
  return (
    <LearnLayout
      title="TLS/SSL"
      description="How the internet encrypts a trillion connections per day — from the math of Diffie-Hellman to the politics of certificate authorities."
      section="Networking Fundamentals — Module 23"
      readTime="28–38 min"
      updatedAt="May 2026"
    >

      {/* ── Chapter 1 ──────────────────────────────────────────── */}
      <Chapter n={1} />
      <H2>The Eavesdropping Problem</H2>

      <StoryBox>
        <Para>2010. You're in a coffee shop, checking your bank balance over the WiFi. You don't know it, but the person at the next table is running Wireshark. Every packet you send — login form, cookie, balance response — is plaintext HTTP, visible to anyone who cares to look. This is not theoretical. The free tool Firesheep was released that year and let anyone hijack Facebook sessions on public WiFi with a single click. A million users were compromised in days.</Para>
        <Para>The web had a problem: two computers could talk to each other, but could not talk <em>privately</em>. HTTP, DNS, SMTP — the entire application layer was built with the assumption that the network was trustworthy. It is not.</Para>
        <Para>TLS is the protocol that fixes this. It does three things at once: <Accent>confidentiality</Accent> (no one can read your data), <Accent>integrity</Accent> (no one can modify it), and <Accent>authentication</Accent> (you know who you're talking to). Understanding TLS means understanding one of the most mathematically elegant engineering solutions in computer science.</Para>
      </StoryBox>

      <Para>TLS runs below the application layer and above TCP. It is transparent to HTTP, FTP, SMTP — any protocol that needs a secure channel simply wraps its connection in TLS. The "S" in HTTPS, FTPS, SMTPS, and IMAPS is always TLS.</Para>

      <H3>Why Not Just Encrypt Everything with a Password?</H3>
      <Para>The fundamental challenge of secure communication is <Accent>key distribution</Accent>: if you encrypt data with a key, how does the other party get the key without an eavesdropper intercepting it? You can't send the key in plaintext. You can't encrypt the key with another key without infinite recursion. This seems unsolvable — and was considered an open problem in cryptography until the 1970s.</Para>

      <WowBox>
        <Para>The Diffie-Hellman key exchange (1976) proved that two parties who have never communicated can establish a shared secret over a public channel, even with an eavesdropper recording every bit. This single insight made secure internet commerce possible. Whitfield Diffie and Martin Hellman received the Turing Award in 2015 for this discovery — nearly 40 years later.</Para>
      </WowBox>

      <Para>The magic ingredient is mathematics: specifically, operations that are easy to compute in one direction and computationally infeasible to reverse. Discrete logarithms, elliptic curves, RSA factoring — these "trapdoor functions" let you publish information that reveals nothing about your secret.</Para>

      <CodeBlock>{`# The Diffie-Hellman intuition (simplified, not real code):
# Agree publicly on: prime p=23, generator g=5

# Alice chooses secret a=6, sends A = g^a mod p = 5^6 mod 23 = 8
# Bob chooses secret b=15, sends B = g^b mod p = 5^15 mod 23 = 19

# Alice computes: B^a mod p = 19^6 mod 23 = 2   ← shared secret
# Bob computes:  A^b mod p = 8^15 mod 23 = 2    ← same shared secret
# Eve sees 8 and 19, but computing a from A = 5^a mod p requires
# solving the discrete log problem — infeasible for large primes`}</CodeBlock>

      <Divider />

      {/* ── Chapter 2 ──────────────────────────────────────────── */}
      <Chapter n={2} />
      <H2>SSL to TLS: A Protocol History</H2>

      <Para>SSL (Secure Sockets Layer) was invented by Netscape in 1994 to secure credit card transactions for their Netscape Commerce Server. It went through three major versions, each fixing critical flaws in the previous one. By the time SSL 3.0 was standardized, the IETF took over development and renamed it TLS (Transport Layer Security).</Para>

      <H3>The Version Graveyard</H3>
      <Para>• <Accent>SSL 2.0 (1995)</Accent>: Vulnerable to protocol downgrade attacks, weak MAC construction, susceptible to truncation attacks. Deprecated by RFC 6176 in 2011.</Para>
      <Para>• <Accent>SSL 3.0 (1996)</Accent>: Widely deployed for years, then killed by POODLE (2014) — a padding oracle attack that allows recovery of plaintext. RFC 7568 prohibits SSL 3.0 in 2015.</Para>
      <Para>• <Accent>TLS 1.0 (1999)</Accent>: RFC 2246. Essentially SSL 3.1 with minor changes. Vulnerable to BEAST (2011) and POODLE-TLS. PCI-DSS compliance required disabling it by June 2018. RFC 8996 deprecates it in 2021.</Para>
      <Para>• <Accent>TLS 1.1 (2006)</Accent>: RFC 4346. Added protection against BEAST, fixed IV handling. Still deprecated by RFC 8996 in 2021 — not enough improvements to justify supporting it separately.</Para>
      <Para>• <Accent>TLS 1.2 (2008)</Accent>: RFC 5246. Current baseline. Introduced AEAD cipher modes (GCM), removed MD5/SHA-1 from PRF, added elliptic curve support. Still supported and secure with modern cipher suites.</Para>
      <Para>• <Accent>TLS 1.3 (2018)</Accent>: RFC 8446. Ten years in the making. Removed all broken/weak algorithms, reduced handshake from 2-RTT to 1-RTT, made forward secrecy mandatory, encrypted the certificate. The current gold standard.</Para>

      <WowBox>
        <Para>TLS 1.3 development took four years and 28 drafts. The main obstacle was not technical — it was that middleboxes (corporate DPI appliances, network monitoring tools) relied on decrypting TLS traffic by knowing the server key. TLS 1.3's mandatory forward secrecy made this passive interception impossible. Enterprises lobbied heavily against adoption. The final RFC was published in August 2018.</Para>
      </WowBox>

      <Warn>
        <Para>As of 2024, TLS 1.0 and 1.1 are disabled in all major browsers. TLS 1.2 remains the minimum for broad compatibility. If you're configuring a server, set your minimum to TLS 1.2 with modern cipher suites, and prefer TLS 1.3. The <Code>ssl_protocols TLSv1.2 TLSv1.3;</Code> directive in Nginx is the standard production configuration.</Para>
      </Warn>

      <CodeBlock>{`# Check TLS support with openssl
openssl s_client -connect example.com:443 -tls1_3 </dev/null 2>&1 | grep "Protocol"
openssl s_client -connect example.com:443 -tls1_2 </dev/null 2>&1 | grep "Protocol"

# Check which protocols a server supports
nmap --script ssl-enum-ciphers -p 443 example.com

# Verify minimum TLS version in nginx config
grep ssl_protocols /etc/nginx/nginx.conf
# Expected: ssl_protocols TLSv1.2 TLSv1.3;`}</CodeBlock>

      <Divider />

      {/* ── Chapter 3 ──────────────────────────────────────────── */}
      <Chapter n={3} />
      <H2>The TLS Handshake: Making a Secret in Public</H2>

      <StoryBox>
        <Para>Imagine you need to pass a secret message to someone across a crowded room, but everyone in the room can hear everything you say. You can't whisper the key — anyone would hear it. So you do something clever: you each paint a can of paint with a public color, then add a secret color only you know. You swap the cans publicly. Then each of you adds your secret color to the can you received. Now both cans are the same color (public + Alice's secret + Bob's secret = public + Bob's secret + Alice's secret). No eavesdropper can determine the final color just by watching the exchange. This is Diffie-Hellman — and it's literally what TLS does mathematically.</Para>
      </StoryBox>

      <Para>The TLS handshake serves four purposes: <Accent>agree on a protocol version</Accent>, <Accent>negotiate cipher suites</Accent>, <Accent>authenticate the server</Accent> (and optionally the client), and <Accent>derive symmetric session keys</Accent>. The last point is important: TLS uses asymmetric cryptography only to establish keys, then switches to symmetric encryption (AES, ChaCha20) for data — because symmetric encryption is 1000x faster.</Para>

      <TlsHandshakeVisualizer />

      <H3>Key Derivation: The PRF and HKDF</H3>
      <Para>After the DH exchange, both sides have the same "pre-master secret." TLS mixes this with the client and server randoms through a <Accent>Pseudo-Random Function (PRF)</Accent> to derive distinct keys: client write key, server write key, client MAC key, server MAC key, and IVs. In TLS 1.3, this is replaced by HKDF (HMAC-based Key Derivation Function), which is cleaner and more formally analyzed.</Para>

      <Para>The client and server randoms are crucial: they prevent replay attacks. Even if an attacker records a TLS session and the server's private key is later compromised, the randoms ensure that each session produces unique keys — this is Perfect Forward Secrecy.</Para>

      <CodeBlock>{`# Watch TLS 1.3 handshake with Wireshark
# Filter: tls.handshake.type == 1  (ClientHello)
# Filter: tls.handshake.type == 2  (ServerHello)

# Decrypt TLS traffic (if you have the session key log):
# Set SSLKEYLOGFILE=/tmp/keys.log before starting browser
SSLKEYLOGFILE=/tmp/keys.log curl https://example.com
# Then in Wireshark: Edit → Preferences → TLS → (Pre)-Master-Secret log filename

# Inspect certificate with openssl
echo | openssl s_client -connect example.com:443 2>/dev/null | openssl x509 -text -noout`}</CodeBlock>

      <Divider />

      {/* ── Chapter 4 ──────────────────────────────────────────── */}
      <Chapter n={4} />
      <H2>TLS 1.3: Faster, Safer, Simpler</H2>

      <Para>TLS 1.3 is not an incremental improvement — it's a near-complete redesign guided by a decade of cryptographic analysis. The design philosophy: remove everything that isn't provably necessary, eliminate all algorithm agility that allows downgrade attacks, and make the common case (ECDHE + AEAD) as fast as possible.</Para>

      <H3>What Was Removed</H3>
      <Para>TLS 1.3 eliminated: RSA key exchange (no PFS), DHE with finite-field groups (Logjam-vulnerable), CBC cipher modes (BEAST, POODLE, Lucky13, GOLDENDOODLE), RC4 (NOMORE), 3DES (SWEET32), MD5 and SHA-1 in signatures, compression (CRIME), renegotiation, non-AEAD cipher suites, and custom DH groups. The attack surface shrank dramatically.</Para>

      <H3>1-RTT: The Latency Win</H3>
      <Para>TLS 1.2 required 2 round trips before the first application byte could be sent. TLS 1.3 requires only 1. The trick: the ClientHello includes the key_share extension with the client's DH public key (guessing that ECDHE with P-256 or X25519 will be chosen). The server responds with its DH public key in the same flight, and both sides derive traffic keys immediately. The server can start sending encrypted application data before the client's Finished arrives.</Para>

      <WowBox>
        <Para>TLS 1.3 also supports 0-RTT resumption: a returning client can send application data in the very first packet using a "pre-shared key" from a previous session. The server can process it before verifying the client Finished. This is a genuine cryptographic innovation — but comes with a tradeoff: 0-RTT data is vulnerable to replay attacks and must only be used for idempotent requests (GET, not POST).</Para>
      </WowBox>

      <H3>Encrypted Extensions</H3>
      <Para>In TLS 1.2, many extensions (including the server certificate) were sent in plaintext during the handshake. A passive eavesdropper could determine which certificate the server was using — revealing the site's identity. TLS 1.3 encrypts all extensions after the ServerHello, hiding the certificate from observers. This significantly improves privacy, though the server's IP and SNI (before Encrypted Client Hello) still reveal a lot.</Para>

      <Para>Encrypted Client Hello (ECH, formerly ESNI) is a further extension being standardized to encrypt even the SNI in the ClientHello, hiding which hostname the client is connecting to from network observers. Cloudflare has deployed it in production for many zones.</Para>

      <CodeBlock>{`# Check if TLS 1.3 is being used
curl -v --tls-max 1.3 https://example.com 2>&1 | grep "SSL connection"
# Expected: SSL connection using TLSv1.3 / TLS_AES_256_GCM_SHA384

# Test 0-RTT support
openssl s_client -connect example.com:443 -tls1_3 -sess_out /tmp/sess.pem < /dev/null
openssl s_client -connect example.com:443 -tls1_3 -sess_in /tmp/sess.pem -early_data /dev/null

# Nginx TLS 1.3 configuration
# ssl_protocols TLSv1.2 TLSv1.3;
# ssl_early_data on;   # enables 0-RTT (add anti-replay protection!)`}</CodeBlock>

      <Divider />

      {/* ── Chapter 5 ──────────────────────────────────────────── */}
      <Chapter n={5} />
      <H2>Certificate Chains and PKI</H2>

      <StoryBox>
        <Para>In 2011, a Dutch certificate authority called DigiNotar was hacked. The attackers issued fraudulent certificates for *.google.com, *.mozilla.com, *.microsoft.com, and 500 other domains. Iranian users were being silently man-in-the-middled — their "secure" HTTPS connections to Gmail were actually being intercepted. By the time Mozilla and Google pushed updates to distrust DigiNotar, thousands of users had been surveilled. DigiNotar declared bankruptcy within weeks. The incident illustrates the systemic vulnerability in PKI: trust is only as strong as the weakest CA.</Para>
      </StoryBox>

      <Para>Public Key Infrastructure (PKI) solves the authentication problem: how does your browser know that the certificate for bank.com actually belongs to bank.com and wasn't created by an attacker? The answer is a <Accent>chain of trust</Accent>: a hierarchy of Certificate Authorities (CAs) whose root certificates are pre-installed in operating systems and browsers.</Para>

      <CertificateChainExplorer />

      <H3>X.509 Certificate Fields</H3>
      <Para>Every TLS certificate is an X.509 v3 certificate containing: <Accent>Subject</Accent> (who this cert identifies), <Accent>Issuer</Accent> (who signed it), <Accent>Validity Period</Accent> (not before/not after), <Accent>Public Key</Accent> (the subject's public key), <Accent>Extensions</Accent> (Subject Alternative Names, Key Usage, Extended Key Usage, CA:TRUE/FALSE, OCSP URL), and the <Accent>CA's Signature</Accent> (cryptographic proof that the CA approved this certificate).</Para>

      <H3>How Browsers Verify Certificates</H3>
      <Para>When your browser receives a certificate chain, it:</Para>
      <Para>1. Verifies each certificate's signature using the issuer's public key</Para>
      <Para>2. Checks validity periods (not before/not after)</Para>
      <Para>3. Confirms the chain terminates at a trusted root in the OS/browser trust store</Para>
      <Para>4. Checks the certificate's <Code>subjectAltName</Code> extension includes the hostname you're connecting to</Para>
      <Para>5. Checks revocation status via OCSP or CRL</Para>
      <Para>6. Verifies the leaf cert has the <Code>extendedKeyUsage</Code> for TLS Web Server Authentication</Para>

      <Warn>
        <Para>Let's Encrypt certificates expire in 90 days by design — short validity forces automation and limits the damage window if a key is compromised. If you're running your own servers, use certbot or acme.sh for automatic renewal via cron. A Let's Encrypt cert expiring in production is an entirely preventable outage.</Para>
      </Warn>

      <H3>Certificate Revocation: OCSP and CRL</H3>
      <Para>When a private key is compromised, the CA must revoke the certificate. Two mechanisms exist: <Accent>CRL</Accent> (Certificate Revocation List) — a periodically-published list of serial numbers, large and slow to download. <Accent>OCSP</Accent> (Online Certificate Status Protocol) — a real-time query to the CA asking "is this cert revoked?" OCSP stapling improves this: the server pre-fetches its own OCSP response and includes it in the TLS handshake, avoiding the extra round trip and privacy leak.</Para>

      <WowBox>
        <Para>In 2020, Apple announced that Safari would cap certificate validity at 398 days (13 months). Any cert issued after September 1, 2020 with a longer validity would be rejected — regardless of CA. This was a unilateral policy change by Apple enforced through browser behavior, not IETF standards. The industry followed. Effective certificate maximal validity in 2024 is now 398 days across all major browsers.</Para>
      </WowBox>

      <Divider />

      {/* ── Chapter 6 ──────────────────────────────────────────── */}
      <Chapter n={6} />
      <H2>Cipher Suites: Mixing Algorithms</H2>

      <Para>A cipher suite is a specification of four algorithms that work together: <Accent>key exchange</Accent> (how to establish the shared secret), <Accent>authentication</Accent> (how to prove server identity), <Accent>bulk encryption</Accent> (how to encrypt data), and <Accent>MAC</Accent> (how to verify integrity). In TLS 1.2, the cipher suite bundles all four. In TLS 1.3, key exchange and authentication are decoupled — the suite only specifies the symmetric encryption and hash algorithm.</Para>

      <Para>Reading a TLS 1.2 cipher suite name: <Code>TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256</Code> breaks down as: protocol (TLS), key exchange (ECDHE), authentication (RSA), encryption (AES-128-GCM), MAC (SHA256). In TLS 1.3, <Code>TLS_AES_128_GCM_SHA256</Code> omits key exchange/auth entirely — they're always ECDHE and certificate-based.</Para>

      <CipherSuiteInspector />

      <H3>AEAD: Authenticated Encryption with Associated Data</H3>
      <Para>Traditional cipher modes (CBC, CTR) only encrypt. Integrity must be added separately with HMAC, leading to subtle vulnerabilities in the ordering of operations (encrypt-then-MAC vs MAC-then-encrypt). <Accent>AEAD modes</Accent> (AES-GCM, ChaCha20-Poly1305) combine encryption and authentication in a single operation, proven secure by construction. TLS 1.3 mandates AEAD-only cipher suites, eliminating a whole class of padding oracle and MAC timing attacks.</Para>

      <Para>AES-GCM (Galois/Counter Mode) is the workhorse: AES in CTR mode for encryption, GHASH (Galois field multiplication) for authentication. On modern x86 CPUs with AES-NI and CLMUL hardware instructions, AES-GCM achieves 10–40 Gbps throughput per core. ChaCha20-Poly1305 achieves similar performance in software, making it ideal for ARM mobile devices without hardware AES acceleration.</Para>

      <CodeBlock>{`# List cipher suites supported by your system
openssl ciphers -v 'ALL:COMPLEMENTOFALL' | head -30

# Test specific cipher suite against server
openssl s_client -connect example.com:443 -cipher ECDHE-RSA-AES128-GCM-SHA256

# Generate strong Nginx cipher suite configuration
# ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384;
# ssl_prefer_server_ciphers off;  # Let client choose (both are strong)

# Grade your TLS configuration
# https://ssllabs.com/ssltest (Qualys) — automated cipher/cert/protocol analysis`}</CodeBlock>

      <Divider />

      {/* ── Chapter 7 ──────────────────────────────────────────── */}
      <Chapter n={7} />
      <H2>Perfect Forward Secrecy</H2>

      <StoryBox>
        <Para>Imagine the NSA has been recording every TLS-encrypted packet passing through a fiber optic cable since 2005. They can't decrypt any of it — yet. But they're patient. In 2010, they obtain (legally or otherwise) the private key of a major bank. Now they can decrypt every session that bank's server had from 2005 to 2010. Millions of users' login credentials, transactions, and messages — retroactively compromised. This is the threat model that Perfect Forward Secrecy (PFS) addresses.</Para>
      </StoryBox>

      <Para>In classic RSA key exchange, the client encrypts the pre-master secret using the server's long-term RSA public key. If the server's private key is ever compromised — by theft, legal compulsion, insider threat, or cryptanalysis — every past session can be decrypted by anyone who recorded the traffic.</Para>

      <Para><Accent>Perfect Forward Secrecy</Accent> (also called "forward secrecy") breaks this link. When key exchange uses ephemeral Diffie-Hellman (DHE or ECDHE), a new DH key pair is generated for every session. The session key is derived from this ephemeral key, not the long-term certificate key. The ephemeral private key is discarded after the handshake. Even if the server's certificate private key is stolen, past sessions remain secure — the ephemeral keys are gone.</Para>

      <H3>ECDHE vs DHE</H3>
      <Para>Elliptic Curve Diffie-Hellman Ephemeral (ECDHE) is preferred over finite-field DHE because it achieves the same security with much smaller keys. A 256-bit ECDHE key provides security equivalent to a 3072-bit RSA key. The performance difference is significant — ECDHE handshakes are roughly 10x faster than equivalent RSA key exchange for high-security key sizes. Curve X25519 (designed by Daniel Bernstein) is the preferred curve in TLS 1.3 — it's fast, formally analyzed, and avoids the NIST curve controversy.</Para>

      <WowBox>
        <Para>In 2013, Edward Snowden's leaks revealed that the NSA had collected massive amounts of encrypted internet traffic. Security researchers noted that most servers at the time were using RSA key exchange (no PFS), meaning the NSA could theoretically decrypt everything retrospectively once they had the keys. This revelation accelerated the industry-wide adoption of ECDHE. By 2016, over 80% of HTTPS connections used forward secrecy. Today, TLS 1.3 makes it mandatory.</Para>
      </WowBox>

      <Divider />

      {/* ── Chapter 8 ──────────────────────────────────────────── */}
      <Chapter n={8} />
      <H2>Session Resumption and 0-RTT</H2>

      <Para>A full TLS handshake is expensive — especially at scale. A CDN handling 10 million TLS connections per second can't afford a full RSA/ECDHE handshake for every one. Session resumption allows previously-established sessions to be reconnected with a shorter handshake, skipping the certificate exchange and key derivation from scratch.</Para>

      <H3>TLS 1.2: Session IDs and Session Tickets</H3>
      <Para>Two mechanisms existed in TLS 1.2. <Accent>Session IDs</Accent>: the server assigns a session ID and stores the session state; the client presents it on reconnect. Problem: server-side state doesn't scale across server clusters. <Accent>Session Tickets</Accent> (RFC 5077): the server encrypts the session state with a server-side ticket key and sends it to the client. On reconnect, the client sends the ticket, the server decrypts it and resumes. Scales horizontally — but the ticket encryption key becomes a long-term secret that must be rotated.</Para>

      <H3>TLS 1.3: PSK and 0-RTT</H3>
      <Para>TLS 1.3 uses <Accent>Pre-Shared Key (PSK)</Accent> resumption. After a session, the server sends a <Code>NewSessionTicket</Code> message with a PSK identity and ticket. On reconnect, the client includes the PSK in the ClientHello, and the server can resume in 1-RTT. With <Accent>0-RTT Early Data</Accent>, the client can send application data in the very first flight — before the handshake completes — using keys derived from the PSK.</Para>

      <Warn>
        <Para>0-RTT data is not protected against replay attacks. An attacker can replay the 0-RTT data to make the server process a request twice. Only use 0-RTT for idempotent requests (HTTP GET). Never use it for POST, PUT, DELETE, payment flows, or anything with side effects. HTTP/3 (QUIC + TLS 1.3) disables 0-RTT by default for non-safe HTTP methods. Server-side replay protection using a token database is required for safe 0-RTT in high-security contexts.</Para>
      </Warn>

      <Divider />

      {/* ── Chapter 9 ──────────────────────────────────────────── */}
      <Chapter n={9} />
      <H2>Certificate Transparency</H2>

      <StoryBox>
        <Para>2015. Google discovered that Symantec had issued EV certificates for google.com domains without Google's knowledge — as a test, Symantec said. Google was not amused. They threatened to distrust Symantec's entire root unless CT logging became mandatory for all certificates. Symantec ultimately lost its CA status in 2018 (absorbed by DigiCert). The incident proved that without a public, tamper-evident log of every certificate issued, rogue CA behavior was undetectable until the damage was done.</Para>
      </StoryBox>

      <Para>Certificate Transparency (CT) is a mechanism where every publicly-trusted certificate must be logged in a public, append-only, cryptographically-verifiable log before browsers will accept it. Chrome has required CT since April 2018 — any certificate without a Signed Certificate Timestamp (SCT) is rejected.</Para>

      <Para>The logs are public: anyone can query them and discover certificates issued for their domain. This means domain owners get automatic notification if someone (a rogue CA, a compromised CA) issues a certificate for their domain. Google's certificate search at <Code>crt.sh</Code> indexes all CT logs and is invaluable for security auditing.</Para>

      <H3>How CT Works</H3>
      <Para>A CA submits a pre-certificate (identical to the final cert but with a poison extension) to multiple CT logs. Each log returns a Signed Certificate Timestamp (SCT) — a cryptographic promise to include the cert within a merge delay (usually 24 hours). The CA embeds these SCTs in the final certificate. Your browser verifies the SCTs during the TLS handshake, confirming the certificate is in the public logs.</Para>

      <CodeBlock>{`# Query CT logs for certificates issued for a domain
curl -s "https://crt.sh/?q=%.example.com&output=json" | jq '.[0:5]'

# Check CT SCTs in a certificate
openssl x509 -in cert.pem -text -noout | grep -A 20 "CT Precertificate SCTs"

# Monitor for new certs issued for your domain
# Use certspotter, ct-monitor, or Facebook's Certificate Transparency Monitoring
# (available at developers.facebook.com/tools/ct)`}</CodeBlock>

      <Divider />

      {/* ── Chapter 10 ──────────────────────────────────────────── */}
      <Chapter n={10} />
      <H2>SNI and Virtual Hosting</H2>

      <Para>Before SNI existed, HTTPS and virtual hosting were incompatible. A server could only have one certificate per IP address — because the TLS handshake happens before the HTTP Host header is sent. If you put multiple HTTPS sites on one IP, the server had no way to know which certificate to present before the encrypted connection was established. The result: each HTTPS site needed its own IP address.</Para>

      <Para><Accent>Server Name Indication (SNI)</Accent>, defined in RFC 6066, solves this by adding a <Code>server_name</Code> extension to the ClientHello. The client announces which hostname it's trying to reach before encryption begins, allowing the server to select the correct certificate. This enabled CDNs, shared hosting, and modern cloud infrastructure — a single IP can now serve thousands of HTTPS sites.</Para>

      <H3>The SNI Privacy Problem</H3>
      <Para>SNI is sent in plaintext. Any observer on the network path (your ISP, a coffee shop router, a government firewall) can see which hostname you're connecting to, even on HTTPS. China's Great Firewall uses SNI inspection to block specific HTTPS sites. This is why Encrypted Client Hello (ECH) is being developed — it encrypts the inner ClientHello (including SNI) using the server's public key, revealed only in DNS. ECH requires DNS-over-HTTPS (DoH) for the public key retrieval to be secure.</Para>

      <WowBox>
        <Para>Cloudflare serves over 25 million domains from roughly 1,500 IP addresses. Without SNI (or with only one cert per IP), they would need 25 million IP addresses — the entire IPv4 space is only ~4.3 billion addresses, with less than 100 million available. SNI is the technology that makes CDN-scale HTTPS economically feasible.</Para>
      </WowBox>

      <Divider />

      {/* ── Chapter 11 ──────────────────────────────────────────── */}
      <Chapter n={11} />
      <H2>mTLS: Client Authentication</H2>

      <Para>Standard TLS authenticates only the server. The client remains anonymous — the server has no cryptographic proof of who the client is. For most web applications this is fine; identity is established via credentials (passwords, OAuth tokens) sent over the encrypted channel after the handshake.</Para>

      <Para>But for machine-to-machine communication — microservices, API gateways, service mesh, IoT devices — passwords are awkward. Mutual TLS (mTLS) extends the handshake: the server requests a certificate from the client, and the client presents one. Both parties authenticate each other before any application data flows.</Para>

      <H3>mTLS in Modern Infrastructure</H3>
      <Para>• <Accent>Service mesh</Accent> (Istio, Linkerd): automatically provisions mTLS certificates for every pod in a Kubernetes cluster, with zero application code changes. All inter-service traffic is mutually authenticated and encrypted.</Para>
      <Para>• <Accent>Zero-trust networking</Accent>: every service proves identity before any request is accepted. No implicit trust based on being "inside the network."</Para>
      <Para>• <Accent>API security</Accent>: payment processors, cloud APIs, and banking APIs use mTLS to authenticate calling services, preventing request forgery from other services in a compromised environment.</Para>
      <Para>• <Accent>IoT device authentication</Accent>: devices carry a certificate burned at manufacturing time; the server validates it to confirm device identity before accepting telemetry or firmware updates.</Para>

      <CodeBlock>{`# Generate CA, client cert, server cert for mTLS testing
openssl genrsa -out ca.key 4096
openssl req -new -x509 -key ca.key -out ca.crt -days 3650 -subj "/CN=TestCA"

openssl genrsa -out client.key 2048
openssl req -new -key client.key -out client.csr -subj "/CN=my-client"
openssl x509 -req -in client.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out client.crt -days 365

# Test mTLS with curl
curl --cert client.crt --key client.key --cacert ca.crt https://mtls-server.example.com

# Nginx mTLS configuration
# ssl_client_certificate /etc/nginx/ca.crt;
# ssl_verify_client on;`}</CodeBlock>

      <Divider />

      {/* ── Chapter 12 ──────────────────────────────────────────── */}
      <Chapter n={12} />
      <H2>TLS Attack History</H2>

      <Para>TLS has been attacked relentlessly since its invention. Each attack exploited either a design flaw, an implementation flaw, or a negotiation flaw that allowed downgrade to a weaker mode. Understanding the attack history is not just academic — it's why TLS 1.3 made the choices it did.</Para>

      <H3>BEAST (2011)</H3>
      <Para>Browser Exploit Against SSL/TLS. Exploited a CBC mode flaw in TLS 1.0/SSL — the IV for each record was predictable (the previous record's last block). Allowed chosen-plaintext attacks to decrypt specific bytes (e.g., session cookies). Mitigated by 1/n-1 record splitting, and ultimately by migrating to TLS 1.2 with RC4 (then later AEAD). RC4 was enabled widely as a BEAST workaround — introducing the next problem.</Para>

      <H3>CRIME (2012) and BREACH (2013)</H3>
      <Para>Compression oracle attacks. CRIME (Compression Ratio Info-leak Made Easy): if TLS compression is enabled, an attacker who can inject data into requests can determine secret bytes by watching compression ratios. BREACH (Browser Reconnaissance and Exfiltration via Adaptive Compression of Hypertext): same attack but against HTTP compression. Mitigated by: never using TLS compression (disabled by all major implementations), never compressing pages that contain secrets alongside user-controlled content, or randomizing the secret position.</Para>

      <H3>HEARTBLEED (2014)</H3>
      <Para>Not a protocol vulnerability — an implementation bug in OpenSSL's heartbeat extension. The heartbeat message includes a payload length; OpenSSL failed to validate that the actual payload matched the claimed length. An attacker could send a 1-byte payload claiming 64KB length and receive 64KB of server memory — potentially including private keys, passwords, session tokens. The most widespread security vulnerability in internet history — affecting an estimated 17% of all HTTPS servers at disclosure.</Para>

      <H3>POODLE (2014)</H3>
      <Para>Padding Oracle On Downgraded Legacy Encryption. SSL 3.0 uses CBC mode without proper MAC verification before padding removal. An attacker who can insert themselves on the network and force connection retries can force a TLS 1.x → SSL 3.0 downgrade, then exploit the padding oracle. Mitigation: disable SSL 3.0 entirely. TLS_FALLBACK_SCSV (a new cipher suite value signaling "this is my minimum version") prevents the downgrade.</Para>

      <H3>FREAK (2015) and Logjam (2015)</H3>
      <Para>Both exploited export-grade cryptography residue — the 40-bit and 512-bit keys required by 1990s US export controls, still present in server implementations. FREAK (Factoring RSA Export Keys): force downgrade to RSA-512, factor it in hours. Logjam: force downgrade to DHE-512 (discrete log in a finite field), precompute the discrete logs for common 512-bit groups. Both attacks required MitM position but exploited server misconfiguration. Mitigated by removing all export cipher support.</Para>

      <H3>DROWN (2016)</H3>
      <Para>Decrypting RSA with Obsolete and Weakened eNcryption. If a server supports SSLv2 (even on a different port or service) using the same certificate/key as an HTTPS server, an attacker can use SSLv2 as an oracle to decrypt TLS sessions targeting that key. Affected 33% of all HTTPS servers. Mitigated by: disable SSLv2 everywhere, never reuse keys across protocols.</Para>

      <CodeBlock>{`# Check for POODLE, BEAST, CRIME, HEARTBLEED vulnerabilities
testssl.sh example.com              # comprehensive TLS vulnerability scanner
# Or use nmap scripts:
nmap --script ssl-poodle -p 443 example.com
nmap --script ssl-heartbleed -p 443 example.com
nmap --script ssl-dh-params -p 443 example.com   # Logjam / Weak DH

# Check for export cipher support (FREAK)
nmap --script ssl-enum-ciphers -p 443 example.com | grep -i export`}</CodeBlock>

      <Divider />

      {/* ── Chapter 13 ──────────────────────────────────────────── */}
      <Chapter n={13} />
      <H2>Common Misconceptions</H2>

      <Err title="HTTPS means the site is safe">
        <Para>HTTPS means the connection between your browser and the server is encrypted. It says nothing about whether the server is trustworthy, whether the site is a phishing page, or whether the content is legitimate. A phishing site can have a valid TLS certificate (Let's Encrypt issues them free to anyone). The padlock icon means "encrypted," not "trustworthy." Phishing sites on HTTPS have been standard practice since 2017 when free CA adoption exploded.</Para>
      </Err>

      <Err title="TLS protects against server compromise">
        <Para>TLS secures the communication channel. If the server itself is compromised, the attacker has access to the plaintext data before it's encrypted for transmission. A server-side breach bypasses TLS entirely — the attacker sees what the server sees. TLS is not a substitute for server hardening, secure coding, and access controls.</Para>
      </Err>

      <Err title="Self-signed certificates are equivalent to CA-signed ones for security">
        <Para>Self-signed certificates provide the same cryptographic strength for encryption. But they provide no authentication — a browser warning appears because there's no third party vouching that the certificate actually belongs to who it claims to belong to. An attacker could create their own self-signed certificate claiming to be your bank. For public-facing services, always use a trusted CA. For internal services where you control the trust store, a private CA is acceptable.</Para>
      </Err>

      <Err title="TLS 1.2 with AES-256 is more secure than TLS 1.3 with AES-128">
        <Para>The AES key size is not the limiting security factor. A 128-bit symmetric key provides 2^128 security, which is computationally infeasible to brute-force. The weaker elements in TLS 1.2 are the protocol design (more attack surface, potential downgrade vectors), older cipher modes (CBC instead of AEAD), and less rigorous key derivation. TLS 1.3 with AES-128-GCM is more secure in practice than TLS 1.2 with AES-256-CBC, even though 256 {'>'}128.</Para>
      </Err>

      <Err title="Certificate pinning always improves security">
        <Para>Certificate pinning (hardcoding the expected certificate or public key in a client application) was popular in mobile security, but has largely been deprecated. When a pinned certificate expires or is rotated, the app breaks for all users — causing outages. Google removed HPKP (HTTP Public Key Pinning) from Chrome in 2018 because the operational risk outweighed the security benefit. Certificate Transparency provides similar protection (detecting rogue cert issuance) without the operational fragility.</Para>
      </Err>

      <Err title="Wildcard certificates are always appropriate">
        <Para>A wildcard cert (*.example.com) is convenient but dangerous at scale. If the wildcard private key is compromised, every subdomain is compromised. Wildcard certs cannot be scoped to specific subdomains — if you have 500 services sharing a wildcard, a compromise of any one potentially exposes all 500. For high-security services, individual per-service certificates (with automated issuance via ACME) are safer. Wildcards should not be used for two-level wildcards or for wildcard plus other names on the same key.</Para>
      </Err>

      <Divider />

      {/* ── Chapter 14 ──────────────────────────────────────────── */}
      <Chapter n={14} />
      <H2>IQ Depth Check</H2>

      <IQ level="Beginner">
        <Para>TLS encrypts the connection between your browser and a server so that no one in the middle can read your data. When you see a padlock in your browser, it means the connection is encrypted using TLS. HTTPS is HTTP running over TLS. The server has a certificate that proves its identity, issued by a Certificate Authority that your browser trusts.</Para>
      </IQ>

      <IQ level="Intermediate">
        <Para>TLS 1.3 requires exactly 1 RTT for a full handshake (vs TLS 1.2's 2 RTT), mandatory ECDHE key exchange for forward secrecy, and AEAD cipher suites only. The certificate is encrypted during the handshake. Session resumption via PSK enables 0-RTT for returning clients, but 0-RTT data is replay-vulnerable and must be limited to idempotent operations. SNI allows multiple HTTPS sites per IP but leaks the target hostname to network observers. mTLS enables mutual authentication for service-to-service communication.</Para>
      </IQ>

      <IQ level="Senior">
        <Para>TLS 1.3 key schedule uses HKDF with separate handshake and application traffic secrets. The transcript hash binds all messages; the Finished message is an HMAC over the transcript using the finished_key derived from the handshake secret. Forward secrecy is achieved by deleting ephemeral ECDHE key pairs immediately after key derivation. 0-RTT security properties: anti-replay requires server-side nonce tracking (within the ticket lifetime window). ECH encrypts the inner ClientHello using the Encrypted Client Hello config published in DNS HTTPS records. Certificate Transparency requires SCTs from at least two independent logs (per Chrome CT policy). OCSP Must-Staple extension forces servers to include a stapled OCSP response or browsers reject the certificate entirely.</Para>
      </IQ>

      <IQ level="PhD">
        <Para>TLS 1.3 formal security proofs (Dowling et al., 2017; JKSS 2018) establish that the TLS 1.3 handshake achieves <em>multi-stage key exchange</em> security under the <em>modular computational model</em> — specifically: stage-0 (0-RTT) achieves forward secrecy under the PRF-ODH assumption only for forward-secret mode; stage-1/2 (1-RTT) achieves full FS under PRF-ODH. The HKDF Extract/Expand construction satisfies the KDF security notion when the input key material is pseudorandom. The Diffie-Hellman key exchange over Curve25519 (X25519) is proven secure under the Decisional Diffie-Hellman (DDH) assumption in the generic group model, with constant-time implementation to prevent timing side-channels. ChaCha20-Poly1305's security reduction to the unpredictability of Poly1305 over GF(2^130-5) is tight. The formal security of TLS 1.3's record protocol under AEAD nonce-misuse resistance has been analyzed in the RO+UC framework. Known open problems: side-channel timing attacks on ECDSA signing (partially mitigated by EdDSA/Ed25519), the assumption that browsers properly validate CT consistency proofs (gossip protocol not yet widely deployed), and the security of PSK-only mode (without (EC)DHE) against quantum adversaries — post-quantum TLS using CRYSTALS-Kyber is currently in IETF draft standardization (hybrid X25519Kyber768).</Para>
      </IQ>

      <Divider />

      <KeyTakeaways items={[
        'TLS provides confidentiality, integrity, and authentication using a combination of asymmetric (handshake) and symmetric (record) cryptography.',
        'TLS 1.3 reduces handshake latency to 1-RTT (vs 2-RTT for TLS 1.2), makes forward secrecy mandatory, and removes all non-AEAD cipher suites.',
        'Diffie-Hellman key exchange (ECDHE in modern TLS) allows two parties to establish a shared secret over a public channel with no prior coordination.',
        'Perfect Forward Secrecy means a compromise of the server\'s long-term key does not compromise past sessions — because ephemeral session keys are discarded immediately.',
        'Certificate chains create a hierarchy of trust: browsers trust root CAs pre-installed in the OS, which sign intermediate CAs, which sign leaf certificates.',
        'Certificate Transparency logs every public certificate in tamper-evident, append-only logs, allowing domain owners to detect rogue certificate issuance.',
        'Cipher suites specify the algorithms for key exchange, authentication, bulk encryption, and MAC. TLS 1.3 mandates AEAD modes (AES-GCM or ChaCha20-Poly1305).',
        'SNI allows multiple HTTPS sites per IP but exposes the target hostname in plaintext; Encrypted Client Hello (ECH) addresses this privacy gap.',
        'mTLS extends TLS to authenticate both parties, enabling zero-trust service-to-service communication without passwords.',
        'TLS 1.0, 1.1, SSL 3.0, and SSL 2.0 are all deprecated and broken. The minimum acceptable version is TLS 1.2 with ECDHE and AEAD cipher suites.',
      ]} />
    </LearnLayout>
  )
}
