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

// ─── interactive component 1: NTP Stratum Explorer ───────────────────────────
type StratumNode = {
  stratum: number
  label: string
  examples: string[]
  accuracy: string
  description: string
  color: string
}
const STRATUM_NODES: StratumNode[] = [
  { stratum: 0, label: 'Reference Clocks (Stratum 0)', examples: ['GPS receivers', 'Rubidium atomic clocks', 'Cesium beam clocks', 'WWVB/DCF77 radio receivers'], accuracy: '±10–100 nanoseconds', description: 'Hardware timekeeping devices that derive time from an authoritative source (GPS satellites, atomic standards, radio). These are not networked — they provide a 1PPS (pulse per second) signal to a directly-connected computer via serial/USB. They do not speak NTP.', color: '#6366f1' },
  { stratum: 1, label: 'Primary Time Servers (Stratum 1)', examples: ['time.nist.gov', 'time.cloudflare.com', 'pool.ntp.org (tier-1)'], accuracy: '±1–100 microseconds', description: 'Computers directly connected to a Stratum 0 reference clock. They speak NTP and serve time to Stratum 2 servers. These are the root of the NTP hierarchy. Running your own Stratum 1 requires a GPS receiver and careful tuning.', color: '#8b5cf6' },
  { stratum: 2, label: 'Secondary Time Servers (Stratum 2)', examples: ['Corporate NTP servers', 'ISP time servers', 'pool.ntp.org (tier-2)'], accuracy: '±1–10 milliseconds', description: 'Servers that synchronize from multiple Stratum 1 sources. Most organization NTP servers are Stratum 2. They serve time to internal clients (Stratum 3). For most purposes, Stratum 2 provides sufficient accuracy.', color: '#3b82f6' },
  { stratum: 3, label: 'Tertiary Servers (Stratum 3)', examples: ['Office distribution servers', 'Cloud VM NTP hosts'], accuracy: '±10–50 milliseconds', description: 'Synchronize from Stratum 2 servers. Each hop adds jitter and potential error. Stratum 3 is common in large organizations where Stratum 2 servers cannot serve all clients directly.', color: '#10b981' },
  { stratum: 15, label: 'Unsynchronized (Stratum 15)', examples: ['Servers with no NTP server reachable', 'Recently booted systems'], accuracy: 'Unknown drift', description: 'A stratum value of 15 indicates the server is unsynchronized or in an error state. A stratum of 16 (MAXSTRAT) means "we have no idea what time it is" — this server should not be used as a time source.', color: '#f59e0b' },
  { stratum: 16, label: 'MAXSTRAT — Invalid (Stratum 16)', examples: ['NTP server with no upstream', 'Falseticker detected'], accuracy: 'Invalid', description: 'Stratum 16 is NTP\'s way of saying "do not use me as a time source." A server advertising stratum 16 has either lost all its upstream references or has detected a clock anomaly. Clients should not synchronize to stratum 16 servers.', color: '#ef4444' },
]

function NtpStratumExplorer() {
  const [active, setActive] = useState<number>(2)
  const n = STRATUM_NODES.find(s => s.stratum === active)!

  return (
    <div style={{ background: '#f8fafc', border: '2px solid #6366f1', borderRadius: '14px', padding: '1.5rem', margin: '1.5rem 0' }}>
      <h3 style={{ fontWeight: 800, color: '#6366f1', marginBottom: '0.25rem' }}>NTP Stratum Hierarchy Explorer</h3>
      <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.25rem' }}>Select a stratum level to see its role, accuracy, and examples.</p>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        {STRATUM_NODES.map(s => (
          <button key={s.stratum} onClick={() => setActive(s.stratum)}
            style={{ padding: '0.45rem 0.9rem', borderRadius: '8px', border: `2px solid ${s.color}`, background: active === s.stratum ? s.color : '#fff', color: active === s.stratum ? '#fff' : s.color, fontWeight: 700, cursor: 'pointer', fontSize: '0.88rem' }}>
            Stratum {s.stratum}
          </button>
        ))}
      </div>
      <div style={{ background: '#fff', borderRadius: '10px', border: `2px solid ${n.color}`, padding: '1.1rem 1.25rem' }}>
        <div style={{ fontWeight: 800, color: n.color, fontSize: '1.05rem', marginBottom: '0.4rem' }}>{n.label}</div>
        <div style={{ background: '#f0f4ff', borderRadius: '7px', padding: '0.4rem 0.85rem', marginBottom: '0.65rem', display: 'inline-block' }}>
          <span style={{ fontWeight: 700, color: '#475569', fontSize: '0.82rem' }}>Typical Accuracy: </span>
          <span style={{ fontWeight: 800, color: '#6366f1' }}>{n.accuracy}</span>
        </div>
        <div style={{ color: '#334155', lineHeight: 1.75, marginBottom: '0.75rem' }}>{n.description}</div>
        <div style={{ fontWeight: 700, color: '#475569', fontSize: '0.82rem', marginBottom: '0.35rem' }}>EXAMPLES</div>
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {n.examples.map((e, i) => (
            <span key={i} style={{ background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '5px', padding: '0.15rem 0.55rem', fontSize: '0.85rem', color: '#334155' }}>{e}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── interactive component 2: NTP Exchange Walkthrough ───────────────────────
type NtpPacketField = {
  field: string
  value: string
  bits: string
  description: string
}
const NTP_FIELDS: NtpPacketField[] = [
  { field: 'LI (Leap Indicator)', value: '0 = no warning', bits: '2 bits', description: '0=no warning, 1=last minute has 61s, 2=last minute has 59s, 3=alarm (clock unsynchronized). Set by stratum-1 servers near leap second events.' },
  { field: 'VN (Version)', value: '4', bits: '3 bits', description: 'NTP version number. Current versions are 3 (RFC 1305) and 4 (RFC 5905). Version 4 added optional extensions and improved algorithms.' },
  { field: 'Mode', value: '3 = Client', bits: '3 bits', description: '1=Symmetric Active, 2=Symmetric Passive, 3=Client, 4=Server, 5=Broadcast, 6=NTP Control, 7=Private. Client→Server uses mode 3; Server replies with mode 4.' },
  { field: 'Stratum', value: '2', bits: '8 bits', description: 'Distance from the reference clock. 0=unspecified, 1=primary server, 2-15=secondary, 16=unsynchronized. Clients use stratum to prefer closer (lower stratum) servers.' },
  { field: 'Poll', value: '6 (64 seconds)', bits: '8 bits', description: 'Log2 of the maximum interval between messages in seconds. 6=64s, 10=1024s. Clients adapt poll interval based on clock stability.' },
  { field: 'Precision', value: '-23 (≈120ns)', bits: '8 bits (signed)', description: 'Log2 of the clock precision in seconds. A modern computer with hardware clock: ~-20 to -24. A GPS receiver: ~-26. Higher magnitude = more precise.' },
  { field: 'Root Delay', value: '14.2 ms', bits: '32 bits fixed', description: 'Total round-trip delay to the primary reference clock. Includes all network and processing delays in the synchronization chain.' },
  { field: 'Root Dispersion', value: '8.5 ms', bits: '32 bits fixed', description: 'Maximum error relative to the primary reference clock. Accounts for clock uncertainty accumulated through the stratum hierarchy.' },
  { field: 'Reference ID', value: 'GPS, ATOM, or IPv4', bits: '32 bits', description: 'For stratum 1: 4-character ASCII identifier (GPS, PPS, ATOM, NIST). For stratum 2+: first 32 bits of the MD5 hash of the server\'s IP, or the server\'s IPv4 address directly.' },
  { field: 'Reference Timestamp', value: '2026-05-24T10:00:00Z', bits: '64 bits', description: 'When the system clock was last set or corrected. NTP timestamp format: 64-bit fixed-point with 32-bit seconds (since 1900-01-01) and 32-bit fractional seconds (232 = 1s resolution = ~232ps).' },
  { field: 'Origin Timestamp (T1)', value: 'Time client sent request', bits: '64 bits', description: 'Time at which the request was sent by the client. Copied from client\'s Transmit Timestamp in the previous exchange. Used for loop detection and calculating offset.' },
  { field: 'Receive Timestamp (T2)', value: 'Time server received request', bits: '64 bits', description: 'Time at which the request arrived at the server. Stamped immediately upon packet receipt before any processing.' },
  { field: 'Transmit Timestamp (T3)', value: 'Time server sent reply', bits: '64 bits', description: 'Time at which the reply was sent by the server. Stamped as close to actual transmission as possible to minimize processing jitter.' },
]

function NtpPacketInspector() {
  const [active, setActive] = useState<number>(0)
  const f = NTP_FIELDS[active]

  return (
    <div style={{ background: '#f8fafc', border: '2px solid #10b981', borderRadius: '14px', padding: '1.5rem', margin: '1.5rem 0' }}>
      <h3 style={{ fontWeight: 800, color: '#10b981', marginBottom: '0.25rem' }}>NTP Packet Field Inspector</h3>
      <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.25rem' }}>Click a field to understand its purpose in the 48-byte NTP packet.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', marginBottom: '1.25rem' }}>
        {NTP_FIELDS.map((field, i) => (
          <div key={i}
            onClick={() => setActive(i)}
            style={{ cursor: 'pointer', borderRadius: '8px', border: `1.5px solid ${active === i ? '#10b981' : '#e2e8f0'}`, background: active === i ? '#ecfdf5' : '#fff', padding: '0.5rem 0.9rem', display: 'flex', alignItems: 'center', gap: '0.85rem', transition: 'all 0.12s' }}>
            <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#10b981', fontSize: '0.85rem', minWidth: '65px' }}>{field.bits}</span>
            <span style={{ fontWeight: active === i ? 800 : 600, color: '#1e293b', flex: 1, fontSize: '0.92rem' }}>{field.field}</span>
            <span style={{ fontFamily: 'monospace', fontSize: '0.82rem', color: '#64748b' }}>{field.value}</span>
          </div>
        ))}
      </div>
      <div style={{ background: '#fff', borderRadius: '10px', border: '2px solid #10b981', padding: '1rem 1.25rem', color: '#334155', lineHeight: 1.75 }}>
        <div style={{ fontWeight: 800, color: '#10b981', marginBottom: '0.4rem' }}>{f.field}</div>
        {f.description}
      </div>
    </div>
  )
}

// ─── interactive component 3: NTP Security Issues Explorer ───────────────────
type NtpAttack = {
  id: string
  name: string
  severity: 'Critical' | 'High' | 'Medium'
  howItWorks: string
  impact: string
  mitigation: string
  cve: string
  color: string
}
const NTP_ATTACKS: NtpAttack[] = [
  {
    id: 'amplification',
    name: 'NTP Amplification DDoS',
    severity: 'Critical',
    howItWorks: 'Attacker spoofs victim IP, sends UDP/123 requests with large responses (monlist command returns last 600 peers = 4460 bytes for a 48-byte request = 93x amplification).',
    impact: 'Victim flooded with traffic. Used in record-breaking DDoS attacks (400+ Gbps). Any NTP server running ntpd < 4.2.7p26 with monlist enabled is an amplifier.',
    mitigation: 'Disable monlist (noquery in ntp.conf). Apply rate limiting. Use chronyd (not ntpd) which has no monlist. Block forged source IPs (BCP38).',
    cve: 'CVE-2013-5211',
    color: '#ef4444',
  },
  {
    id: 'mitm',
    name: 'NTP MITM / Time Manipulation',
    severity: 'High',
    howItWorks: 'Attacker intercepts NTP traffic and modifies timestamps. NTP has no mandatory authentication in plain mode. Small time shifts go undetected; NTP\'s slew rate limit is 500 ppm.',
    impact: 'Affects certificate validity (TLS certs have NotBefore/NotAfter). Breaks Kerberos (5-minute clock skew tolerance). Invalidates syslog timestamps. Causes premature lease expiry in distributed systems.',
    mitigation: 'Use NTP authentication (symmetric keys or NTS). Deploy NTP over TLS (NTS, RFC 8915). Restrict NTP sources to known-good servers. Monitor offset alerts.',
    cve: 'N/A (design weakness)',
    color: '#f97316',
  },
  {
    id: 'falseticker',
    name: 'NTP Falseticker Attack',
    severity: 'High',
    howItWorks: 'Attacker controls a subset of client\'s configured NTP servers and returns false timestamps. If the majority of servers agree on a false time, the Marzullo algorithm accepts it.',
    impact: 'If attacker controls majority of configured NTP peers, clock can be shifted arbitrarily. Enables token replay (expired tokens with manipulated time appear valid) and certificate attacks.',
    mitigation: 'Configure at least 4 NTP servers from independent sources (different ASes, different geographies). Use NTS for server authentication. Monitor stratum hierarchy for anomalies.',
    cve: 'N/A (algorithmic)',
    color: '#f59e0b',
  },
  {
    id: 'stepback',
    name: 'Clock Step-Back Attack',
    severity: 'Medium',
    howItWorks: 'Attacker sends NTP response making client believe time has gone backwards significantly. Most NTP clients accept large backward steps during initial sync.',
    impact: 'Breaking distributed consensus protocols (Paxos, Raft) that depend on time monotonicity. Replay attacks on TOTP/HOTP tokens. Certificate validation failures.',
    mitigation: 'Configure ntpd with -g to allow initial large step but not subsequent ones. Use chronyd\'s makestep limit. Monitor for large backward time steps.',
    cve: 'CVE-2015-7704',
    color: '#3b82f6',
  },
]

function NtpSecurityExplorer() {
  const [sel, setSel] = useState<string>('amplification')
  const a = NTP_ATTACKS.find(x => x.id === sel)!
  const sevColor = { Critical: '#ef4444', High: '#f97316', Medium: '#f59e0b' }

  return (
    <div style={{ background: '#f8fafc', border: '2px solid #ef4444', borderRadius: '14px', padding: '1.5rem', margin: '1.5rem 0' }}>
      <h3 style={{ fontWeight: 800, color: '#ef4444', marginBottom: '0.25rem' }}>NTP Attack Vector Explorer</h3>
      <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.25rem' }}>Select an attack to understand the mechanism, impact, and mitigation.</p>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        {NTP_ATTACKS.map(t => (
          <button key={t.id} onClick={() => setSel(t.id)}
            style={{ padding: '0.45rem 1rem', borderRadius: '8px', border: `2px solid ${t.color}`, background: sel === t.id ? t.color : '#fff', color: sel === t.id ? '#fff' : t.color, fontWeight: 700, cursor: 'pointer', fontSize: '0.88rem' }}>
            {t.name.split(' ').slice(0, 2).join(' ')}
          </button>
        ))}
      </div>
      <div style={{ background: '#fff', borderRadius: '10px', border: `2px solid ${a.color}`, padding: '1.1rem 1.25rem' }}>
        <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center', marginBottom: '0.65rem' }}>
          <span style={{ background: sevColor[a.severity], color: '#fff', borderRadius: '6px', padding: '0.2rem 0.65rem', fontWeight: 800, fontSize: '0.82rem' }}>{a.severity}</span>
          <span style={{ fontWeight: 800, color: '#1e293b', fontSize: '1.05rem' }}>{a.name}</span>
          {a.cve !== 'N/A (design weakness)' && a.cve !== 'N/A (algorithmic)' && (
            <code style={{ fontFamily: 'monospace', fontSize: '0.82rem', background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '4px', padding: '0.1rem 0.4rem', color: '#0f172a' }}>{a.cve}</code>
          )}
        </div>
        {[['How It Works', a.howItWorks], ['Impact', a.impact], ['Mitigation', a.mitigation]].map(([label, text]) => (
          <div key={label as string} style={{ marginBottom: '0.65rem' }}>
            <div style={{ fontWeight: 700, color: '#475569', fontSize: '0.82rem', marginBottom: '0.25rem' }}>{label as string}</div>
            <div style={{ color: '#334155', lineHeight: 1.7, fontSize: '0.93rem' }}>{text as string}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── main export ─────────────────────────────────────────────────────────────
export default function NtpPage() {
  return (
    <LearnLayout
      title="NTP — Network Time Protocol"
      description="From atomic clocks to the microseconds that make TLS certificates valid, Kerberos work, and distributed systems stay sane: how NTP synchronizes time across the internet."
      section="Networking Fundamentals — Module 32"
      readTime="25–35 min"
      updatedAt="May 2026"
    >
      {/* ── Chapter 1 ─────────────────────────────────────────── */}
      <Chapter n={1} title="Why Time Matters More Than You Think" />
      <StoryBox>
        December 2016. Cloudflare suffers a global outage lasting 11 hours. The cause: a software bug where a counter rolled from positive to negative, yielding a negative cache TTL interpreted as a very large number. The sequence of events: at midnight UTC, a leap second was inserted. Cloudflare's RRDNS software had a Go time library that didn't handle the leap second correctly. The clock appeared to jump backwards by one second. The negative duration triggered the bug. By the time engineers diagnosed it, millions of websites had been unreachable.
      </StoryBox>
      <Para>
        Time is not a peripheral concern in networking — it is foundational. <Accent>TLS certificates</Accent> have validity windows defined by NotBefore and NotAfter timestamps. A clock that is wrong by one day can render all certificates invalid or allow expired ones to pass. <Accent>Kerberos</Accent> enforces a 5-minute clock skew tolerance — beyond that, ticket validation fails and authentication breaks. <Accent>Distributed databases</Accent> use timestamps for conflict resolution. <Accent>Log correlation</Accent> requires synchronized clocks across all devices. <Accent>Financial systems</Accent> require sub-millisecond accuracy for regulatory audit trails.
      </Para>
      <Para>
        NTP (Network Time Protocol) is the protocol that keeps these clocks synchronized. Version 1 was published in 1985 by David Mills. Today, NTPv4 (RFC 5905) is the standard, with NTS (Network Time Security, RFC 8915) adding cryptographic authentication. NTP operates across the public internet, achieving millisecond-level synchronization over heterogeneous paths with variable delays.
      </Para>
      <WowBox>
        The NTP timestamp format uses 64-bit fixed-point numbers with 32 bits for seconds and 32 bits for fractions. The fractional resolution is 2^-32 seconds ≈ 233 picoseconds. NTP's reference epoch is January 1, 1900 (not Unix's January 1, 1970). The 32-bit seconds field rolled over on February 7, 2036 — a Y2K-style problem that NTPv4 addresses through era numbering.
      </WowBox>

      <Divider />
      {/* ── Chapter 2 ─────────────────────────────────────────── */}
      <Chapter n={2} title="The NTP Hierarchy: From Atomic Clocks to Your Laptop" />
      <StoryBox>
        A GPS satellite at 20,000 km altitude carries four atomic clocks (cesium and rubidium) accurate to nanoseconds. The satellite broadcasts time signals. A GPS receiver on a rooftop decodes the signals and produces a 1PPS (one pulse per second) signal with nanosecond accuracy. A Linux server connected to the receiver via serial port becomes a Stratum 1 NTP server. A corporate NTP server synchronizes from three Stratum 1 sources and becomes Stratum 2. Your laptop synchronizes from the corporate server and becomes Stratum 3. The accuracy degrades with each hop, but your laptop's clock, synchronized once a minute, stays within a few milliseconds of atomic time.
      </StoryBox>
      <NtpStratumExplorer />
      <H2>The NTP Pool Project</H2>
      <Para>
        The <Accent>NTP Pool Project</Accent> (pool.ntp.org) is a large virtual cluster of volunteer-run NTP servers. DNS round-robin returns different server IPs based on the client's region. Over 4,000 servers participate globally. Most operating systems default to pool.ntp.org or vendor-specific pools (time.apple.com, time.google.com, time.windows.com).
      </Para>
      <Para>
        For production infrastructure, use 4+ servers from diverse sources: 2 from the NTP pool + 2 from your cloud provider. Using servers from different autonomous systems ensures a single network event doesn't affect all your NTP sources simultaneously.
      </Para>
      <H2>Public Stratum 1 Servers</H2>
      <Para>
        <Code>time.nist.gov</Code>: NIST (National Institute of Standards and Technology) — U.S. government atomic standard.
      </Para>
      <Para>
        <Code>time.cloudflare.com</Code>: Cloudflare's Stratum 1 service with NTS support. Uses their anycast network.
      </Para>
      <Para>
        <Code>time.google.com</Code>: Google's time servers with "smeared" leap seconds (distribute the second across 20 hours rather than inserting a step).
      </Para>
      <Para>
        <Code>time.apple.com</Code>: Apple's NTP infrastructure, used by macOS/iOS by default.
      </Para>

      <Divider />
      {/* ── Chapter 3 ─────────────────────────────────────────── */}
      <Chapter n={3} title="How NTP Calculates Time: The Four-Timestamp Algorithm" />
      <StoryBox>
        NTP cannot simply ask a server "what time is it?" and trust the answer. The response takes time to travel over the network, and that travel time varies. A message that takes 50ms one way makes a naive answer 50ms stale by arrival. NTP's elegant solution: exchange four timestamps and use the round-trip time to estimate the one-way delay.
      </StoryBox>
      <H2>The Four Timestamps</H2>
      <Para>
        Each NTP exchange involves four timestamps:
      </Para>
      <Para>
        <Accent>T1</Accent>: Time the client sent the request (client's clock)
      </Para>
      <Para>
        <Accent>T2</Accent>: Time the server received the request (server's clock)
      </Para>
      <Para>
        <Accent>T3</Accent>: Time the server sent the reply (server's clock)
      </Para>
      <Para>
        <Accent>T4</Accent>: Time the client received the reply (client's clock)
      </Para>
      <H2>Offset and Round-Trip Delay Calculation</H2>
      <Para>
        From these four timestamps, NTP computes:
      </Para>
      <CodeBlock>{`# Round-trip delay (RTD):
delay = (T4 - T1) - (T3 - T2)
# = total elapsed time - time server spent processing
# This is the network transmission time for both directions

# Clock offset:
offset = ((T2 - T1) + (T3 - T4)) / 2
# = average of (forward delay skew) and (backward delay skew)
# Positive offset: client clock is slow; Negative: client clock is fast

# Example:
# T1 = 10:00:00.000 (client sent)
# T2 = 10:00:00.030 (server received, 30ms after T1 by server clock)
# T3 = 10:00:00.031 (server sent, 1ms processing)
# T4 = 10:00:00.062 (client received)
#
# delay = (0.062 - 0.000) - (0.031 - 0.030) = 0.062 - 0.001 = 0.061s
# offset = ((0.030 - 0.000) + (0.031 - 0.062)) / 2 = (0.030 - 0.031) / 2 = -0.0005s
# Client clock is 0.5ms fast`}</CodeBlock>
      <H2>Asymmetric Delays</H2>
      <Para>
        NTP assumes symmetric network delay (forward ≈ reverse). This assumption breaks when paths are asymmetric — for example, satellite uplinks (low latency one way, high latency other way) or asymmetric DSL. Asymmetry introduces a systematic offset proportional to half the asymmetry. NTP cannot detect or compensate for asymmetry without external information.
      </Para>
      <Warn>
        In satellite or highly asymmetric links, NTP accuracy degrades proportionally to path asymmetry. If forward delay is 250ms and reverse is 50ms, NTP thinks the offset is half the asymmetry = 100ms error. This is a fundamental limitation of single-path NTP. Precision Time Protocol (PTP/IEEE 1588) handles asymmetry better with hardware timestamps.
      </Warn>

      <Divider />
      {/* ── Chapter 4 ─────────────────────────────────────────── */}
      <Chapter n={4} title="The NTP Packet Format" />
      <StoryBox>
        An NTP packet is 48 bytes — tiny by modern standards, but dense with information. Every field serves a purpose in the clock selection and synchronization algorithms. Understanding the packet format reveals why NTP can achieve millisecond accuracy over heterogeneous internet paths.
      </StoryBox>
      <NtpPacketInspector />
      <H2>NTP Timestamp Encoding</H2>
      <Para>
        NTP timestamps are 64-bit fixed-point numbers: 32 bits for seconds since January 1, 1900 (UTC) and 32 bits for fractional seconds. The fractional part represents 1/2^32 seconds ≈ 233 picoseconds per LSB — theoretically sub-nanosecond precision, though practical precision is limited by hardware clock resolution and network jitter.
      </Para>
      <CodeBlock>{`# NTP timestamp representation:
# 64 bits = [32-bit seconds | 32-bit fraction]
# Seconds since 1900-01-01T00:00:00Z

# Converting NTP timestamp to Unix time:
# Unix epoch = 1970-01-01 = 70 years after NTP epoch
# Offset = 70 years in seconds = 2208988800

unix_time = ntp_seconds - 2208988800

# Example NTP timestamp: 0xE9944000.0x00000000
# 0xE9944000 = 3919880192 seconds since 1900
# Unix time = 3919880192 - 2208988800 = 1710891392
# = 2024-03-19T18:43:12Z`}</CodeBlock>

      <Divider />
      {/* ── Chapter 5 ─────────────────────────────────────────── */}
      <Chapter n={5} title="Clock Selection: Marzullo's Algorithm" />
      <StoryBox>
        A client has 5 NTP servers configured. One of them has a faulty reference clock and is consistently 500ms off. Another is behind a congested link and has high jitter. How does the client know which servers to trust and which to ignore? NTP uses a peer selection algorithm based on Marzullo's algorithm — the same algorithm used in fault-tolerant distributed systems.
      </StoryBox>
      <H2>Intersection Algorithm</H2>
      <Para>
        Each NTP server provides not just a time estimate, but a <Accent>confidence interval</Accent> (the offset ± a maximum error bound calculated from dispersion and round-trip delay). The intersection algorithm finds the smallest interval that intersects with the maximum number of server confidence intervals. Servers whose intervals fall outside the intersection are rejected as "falsetickers."
      </Para>
      <Para>
        This algorithm guarantees that as long as more than half your NTP servers are accurate (honest), the selected time will be correct — the minority of bad servers cannot override the majority. This is why you need at least 3 NTP servers (1 bad out of 3 is still a minority) and ideally 5+ for robustness.
      </Para>
      <H2>Clustering and Selection</H2>
      <Para>
        After the intersection algorithm selects "truechimers" (servers that agree), NTP further filters by jitter and synchronization distance. A server with high jitter (variable delay) is penalized even if its offset is small. The final clock source is called the <Accent>system peer</Accent> — the single server driving the local clock correction.
      </Para>
      <H2>Slewing vs. Stepping</H2>
      <Para>
        When NTP finds an offset between the local clock and the correct time, it corrects it one of two ways:
      </Para>
      <Para>
        <Accent>Slewing</Accent>: slowly adjusting the clock frequency to drift toward the correct time. The kernel's adjtime()/adjtimex() syscall adjusts the clock rate by up to 500 parts per million (0.5ms/s). For a 100ms offset, slewing takes ~200 seconds. This preserves time monotonicity — clocks never go backwards.
      </Para>
      <Para>
        <Accent>Stepping</Accent>: an immediate jump to the correct time. NTP uses stepping only for large initial offsets (128ms threshold by default in ntpd). Stepping can cause problems: log timestamps appear to jump, lease timers may expire prematurely, Kerberos tickets may invalidate.
      </Para>

      <Divider />
      {/* ── Chapter 6 ─────────────────────────────────────────── */}
      <Chapter n={6} title="NTP Configuration: ntpd and chronyd" />
      <StoryBox>
        Two NTP implementations dominate Linux: the reference implementation ntpd (from ntp.org) and the modern replacement chrony (chronyd). RedHat Enterprise Linux and derivatives have used chrony as default since RHEL 7. Ubuntu 20.04 uses timesyncd by default, with chrony available. Understanding which is running on your systems — and how to configure it correctly — is essential for ops.
      </StoryBox>
      <H2>ntpd Configuration</H2>
      <CodeBlock>{`# /etc/ntp.conf
# At least 4 servers for Marzullo algorithm to work properly
server time1.google.com iburst prefer
server time2.google.com iburst
server time.cloudflare.com iburst
server 0.pool.ntp.org iburst

# iburst: send 8 requests on first contact for faster initial sync

# Security: restrict access
restrict default kod nomodify notrap nopeer noquery
restrict 127.0.0.1
restrict ::1
restrict 10.0.0.0 mask 255.0.0.0 nomodify notrap  # allow internal clients

# Drift file: stores clock frequency correction
driftfile /var/lib/ntp/ntp.drift

# Log file
logfile /var/log/ntp.log
logconfig =syncall +sysall

# Disable monlist (amplification attack vector)
disable monitor`}</CodeBlock>
      <H2>chrony Configuration</H2>
      <CodeBlock>{`# /etc/chrony.conf (chrony, preferred for modern Linux)
server time.cloudflare.com iburst nts    # NTS = Network Time Security (encrypted)
server time.google.com iburst
server 0.pool.ntp.org iburst
server 1.pool.ntp.org iburst

# Allow large initial step (for VM or container first boot)
makestep 1.0 3    # step up to 1s for first 3 clock updates, then slew only

# Hardware timestamping (requires supported NIC)
hwtimestamp *

# Drift file
driftfile /var/lib/chrony/drift

# Security
allow 10.0.0.0/8    # allow clients in 10.0.0.0/8 to sync from this server
deny all            # deny everything else

# Log
logdir /var/log/chrony
log tracking measurements statistics`}</CodeBlock>
      <H2>Checking Synchronization Status</H2>
      <CodeBlock>{`# chrony
chronyc tracking              # current time source and offset
chronyc sources -v            # all configured sources with status
chronyc sourcestats           # statistics for each source
chronyc ntpdata               # detailed NTP data for each source

# ntpd
ntpq -p                       # peer status table
ntpstat                       # brief sync status
timedatectl status            # systemd view of time sync

# Example chronyc sources output:
# MS Name/IP address   Stratum Poll Reach LastRx Last sample
# ^* time.cloudflare.com    1    6   377    23   +0.123ms[+0.234ms]  ±  0.456ms
# ^  time.google.com        1    6   377    24   -0.089ms[-0.189ms]  ±  0.567ms
# ^ = server, * = selected source, + = acceptable but not selected`}</CodeBlock>

      <Divider />
      {/* ── Chapter 7 ─────────────────────────────────────────── */}
      <Chapter n={7} title="NTP Authentication: Symmetric Keys and NTS" />
      <StoryBox>
        By default, NTP packets are unauthenticated. An attacker on the network path can modify timestamps without detection. For most clients, this is acceptable — the worst case is a few milliseconds of error. But for security infrastructure (certificate authorities, HSMs, PKI systems), unauthenticated NTP is unacceptable. NTP authentication has two eras: the old symmetric key approach and the modern NTS (Network Time Security).
      </StoryBox>
      <H2>Symmetric Key Authentication (RFC 1305 / RFC 5905)</H2>
      <Para>
        Both client and server pre-share a secret key. Each NTP packet includes a key ID and a MAC (MD5 or SHA-1 HMAC of the packet). The receiver verifies the MAC. This prevents modification of NTP packets in transit.
      </Para>
      <Para>
        Limitations: requires pre-shared key distribution (does not scale to public pool servers), uses MD5/SHA-1 (aging), does not prevent replay attacks without additional measures.
      </Para>
      <CodeBlock>{`# ntpd symmetric key example
# /etc/ntp.keys
1 MD5 MySecretKey123

# /etc/ntp.conf
server 192.168.1.1 key 1
trustedkey 1
requestkey 1
controlkey 1`}</CodeBlock>
      <H2>NTS: Network Time Security (RFC 8915)</H2>
      <Para>
        NTS is the modern, TLS-based solution for secure NTP. The NTS Key Establishment (NTS-KE) protocol runs over TLS 1.3 on TCP port 4460, establishing shared keys and providing server authentication via PKI certificates. Subsequent NTP exchanges use UDP/123 with extension fields carrying the NTS authentication material.
      </Para>
      <Para>
        NTS advantages over symmetric keys: server authentication (no MITM on first contact), per-packet authentication with fresh keys, no manual key distribution, compatible with existing PKI infrastructure.
      </Para>
      <CodeBlock>{`# chrony with NTS (Network Time Security)
server time.cloudflare.com iburst nts
server ntppool1.time.nl iburst nts

# chrony verifies the server's TLS certificate
# using the system CA store (/etc/ssl/certs/ca-certificates.crt)

# Check NTS status:
chronyc ntpdata  # shows NTS-KE and NTS cookie status`}</CodeBlock>
      <WowBox>
        Cloudflare operates one of the most widely-used public NTS-enabled NTP servers at <Code>time.cloudflare.com</Code>, with NTS-KE on port 4460. As of 2024, NTS is supported by chrony 4.0+, ntpd 4.2.8p15+, and most modern NTP clients. Time synchronization that is cryptographically authenticated to a known server is now freely available to everyone.
      </WowBox>

      <Divider />
      {/* ── Chapter 8 ─────────────────────────────────────────── */}
      <Chapter n={8} title="Leap Seconds: The Protocol's Hardest Problem" />
      <StoryBox>
        The Earth's rotation is slowing slightly — some days are fractionally longer than the standard 86,400 seconds. UTC (Coordinated Universal Time) is kept close to astronomical time (UT1) by occasionally inserting a "leap second" — a 23:59:60 that does not exist in normal timekeeping. Since 1972, 27 leap seconds have been inserted. Each one causes software systems to behave unexpectedly: some systems count to 60, some repeat 23:59:59, some freeze for a second. In 2012, a leap second knocked Reddit, Gawker, LinkedIn, Foursquare, and Yelp offline simultaneously.
      </StoryBox>
      <H2>How NTP Handles Leap Seconds</H2>
      <Para>
        NTP servers set the <Accent>Leap Indicator</Accent> (LI) bits in the NTP packet header to warn clients of an impending leap second: LI=1 means the last minute of the day will have 61 seconds; LI=2 means 59 seconds. Clients see this warning and adjust their behavior.
      </Para>
      <Para>
        The problem: the kernel and operating system must handle the actual insertion. Linux kernels historically "froze" the clock for one second (two consecutive identical seconds). Many applications that use gettimeofday() without checking for LI would see time go backwards by one second, triggering negative time deltas, spin loops, or crashes.
      </Para>
      <H2>Leap Second Smearing</H2>
      <Para>
        Google pioneered <Accent>leap second smearing</Accent>: instead of inserting a sharp 1-second step, the extra second is distributed across 20 hours (±10 hours around midnight UTC). During those 20 hours, Google's time servers run at a slightly different rate (1.0001157 instead of 1.0), effectively spreading the leap over time so no application ever sees a 23:59:60 or a repeated second.
      </Para>
      <Para>
        Cloudflare, Amazon AWS, and Microsoft Azure also use smearing. The tradeoff: during smearing, Google's clocks disagree with non-smearing NTP servers by up to 0.5 seconds. Do not mix smearing and non-smearing sources in the same NTP configuration.
      </Para>
      <Para>
        The IERS (International Earth Rotation and Reference Systems Service) announced in 2022 that leap seconds will be discontinued by 2035, replacing them with a larger accumulated correction every century. Until then, leap second handling remains a risk in production systems.
      </Para>

      <Divider />
      {/* ── Chapter 9 ─────────────────────────────────────────── */}
      <Chapter n={9} title="NTP Security: Attacks and Mitigations" />
      <StoryBox>
        In February 2014, a record-breaking 400 Gbps DDoS attack targeted Spamhaus using NTP amplification. Attackers sent 4,529-byte responses to 4,529 NTP servers (each responding to a 8-byte monlist request with a 4KB+ response), creating a 580:1 amplification factor. The attack generated traffic volumes that saturated multiple transit providers. The root cause: thousands of NTP servers with the monlist command enabled, accessible from the internet, with no source IP validation.
      </StoryBox>
      <NtpSecurityExplorer />
      <H2>Best Practices for NTP Security</H2>
      <Para>
        1. <Accent>Disable monlist</Accent> (ntpd): add <Code>disable monitor</Code> to ntp.conf. Already disabled in chrony by default.
      </Para>
      <Para>
        2. <Accent>Restrict NTP server access</Accent>: if running an NTP server, use restrict directives to limit which hosts can query it.
      </Para>
      <Para>
        3. <Accent>Block port 123 UDP</Accent> at internet border for servers that should not receive internet queries.
      </Para>
      <Para>
        4. <Accent>Use NTS</Accent> for NTP sources that authenticate: configure <Code>nts</Code> option in chrony.conf for public NTS servers.
      </Para>
      <Para>
        5. <Accent>Use 4+ diverse sources</Accent>: multiple sources from different ASes make falseticker attacks much harder.
      </Para>
      <Para>
        6. <Accent>Monitor clock offset</Accent>: alert on offset {'>'} 100ms (possible MITM or broken server). Alert on stratum jumps (server losing its reference).
      </Para>

      <Divider />
      {/* ── Chapter 10 ─────────────────────────────────────────── */}
      <Chapter n={10} title="PTP: Precision Time Protocol for Sub-Microsecond Accuracy" />
      <StoryBox>
        Telecommunications providers, high-frequency trading firms, and power grid operators need accuracy that NTP cannot provide. A 5G base station's radio timing requires sub-microsecond synchronization. HFT firms in Chicago require sub-100-nanosecond timestamps for trade sequencing compliance. NTP over the internet achieves 1-10ms. PTP (Precision Time Protocol) over a LAN achieves sub-microsecond, and with hardware timestamping, sub-nanosecond.
      </StoryBox>
      <H2>PTP (IEEE 1588) vs NTP</H2>
      <Para>
        PTP operates over Ethernet (or IP multicast) using hardware timestamping at the NIC and network switch level. The key difference from NTP: hardware timestamps are added at the physical layer — the actual moment a packet's first bit departs or arrives at the wire. Software-based NTP timestamps include the OS scheduling jitter (microseconds to milliseconds). Hardware-based PTP timestamps are accurate to nanoseconds.
      </Para>
      <Para>
        PTP boundary clocks and transparent clocks in managed switches compensate for switch queuing and forwarding delays, eliminating the variable delay that limits NTP accuracy.
      </Para>
      <CodeBlock>{`# Linux PTP (linuxptp) configuration
# ptp4l.conf
[global]
tx_timestamp_timeout 10
logAnnounceInterval 1
logSyncInterval 0        # 1 message/second
logMinDelayReqInterval 0

# Hardware timestamping
[eth0]
# Enable hardware timestamping on the interface
# ethtool -T eth0 → shows hardware-timestamping capability

# Start PTP daemon
ptp4l -i eth0 -f /etc/linuxptp/ptp4l.conf

# Synchronize OS clock to PTP hardware clock
phc2sys -s eth0 -c CLOCK_REALTIME -n 16 -O 0`}</CodeBlock>
      <H2>Grandmaster Clock</H2>
      <Para>
        In PTP, the master clock is called the <Accent>Grandmaster Clock</Accent> — the network's primary time reference, typically disciplined by GPS. The Best Master Clock Algorithm (BMCA) automatically selects the grandmaster based on clock class, clock accuracy, offset scaled log variance, and priority fields in Announce messages.
      </Para>

      <Divider />
      {/* ── Chapter 11 ─────────────────────────────────────────── */}
      <Chapter n={11} title="Time in Distributed Systems: Why Getting It Right Matters" />
      <StoryBox>
        Amazon DynamoDB, Google Spanner, and CockroachDB all depend heavily on time. Spanner uses TrueTime — GPS and atomic clock receivers in every datacenter — to guarantee bounded clock uncertainty. Every transaction timestamp is wrapped in an interval [earliest, latest]. Before committing, Spanner waits until the current time is guaranteed to be after the latest possible start time. This "commit wait" turns time uncertainty into correctness guarantees.
      </StoryBox>
      <H2>The Ordering Problem</H2>
      <Para>
        In a distributed system, two events happening simultaneously on different machines will have different wall-clock timestamps unless clocks are perfectly synchronized. If Clock A is 100ms ahead of Clock B, an event on A at 10:00:00.100 looks like it happened before an event on B at 10:00:00.150 — even if B's event actually caused A's event. This breaks causality.
      </Para>
      <Para>
        Solutions: Logical clocks (Lamport timestamps, Vector clocks) establish causal ordering without wall-clock sync. For external ordering (clients need to know real-world order), physical clock synchronization (NTP, PTP) is required. Google Spanner uses TrueTime to bound physical clock uncertainty and ensure real-time ordering guarantees.
      </Para>
      <H2>Certificate Validity and Clock Drift</H2>
      <Para>
        TLS certificate NotBefore and NotAfter fields use UTCTime or GeneralizedTime. A certificate's validity window is checked against the local clock. If a server's clock is wrong by even one day:
      </Para>
      <Para>
        — <em>Clock too early</em>: certificates appear not-yet-valid. TLS handshakes fail with "certificate not yet valid."
      </Para>
      <Para>
        — <em>Clock too late</em>: expired certificates appear valid. Security checks fail silently.
      </Para>
      <Para>
        — <em>OCSP stapling</em>: OCSP responses expire after hours to days. If the server's clock is wrong, stapled responses appear expired and clients reject them.
      </Para>
      <Warn>
        Never disable certificate time validation ("clock skew" workarounds) in production code. The correct fix is always to synchronize the clock. Disabling time validation defeats the entire certificate expiry mechanism — an expired certificate is a security signal that should not be ignored.
      </Warn>

      <Divider />
      {/* ── Chapter 12 ─────────────────────────────────────────── */}
      <Chapter n={12} title="Time in Cloud and Container Environments" />
      <StoryBox>
        A Docker container on AWS has no hardware clock. Its clock is the host's clock. When the container is paused and resumed, it sees no time passage — the OS resumes the process's context, but the virtual clock in the container didn't tick during the pause. An NTP client in the container would see a large jump, potentially triggering a step. This is why containerized applications should not rely on local NTP — they should use the host's synchronized clock.
      </StoryBox>
      <H2>VMs and Clock Discipline</H2>
      <Para>
        Virtualization adds complexity to timekeeping. A VM's clock is emulated — the hypervisor periodically synchronizes the VM's software clock to the host's clock. During high CPU load or VM migration, the VM clock can drift significantly. VMware recommends either using VMware Tools' time synchronization or configuring the VM to use an NTP server, but not both simultaneously.
      </Para>
      <Para>
        Container best practice: disable NTP inside containers; rely on the host's NTP-synchronized clock. If a container needs a specific timezone, set the TZ environment variable — this does not affect the clock, only how times are displayed.
      </Para>
      <H2>AWS Time Sync Service</H2>
      <Para>
        AWS provides a local NTP endpoint at <Code>169.254.169.123</Code> (link-local, always reachable within AWS VPC). Amazon Time Sync Service uses a fleet of atomic clocks in each AWS region. Amazon Linux 2 and AL2023 configure chrony to use this endpoint by default. AWS also offers a PTP hardware clock via <Code>169.254.169.253</Code> for instances with enhanced networking — providing sub-microsecond accuracy without leaving the datacenter.
      </Para>
      <CodeBlock>{`# /etc/chrony.conf (Amazon Linux 2)
server 169.254.169.123 prefer iburst minpoll 4 maxpoll 4

# For PTP hardware clock (requires enhanced networking)
refclock PHC /dev/ptp0 poll 2 dpoll -2 offset 0`}</CodeBlock>

      <Divider />
      {/* ── Chapter 13 ─────────────────────────────────────────── */}
      <Chapter n={13} title="Misconceptions About NTP" />
      <Err>
        "NTP is just about having the right time on the clock." — NTP synchronization accuracy determines the correctness of TLS certificate validation, Kerberos authentication, distributed database ordering, audit log correlation, and OAuth token expiry. An unsynchronized clock doesn't just show the wrong time — it breaks security protocols, authentication systems, and distributed consensus algorithms.
      </Err>
      <Err>
        "Using more NTP servers is always better." — Adding more servers helps only if they are from diverse, independent sources. Five servers all from the same pool.ntp.org server (same ASN) don't add diversity. For Marzullo's algorithm to protect against falsetickers, sources should be from different autonomous systems and ideally different geographic regions.
      </Err>
      <Err>
        "Clock stepping is safe — it just jumps to the right time." — Stepping the clock backwards causes problems: negative time intervals in log processing, Kerberos ticket invalidation, TLS certificate time-window failures, and potential deadlocks in distributed systems waiting for monotonic time advancement. chrony's makestep should only allow steps during initial sync; after that, slewing maintains monotonicity.
      </Err>
      <Err>
        "My system clock is correct because it was correct when I set it up." — Hardware clocks (RTCs) drift without correction. A typical PC RTC drifts 5–200 ppm (parts per million). At 200 ppm, a clock drifts 17 seconds per day. Without NTP, a clock set correctly today will be minutes off in a week. NTP must run continuously to maintain accuracy.
      </Err>
      <Err>
        "NTP is secure because its packets are small and not interesting to attackers." — NTP amplification (CVE-2013-5211) enabled 400+ Gbps DDoS attacks using publicly accessible NTP servers. Time manipulation attacks affect certificate validation, Kerberos, and distributed systems. NTP security (authentication, access restriction, disabling monlist) is as important as any other network service.
      </Err>

      <Divider />
      {/* ── Chapter 14 ─────────────────────────────────────────── */}
      <Chapter n={14} title="IQ Depth Check: How Deep Does Your NTP Knowledge Go?" />
      <IQ level="Beginner">
        <strong>What is NTP stratum and why does it matter?</strong><br />
        Stratum indicates how many NTP hops a server is from an authoritative reference clock (GPS, atomic). Stratum 0 = the reference clock hardware itself (not NTP-capable). Stratum 1 = directly connected to Stratum 0. Stratum 2 = synchronized from Stratum 1. Each hop potentially adds error. Stratum 16 means "unsynchronized — do not use." Lower stratum = closer to the source = generally more accurate, though stratum alone doesn't guarantee accuracy (a bad Stratum 1 is worse than a good Stratum 2).
      </IQ>
      <IQ level="Intermediate">
        <strong>Explain how NTP calculates clock offset from four timestamps.</strong><br />
        NTP records four timestamps: T1 (client sent), T2 (server received), T3 (server sent), T4 (client received). Round-trip delay = (T4-T1) - (T3-T2) — total elapsed time minus server processing time. Clock offset = ((T2-T1) + (T3-T4)) / 2 — the average of the two one-way transit observations. NTP assumes symmetric delay; if forward and reverse latency differ, the computed offset has systematic error equal to half the asymmetry. The client adjusts its clock by the calculated offset, either slewing (gradual) for small offsets or stepping (immediate) for large ones.
      </IQ>
      <IQ level="Senior">
        <strong>What is leap second smearing and why must you not mix smearing and non-smearing NTP sources?</strong><br />
        Leap second smearing distributes the extra second across a window (Google uses ±10 hours = 20 hours total) by running clocks at a slightly modified rate during that window. This eliminates the 23:59:60 second and the associated application failures. However, during the smear window, a smearing server's timestamps differ from a non-smearing server's timestamps by up to 500ms (half of the 1-second leap). If you configure both a smearing server (time.google.com) and a non-smearing server (0.pool.ntp.org) as NTP sources, Marzullo's algorithm will see them disagreeing by up to 500ms and may reject both as falsetickers, causing complete loss of synchronization exactly when you need it most. Use only smearing sources or only non-smearing sources in any single NTP configuration.
      </IQ>
      <IQ level="PhD">
        <strong>Explain how Network Time Security (NTS, RFC 8915) provides authenticated NTP without pre-shared keys, and what the NTS-KE handshake establishes.</strong><br />
        NTS uses a two-phase approach. Phase 1 (NTS-KE): the client connects to the NTP server's NTS-KE port (TCP/4460) and performs a TLS 1.3 handshake. The server authenticates itself via its TLS certificate (verifiable against the CA store — no first-use trust problem). The TLS application-layer protocol negotiation (ALPN) extension identifies the NTS-KE protocol. Over the TLS session, the server sends the client a set of "cookies" — opaque blobs that encode fresh symmetric keys (encrypted with the NTS server's key, so only the server can decode them). Phase 2 (NTP): the client adds an NTS extension field to each NTP packet containing one cookie (key identifier + AEAD ciphertext) and a fresh-nonce authenticated MAC. The server decodes the cookie to recover the session key, verifies the MAC, then sends a response with a new cookie (to prevent replay). The client uses AEAD (AES-SIV or ChaCha20-Poly1305) to authenticate both request and response. Because each exchange uses a fresh cookie with forward-secrecy properties (new keys per cookie), capturing past cookies does not enable forgery of future packets. The server maintains no per-client state between exchanges — the cookie carries everything needed.
      </IQ>

      <Divider />
      <KeyTakeaways items={[
        'NTP synchronizes clocks across the internet via UDP/123 using a four-timestamp exchange to calculate offset and round-trip delay.',
        'The NTP stratum hierarchy: Stratum 0 = reference clocks (GPS/atomic), Stratum 1 = directly connected servers, Stratum 2+ = downstream; Stratum 16 = unsynchronized.',
        'Clock offset = ((T2-T1) + (T3-T4)) / 2; assumes symmetric network delay — asymmetric paths introduce systematic error equal to half the asymmetry.',
        "Marzullo's intersection algorithm selects 'truechimers' from configured servers and rejects 'falsetickers'; requires 3+ servers for falseticker detection, 5+ for robustness.",
        'Slewing adjusts clock frequency (≤500 ppm); stepping jumps immediately. Stepping can break Kerberos, TLS validation, and monotonic-time-dependent distributed systems.',
        'NTP amplification (CVE-2013-5211): the monlist command returns 4KB+ for an 8-byte request. Always disable monitor/monlist and block UDP/123 at internet borders.',
        'Network Time Security (NTS, RFC 8915) uses TLS 1.3 for server authentication and per-packet AEAD MACs derived from session cookies — no pre-shared keys required.',
        'Leap second smearing (Google, Cloudflare) distributes the extra second over ±10 hours; never mix smearing and non-smearing NTP sources in one configuration.',
        'PTP (IEEE 1588) uses hardware timestamping in NICs and switches to achieve sub-microsecond accuracy — required for 5G, HFT, and power grid synchronization.',
        'Unsynchronized clocks break TLS certificate validation, Kerberos authentication, distributed system ordering, and TOTP/HOTP tokens — always run NTP on all systems.',
      ]} />
    </LearnLayout>
  )
}
