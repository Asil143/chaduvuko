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
const H2 = ({ children }: { children: React.ReactNode }) => <h4 style={{ fontSize: 15, fontWeight: 700, color: N, margin: '24px 0 8px', fontFamily: 'var(--font-mono)', letterSpacing: '.04em' }}>{children}</h4>
const Hl = ({ children }: { children: React.ReactNode }) => <strong style={{ color: N }}>{children}</strong>
const HR = () => <div style={{ borderTop: '1px solid var(--border)', margin: '48px 0' }} />
const Mono = ({ children }: { children: React.ReactNode }) => (
  <code style={{ fontSize: 12, background: `${N}15`, color: N, padding: '2px 6px', borderRadius: 4 }}>{children}</code>
)

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
const Warn = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ background: '#f59e0b08', border: '1px solid #f59e0b30', borderRadius: 10, padding: '16px 20px', margin: '24px 0' }}>
    <p style={{ fontSize: 11, fontWeight: 700, color: '#f59e0b', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 8px' }}>Warning — {title}</p>
    <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.85, margin: 0 }}>{children}</p>
  </div>
)
const Deep = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: '#3b82f608', border: '1px solid #3b82f630', borderRadius: 10, padding: '16px 20px', margin: '24px 0' }}>
    <p style={{ fontSize: 11, fontWeight: 700, color: '#3b82f6', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 8px' }}>Deep Dive</p>
    <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.85, margin: 0 }}>{children}</p>
  </div>
)
const IQ = ({ q, level, children }: { q: string; level: 'junior' | 'mid' | 'senior' | 'phd'; children: React.ReactNode }) => {
  const colors = { junior: N, mid: '#3b82f6', senior: '#8b5cf6', phd: '#f59e0b' }
  const labels = { junior: 'Junior', mid: 'Mid-Level', senior: 'Senior', phd: 'Research / PhD' }
  return (
    <div style={{ marginBottom: 40 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: `${colors[level]}10`, border: `1px solid ${colors[level]}25`, borderRadius: '8px 8px 0 0', padding: '14px 18px' }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: colors[level], fontFamily: 'var(--font-mono)', background: `${colors[level]}20`, padding: '2px 8px', borderRadius: 4, flexShrink: 0 }}>{labels[level]}</span>
        <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>Q: {q}</span>
      </div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: 'none', borderRadius: '0 0 8px 8px', padding: '18px', fontSize: 14, color: 'var(--text)', lineHeight: 1.9 }}>{children}</div>
    </div>
  )
}
const Term = ({ t, children }: { t: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', gap: 12, marginBottom: 16, alignItems: 'flex-start' }}>
    <code style={{ fontSize: 12, background: `${N}15`, color: N, padding: '3px 8px', borderRadius: 5, flexShrink: 0, marginTop: 2 }}>{t}</code>
    <span style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>{children}</span>
  </div>
)
const CodeBlock = ({ title, children }: { title?: string; children: string }) => (
  <div style={{ margin: '20px 0', borderRadius: 10, overflow: 'hidden', border: '1px solid var(--border)' }}>
    {title && <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '8px 16px', fontSize: 11, fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--font-mono)', letterSpacing: '.06em', textTransform: 'uppercase' }}>{title}</div>}
    <pre style={{ background: 'var(--bg)', margin: 0, padding: '16px 20px', overflowX: 'auto', fontSize: 13, color: 'var(--text)', lineHeight: 1.7, fontFamily: 'var(--font-mono)' }}>{children}</pre>
  </div>
)

// ── Interactive: NTP Stratum Hierarchy ─────────────────────────────────────────
const strata = [
  {
    level: 0, name: 'Stratum 0', color: '#ef4444',
    desc: 'Primary reference clocks. Hardware devices connected directly to physical time sources — never exposed to the network directly.',
    examples: 'GPS receivers (±10–100 ns), Cesium/Rubidium atomic clocks (±1–10 ns), CDMA base stations, WWVB radio receivers, PPS (Pulse-Per-Second) signals',
    detail: 'Stratum 0 devices output a PPS signal — a precise electrical pulse every second — that Stratum 1 servers connect to via RS-232 or USB. The PPS signal itself is accurate to nanoseconds. GPS receivers achieve accuracy by averaging multiple satellites; each satellite carries atomic clocks synchronized to UTC.',
    accuracy: '1–100 ns',
  },
  {
    level: 1, name: 'Stratum 1', color: '#f97316',
    desc: 'Primary NTP servers. Directly connected to Stratum 0 reference clocks via dedicated hardware interfaces (PPS, GPS, etc.).',
    examples: 'time.cloudflare.com, time.google.com, ntp.ubuntu.com, time.nist.gov, time-a.nist.gov',
    detail: 'Stratum 1 servers use GPS disciplined oscillators (GPSDO) or atomic clocks. They run NTPv4 or PTP (IEEE 1588) daemons that use the hardware reference for steering. Public Stratum 1 servers handle millions of queries daily — they are NOT intended for direct use by individual clients; use them as sources for your own Stratum 2 servers.',
    accuracy: '±1 µs to ±50 µs',
  },
  {
    level: 2, name: 'Stratum 2', color: '#f59e0b',
    desc: 'Secondary NTP servers synced from Stratum 1. Your enterprise internal NTP servers, cloud provider NTP, and regional pool servers.',
    examples: 'AWS 169.254.169.123 (link-local), Azure time.windows.com, GCP metadata.google.internal, corporate NTP servers',
    detail: 'Stratum 2 servers peer with multiple Stratum 1 sources for redundancy and falseticker detection. Your internal NTP infrastructure should consist of at least 3 Stratum 2 servers syncing from diverse Stratum 1 sources, then serving your organization\'s Stratum 3+ clients.',
    accuracy: '±50 µs to ±1 ms',
  },
  {
    level: 3, name: 'Stratum 3', color: N,
    desc: 'Internal organizational NTP servers or clients synced from Stratum 2. Most enterprise workstations and servers sit here.',
    examples: 'Department NTP servers, router NTP clients, Linux workstations running chrony/ntpd, Windows domain members (via W32tm → DC → external NTP)',
    detail: 'Stratum 3 is where most production workloads live. The accuracy is well within the requirements of TLS certificate validation (no sub-second tolerance), Kerberos (5-minute window), and database transaction ordering. For sub-millisecond requirements (HFT, distributed databases, scientific instruments), use PTP (IEEE 1588) instead.',
    accuracy: '±1 ms to ±50 ms',
  },
  {
    level: 16, name: 'Stratum 16', color: '#ef4444',
    desc: 'Unsynchronized — indicates a clock source that has lost sync and is not a valid reference. Never use a Stratum 16 server.',
    examples: 'A server that lost contact with all upstream servers, an NTP server that detected its own clock as unreliable',
    detail: 'When NTPv4 sets stratum to 16 it is advertising "I have no valid reference time." chrony/ntpd automatically stops using Stratum 16 sources. This is a critical monitoring alert — investigate immediately.',
    accuracy: 'Unknown / unreliable',
  },
]

function NTPStratumDiagram() {
  const [selected, setSelected] = useState<number | null>(null)
  const sel = strata.find(s => s.level === selected)
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: N, fontFamily: 'var(--font-mono)', margin: '0 0 20px', textTransform: 'uppercase', letterSpacing: '.1em' }}>NTP Stratum Hierarchy — Click to Explore</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, alignItems: 'start' }}>
        <div>
          {strata.map((s, i) => (
            <div
              key={s.level}
              onClick={() => setSelected(selected === s.level ? null : s.level)}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 14px', marginBottom: 6,
                paddingLeft: `${(i < 4 ? i : 4) * 12 + 14}px`,
                background: selected === s.level ? `${s.color}15` : 'var(--bg)',
                border: `1px solid ${selected === s.level ? s.color : 'var(--border)'}`,
                borderRadius: 8, cursor: 'pointer',
              }}
            >
              <code style={{ fontSize: 11, fontWeight: 700, color: s.color, background: `${s.color}20`, padding: '2px 7px', borderRadius: 4, flexShrink: 0 }}>S{s.level}</code>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{s.name}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{s.accuracy}</div>
              </div>
            </div>
          ))}
          <p style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', margin: '10px 0 0', textAlign: 'center' }}>← click any stratum</p>
        </div>
        <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px', minHeight: 240 }}>
          {sel ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <span style={{ background: sel.color, color: '#000', fontSize: 11, fontWeight: 800, padding: '2px 8px', borderRadius: 4 }}>{sel.name}</span>
                <span style={{ fontSize: 12, color: sel.color, fontFamily: 'var(--font-mono)' }}>{sel.accuracy}</span>
              </div>
              <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.75, margin: '0 0 10px' }}>{sel.desc}</p>
              <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.75, margin: '0 0 10px' }}>{sel.detail}</p>
              <div style={{ fontSize: 11, color: N, fontFamily: 'var(--font-mono)', marginTop: 8 }}>Examples: {sel.examples}</div>
            </>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200, color: 'var(--muted)', fontSize: 13 }}>Select a stratum level to see details</div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Interactive: NTP Packet Dissector ─────────────────────────────────────────
const packetFields = [
  { bits: '2', name: 'LI (Leap Indicator)', color: '#ef4444', desc: '2 bits. 00=no warning, 01=last minute has 61s, 10=last minute has 59s, 11=clock unsynchronized (alarm). Used to signal an upcoming leap second insertion or deletion.' },
  { bits: '3', name: 'VN (Version Number)', color: '#f97316', desc: '3 bits. Currently 4 for NTPv4. Version 3 (NTPv3) was defined in RFC 1305. NTPv4 adds IPv6 support, extension fields, and improved algorithms.' },
  { bits: '3', name: 'Mode', color: '#f59e0b', desc: '3 bits. 1=Symmetric Active, 2=Symmetric Passive, 3=Client, 4=Server, 5=Broadcast, 6=NTP Control, 7=Reserved. Most queries are Mode 3 (client) → Mode 4 (server) response.' },
  { bits: '8', name: 'Stratum', color: N, desc: '8 bits (0–255). 0=unspecified, 1–15=valid stratum levels, 16=unsynchronized. Values above 16 are reserved.' },
  { bits: '8', name: 'Poll Interval', color: '#3b82f6', desc: '8 bits. Signed integer representing log₂ of the poll interval in seconds. A value of 6 = 2⁶ = 64 seconds between polls. Range: 4 (16s) to 17 (131072s, ~36 hours).' },
  { bits: '8', name: 'Precision', color: '#8b5cf6', desc: '8 bits. Signed integer, log₂ of clock precision in seconds. -20 ≈ 1 µs precision (GPS), -10 ≈ 1 ms precision (PC software clock). Measures local clock resolution, not accuracy.' },
  { bits: '32', name: 'Root Delay', color: '#ec4899', desc: '32-bit NTP short format (16.16 fixed point). Total round-trip delay to the reference clock in seconds. Helps clients assess link latency to the authoritative source.' },
  { bits: '32', name: 'Root Dispersion', color: '#14b8a6', desc: '32-bit NTP short format. Nominal error relative to the primary reference source. Combined with Root Delay gives the total synchronization distance.' },
  { bits: '32', name: 'Reference ID', color: '#a855f7', desc: 'Stratum 1: 4-char ASCII reference clock type (GPS, PPS, CDMA, ATOM). Stratum 2+: last 4 bytes of the IPv4 address (or MD5 hash for IPv6) of the reference server.' },
  { bits: '64', name: 'Reference Timestamp (T_ref)', color: '#06b6d4', desc: '64-bit NTP timestamp. When the system clock was last updated. Format: 32 bits seconds since NTP epoch (Jan 1, 1900) + 32 bits fractional seconds (232 fractions = 232 ps resolution).' },
  { bits: '64', name: 'Origin Timestamp (T1)', color: N, desc: '64-bit. Time the client sent the request (filled by client). Server echoes this back unchanged, allowing the client to match responses to requests and detect packet replay.' },
  { bits: '64', name: 'Receive Timestamp (T2)', color: '#f97316', desc: '64-bit. Time the server received the request. This is one of the four timestamps used to calculate offset and delay. Server records this immediately on packet reception.' },
  { bits: '64', name: 'Transmit Timestamp (T3)', color: '#ef4444', desc: '64-bit. Time the server sent the response. Recorded as late as possible before transmission to minimize transmit timestamp error.' },
]

function NTPPacketDissector() {
  const [active, setActive] = useState<number | null>(null)
  const af = active !== null ? packetFields[active] : null
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: N, fontFamily: 'var(--font-mono)', margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '.1em' }}>NTPv4 Packet Structure — 48 Bytes Minimum</p>
      <p style={{ fontSize: 12, color: 'var(--muted)', margin: '0 0 16px' }}>Click any field to see its definition. NTP runs over UDP, no TCP overhead.</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 16 }}>
        {packetFields.map((f, i) => (
          <div
            key={i}
            onClick={() => setActive(active === i ? null : i)}
            style={{
              background: active === i ? `${f.color}25` : `${f.color}12`,
              border: `1px solid ${active === i ? f.color : f.color + '40'}`,
              borderRadius: 6, padding: '5px 10px', cursor: 'pointer',
              minWidth: `${Math.max(parseInt(f.bits) * 2, 40)}px`,
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 10, fontWeight: 800, color: f.color, fontFamily: 'var(--font-mono)' }}>{f.bits}b</div>
            <div style={{ fontSize: 10, color: 'var(--text)', lineHeight: 1.3, marginTop: 2 }}>{f.name.split(' ')[0]}</div>
          </div>
        ))}
      </div>
      {af ? (
        <div style={{ background: 'var(--bg)', border: `1px solid ${af.color}30`, borderRadius: 8, padding: '14px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <code style={{ fontSize: 11, background: `${af.color}20`, color: af.color, padding: '2px 7px', borderRadius: 4, fontWeight: 700 }}>{af.bits} bits</code>
            <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{af.name}</span>
          </div>
          <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.8, margin: 0 }}>{af.desc}</p>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '12px', fontSize: 13, color: 'var(--muted)' }}>Click a field above to see its definition</div>
      )}
    </div>
  )
}

// ── Interactive: Clock Offset Calculation ─────────────────────────────────────
function OffsetCalculator() {
  const [t1, setT1] = useState(1000)
  const [t2, setT2] = useState(1012)
  const [t3, setT3] = useState(1013)
  const [t4, setT4] = useState(1026)
  const delay = ((t4 - t1) - (t3 - t2))
  const offset = ((t2 - t1) + (t3 - t4)) / 2
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: N, fontFamily: 'var(--font-mono)', margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '.1em' }}>NTP Offset & Delay Calculator</p>
      <p style={{ fontSize: 12, color: 'var(--muted)', margin: '0 0 20px' }}>Adjust timestamps to see how NTP calculates offset and delay in real-time.</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
        {[
          { label: 'T1 — Client sends request', val: t1, set: setT1, desc: 'Client records this when it transmits' },
          { label: 'T2 — Server receives request', val: t2, set: setT2, desc: 'Server records this on arrival' },
          { label: 'T3 — Server sends response', val: t3, set: setT3, desc: 'Server records this on transmission' },
          { label: 'T4 — Client receives response', val: t4, set: setT4, desc: 'Client records this on arrival' },
        ].map(({ label, val, set, desc }) => (
          <div key={label}>
            <label style={{ fontSize: 12, fontWeight: 700, color: N, display: 'block', marginBottom: 4 }}>{label}</label>
            <p style={{ fontSize: 11, color: 'var(--muted)', margin: '0 0 6px' }}>{desc}</p>
            <input type="number" value={val} onChange={e => set(Number(e.target.value))}
              style={{ width: '100%', boxSizing: 'border-box', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 6, padding: '7px 10px', color: 'var(--text)', fontSize: 13 }} />
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{ background: `${N}10`, border: `1px solid ${N}30`, borderRadius: 8, padding: '14px 18px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: N, fontFamily: 'var(--font-mono)', marginBottom: 6 }}>ROUND-TRIP DELAY</div>
          <div style={{ fontSize: 22, fontWeight: 900, color: N, fontFamily: 'var(--font-mono)' }}>{delay} ms</div>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>= (T4 − T1) − (T3 − T2)</div>
          <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>= ({t4}−{t1}) − ({t3}−{t2}) = {t4-t1} − {t3-t2}</div>
        </div>
        <div style={{ background: `${Math.abs(offset) > 5 ? '#f59e0b' : N}10`, border: `1px solid ${Math.abs(offset) > 5 ? '#f59e0b' : N}30`, borderRadius: 8, padding: '14px 18px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: Math.abs(offset) > 5 ? '#f59e0b' : N, fontFamily: 'var(--font-mono)', marginBottom: 6 }}>CLOCK OFFSET</div>
          <div style={{ fontSize: 22, fontWeight: 900, color: Math.abs(offset) > 5 ? '#f59e0b' : N, fontFamily: 'var(--font-mono)' }}>{offset > 0 ? '+' : ''}{offset} ms</div>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>= ((T2−T1) + (T3−T4)) / 2</div>
          <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>Positive = local clock is behind server</div>
        </div>
      </div>
    </div>
  )
}

// ── Interactive: Chrony vs ntpd comparison ────────────────────────────────────
const daemons = [
  {
    name: 'chronyd', pkg: 'chrony', default: 'RHEL 7+, CentOS 7+, Ubuntu 20.04+, Amazon Linux 2+, Fedora 16+',
    pros: [
      'Faster initial synchronization (useful for VMs that sleep/hibernate)',
      'Better handling of intermittent network connectivity',
      'Smaller memory footprint — designed for embedded and VM environments',
      'Hardware timestamping support (NIC-level, nanosecond precision)',
      'makestep directive allows one-time large correction on startup',
      'Real-time clock (RTC) trimming on embedded systems',
      'Handles large initial offsets better than ntpd',
    ],
    cons: [
      'Less universal than ntpd in older distributions',
      'Different config syntax from ntpd — migration requires config rewrite',
    ],
    config: `# /etc/chrony.conf (modern Linux)
server time.cloudflare.com iburst prefer
server time.google.com iburst
server 169.254.169.123 iburst   # AWS link-local (EC2 only)
pool 2.pool.ntp.org iburst maxsources 4

# Allow large initial step sync (one-time only)
makestep 1.0 3

# Hardware timestamping if supported
hwtimestamp eth0

# Log measurements for analysis
logdir /var/log/chrony
log measurements statistics tracking

# Serve time to local network (remove if client-only)
allow 10.0.0.0/8

# Record RTC drift (embedded/baremetal only)
rtcsync`,
  },
  {
    name: 'ntpd', pkg: 'ntp', default: 'Older distros, BSDs, some embedded systems, historically universal',
    pros: [
      'Universal support across every Unix/Linux variant since the 1990s',
      'NTPD reference implementation — strictly follows RFCs',
      'Extensive monitoring via ntpq and ntpdc',
      'Symmetric peer mode for stratum-level synchronization between equals',
      'Well-understood behavior — decades of operational knowledge',
    ],
    cons: [
      'Slow convergence — takes 15–30 minutes to achieve steady-state accuracy',
      'Struggles with intermittent networks and VM clock drift',
      'Will not make large step corrections by default (tinker stepout)',
      'Higher memory usage than chrony',
      'monlist command is a DDoS amplification vector (CVE-2013-5211) — disable',
    ],
    config: `# /etc/ntp.conf (legacy)
server time.cloudflare.com iburst prefer
server time.google.com iburst
server 0.pool.ntp.org iburst
server 1.pool.ntp.org iburst

# Disable monlist — amplification attack vector
disable monitor

# Allow step on first sync only (otherwise slews only)
tinker stepout 0

# Restrict access
restrict default kod nomodify notrap nopeer noquery
restrict 127.0.0.1
restrict ::1

# Log file
logfile /var/log/ntpd.log
statsdir /var/log/ntpstats/`,
  },
  {
    name: 'systemd-timesyncd', pkg: 'systemd', default: 'Minimal SNTP client built into systemd — Debian, Ubuntu (pre-20.04 default)',
    pros: [
      'Zero additional packages — included with systemd',
      'Sufficient for workstations and non-critical servers',
      'Managed via timedatectl — simple interface',
      'Persists last known time to disk — faster sync after reboot',
    ],
    cons: [
      'SNTP only — no full NTP discipline algorithms (no frequency steering)',
      'Cannot serve time to other clients',
      'Not suitable for Stratum 2/3 servers or applications needing <10ms accuracy',
      'Single server source only by default',
    ],
    config: `# /etc/systemd/timesyncd.conf
[Time]
NTP=time.cloudflare.com time.google.com
FallbackNTP=0.pool.ntp.org 1.pool.ntp.org
RootDistanceMaxSec=5
PollIntervalMinSec=32
PollIntervalMaxSec=2048

# Check status:
# timedatectl status
# timedatectl show-timesync --all`,
  },
]

function DaemonComparison() {
  const [sel, setSel] = useState(0)
  const d = daemons[sel]
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: N, fontFamily: 'var(--font-mono)', margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '.1em' }}>NTP Daemon Comparison</p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {daemons.map((d2, i) => (
          <button key={d2.name} onClick={() => setSel(i)}
            style={{ background: sel === i ? N : 'transparent', color: sel === i ? '#000' : 'var(--muted)', border: `1px solid ${sel === i ? N : 'var(--border)'}`, borderRadius: 6, padding: '7px 16px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
            {d2.name}
          </button>
        ))}
      </div>
      <div style={{ marginBottom: 12 }}>
        <span style={{ fontSize: 12, color: 'var(--muted)' }}>Default on: </span>
        <span style={{ fontSize: 12, color: 'var(--text)', fontWeight: 600 }}>{d.default}</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
        <div>
          <p style={{ fontSize: 12, fontWeight: 700, color: N, marginBottom: 8 }}>Advantages</p>
          {d.pros.map((p, i) => <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6 }}><span style={{ color: N, fontSize: 13 }}>✓</span><span style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.6 }}>{p}</span></div>)}
        </div>
        <div>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#ef4444', marginBottom: 8 }}>Limitations</p>
          {d.cons.map((c, i) => <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6 }}><span style={{ color: '#ef4444', fontSize: 13 }}>✗</span><span style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.6 }}>{c}</span></div>)}
        </div>
      </div>
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.06em', fontFamily: 'var(--font-mono)' }}>Sample Configuration</p>
        <pre style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 8, padding: '14px 16px', fontSize: 12, color: 'var(--text)', lineHeight: 1.7, overflowX: 'auto', margin: 0, fontFamily: 'var(--font-mono)' }}>{d.config}</pre>
      </div>
    </div>
  )
}

// ── NTP Security Attack Simulator ─────────────────────────────────────────────
const attacks = [
  {
    name: 'NTP Amplification (DDoS)',
    severity: 'Critical',
    color: '#ef4444',
    cve: 'CVE-2013-5211',
    desc: 'The monlist command in ntpd returns up to 600 recent client IP addresses — 234x amplification factor. An attacker spoofs the victim\'s IP and sends monlist requests to hundreds of NTP servers. Each server replies with 600 entries to the victim. A 1 Gbps attacker creates 234 Gbps of traffic at the victim.',
    affect: 'ntpd < 4.2.7p26 with monlist enabled (default)',
    fix: 'Disable monlist: add "disable monitor" to /etc/ntp.conf. Upgrade ntpd. Rate-limit NTP at firewall. Block all UDP 123 from external unless you run a public NTP server.',
    detect: 'Asymmetric bandwidth on UDP/123. NetFlow showing many-to-one pattern from NTP servers.',
  },
  {
    name: 'NTP Reflection Attack',
    severity: 'High',
    color: '#f97316',
    cve: 'General amplification',
    desc: 'Similar to amplification but using standard NTP responses. Attacker sends small NTP queries with spoofed source IP (victim). Each NTP server replies with its full response to the victim. Even without monlist, standard responses provide ~10x amplification.',
    affect: 'Any open NTP server accessible from the internet',
    fix: 'BCP38 (ingress filtering) prevents IP spoofing at ISP level. Firewalls should only allow NTP from trusted sources. Cloud providers block UDP 123 by default on new instances.',
    detect: 'High inbound UDP 123 from many sources. Asymmetric traffic ratios.',
  },
  {
    name: 'Time Injection / NTP Spoofing',
    severity: 'High',
    color: '#f97316',
    cve: 'RFC 5905 — no authentication by default',
    desc: 'An on-path attacker intercepts NTP traffic and replies with manipulated timestamps. If the client accepts these, it can push the clock forward or backward. Consequences: TLS certificates appear expired/not-yet-valid, Kerberos authentication fails, log timestamps become forensically unreliable, TOTP tokens become invalid (time-based OTP).',
    affect: 'NTPv3/v4 without NTS or symmetric key authentication',
    fix: 'Enable NTS (Network Time Security, RFC 8915) — TLS-secured NTP. Use symmetric key authentication (ntp.keys). Use multiple NTP sources (3+ servers) to detect outliers. Monitor for sudden large clock adjustments.',
    detect: 'Sudden large clock offsets. chronyc tracking showing high offset. Multiple servers disagreeing.',
  },
  {
    name: 'Leap Second Smearing Attack',
    severity: 'Medium',
    color: '#f59e0b',
    cve: 'Implementation bug class',
    desc: 'Leap second handling bugs have historically crashed large portions of the internet. Exploiting a client that mishandles the leap second indicator (LI bits) can cause ntpd to enter a spin loop consuming 100% CPU. The 2012 leap second crashed Linux servers running ntpd + HRTICK (high-resolution timer) due to a kernel bug triggered by the 23:59:60 second.',
    affect: 'Legacy ntpd on kernels before 2012, systems with CLOCK_REALTIME jumps',
    fix: 'Use leap second smearing (Google\'s approach: spread the second over 20 hours, no visible jump). Modern chrony/ntpd handle leap seconds correctly. Keep OS and NTP daemon patched.',
    detect: 'CPU spike at exactly 00:00:00 UTC on leap second nights (announced by IERS months in advance).',
  },
  {
    name: 'Rogue NTP Server / DHCP Attack',
    severity: 'Medium',
    color: '#f59e0b',
    cve: 'DHCP Option 42 exploitation',
    desc: 'DHCP Option 42 specifies NTP servers for clients. An attacker deploying a rogue DHCP server can point clients to a malicious NTP server under their control. The malicious server then gradually drifts client clocks to defeat time-based security controls.',
    affect: 'Clients using DHCP-provided NTP servers without additional validation',
    fix: 'Hardcode NTP servers in configuration; do not rely solely on DHCP Option 42. Deploy DHCP snooping to block rogue DHCP servers. Use NTS for NTP authentication.',
    detect: 'New NTP server appearing in DHCP responses. Unexpected clock drift across multiple clients.',
  },
]

function NTPSecurityPanel() {
  const [sel, setSel] = useState(0)
  const a = attacks[sel]
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: '#ef4444', fontFamily: 'var(--font-mono)', margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '.1em' }}>NTP Security Threats — Attack Reference</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
        {attacks.map((a2, i) => (
          <button key={a2.name} onClick={() => setSel(i)}
            style={{ background: sel === i ? a2.color : 'transparent', color: sel === i ? '#fff' : 'var(--muted)', border: `1px solid ${sel === i ? a2.color : 'var(--border)'}`, borderRadius: 6, padding: '6px 14px', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
            {a2.name}
          </button>
        ))}
      </div>
      <div style={{ background: 'var(--bg)', border: `1px solid ${a.color}30`, borderRadius: 10, padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <span style={{ background: a.color, color: '#fff', fontSize: 11, fontWeight: 800, padding: '2px 8px', borderRadius: 4 }}>{a.severity}</span>
          <span style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)' }}>{a.name}</span>
          <code style={{ fontSize: 11, background: 'var(--surface)', color: 'var(--muted)', padding: '2px 7px', borderRadius: 4 }}>{a.cve}</code>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: a.color, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: 4 }}>How it works</p>
            <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.8, margin: 0 }}>{a.desc}</p>
          </div>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#f59e0b', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: 4 }}>Affected systems</p>
            <p style={{ fontSize: 13, color: 'var(--muted)', margin: 0 }}>{a.affect}</p>
          </div>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: N, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: 4 }}>Mitigation</p>
            <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.75, margin: 0 }}>{a.fix}</p>
          </div>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#3b82f6', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: 4 }}>Detection</p>
            <p style={{ fontSize: 13, color: 'var(--muted)', margin: 0 }}>{a.detect}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── NTP vs PTP Comparison ──────────────────────────────────────────────────────
function NTPvsPTP() {
  const rows = [
    ['Protocol', 'NTPv4 (RFC 5905)', 'PTP v2 (IEEE 1588-2008)', 'PTP v2.1 (IEEE 1588-2019)'],
    ['Typical accuracy', '1 ms (WAN), 100 µs (LAN)', '< 1 µs (hardware timestamping)', '< 10 ns (Grandmaster + BC)'],
    ['Transport', 'UDP/123 (unicast or multicast)', 'UDP/319-320 or Ethernet multicast', 'UDP/319-320 (enhanced security)'],
    ['Hardware support', 'Optional (HW timestamp improves to ~µs)', 'Required for sub-µs (NICs, switches)', 'Required; Transparent Clocks in switches'],
    ['Stratum / Domain', 'Stratum 0–15', 'Domain 0–127', 'Domain 0–127 + Profiles'],
    ['Synchronization model', 'Client-server (polling), peer mode', 'Master-slave with Best Master Clock algorithm', 'BMC + Enhanced BMCA'],
    ['Switch awareness', 'Not required', 'Benefits from BC (Boundary Clock)', 'TC (Transparent Clock) removes switch delay'],
    ['Use cases', 'Servers, network devices, workstations', 'Financial trading, 5G RAN, industrial control', 'Telecom (ITU-T G.8275), data center fabric'],
    ['Security', 'NTS (RFC 8915) with TLS', 'No auth in v1; optional in v2', 'Security profile in v2.1'],
    ['Deployment complexity', 'Low (software only)', 'Medium (requires PTP-aware switches)', 'High (full hardware stack)'],
  ]
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 24, margin: '32px 0', overflowX: 'auto' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: N, fontFamily: 'var(--font-mono)', margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '.1em' }}>NTP vs PTP (IEEE 1588) — When to Use Which</p>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr>
            {['Feature', 'NTPv4', 'PTP v2', 'PTP v2.1'].map(h => (
              <th key={h} style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--muted)', fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', borderBottom: '1px solid var(--border)', background: 'var(--bg)' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '9px 12px', fontWeight: 700, color: N, fontSize: 12 }}>{row[0]}</td>
              <td style={{ padding: '9px 12px', color: 'var(--text)' }}>{row[1]}</td>
              <td style={{ padding: '9px 12px', color: 'var(--text)' }}>{row[2]}</td>
              <td style={{ padding: '9px 12px', color: 'var(--text)' }}>{row[3]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── Main Module ────────────────────────────────────────────────────────────────
export default function NTPModule() {
  return (
    <LearnLayout
      title="NTP — Network Time Protocol"
      description="Synchronized clocks are not optional infrastructure. TLS certificates, Kerberos authentication, distributed database transactions, log correlation, TOTP authentication, and financial trading systems all depend on accurate, synchronized time — and NTP is the protocol that makes it possible."
      section="Networking Fundamentals"
      readTime="35 min"
      updatedAt="May 2026"
    >
      {/* ── PART 01: Why Time Matters ── */}
      <Part n="01" title="Why Accurate Time Is Foundational Infrastructure" />
      <P>Most engineers think of NTP as a background daemon — something that runs and is largely ignored. This is a mistake. Synchronized clocks underpin nearly every security and reliability mechanism in modern computing. When time drifts, systems break in subtle and catastrophic ways that are extremely difficult to debug because the failure mode is not "connection refused" or "file not found" — it is silent data corruption, authentication failures, and log timestamps that lie.</P>

      <H>What Breaks Without Accurate Time</H>
      <P><Hl>TLS/SSL Certificate Validation</Hl> — Every TLS certificate has a notBefore and notAfter field. If the system clock is before notBefore, the certificate appears not yet valid. If it is after notAfter, the certificate appears expired. Even a clock that is only 5 minutes slow can reject a freshly-issued certificate. Certificate Transparency logs and OCSP stapling also depend on timestamps.</P>
      <P><Hl>Kerberos Authentication</Hl> — The Kerberos protocol (used by Active Directory, MIT Kerberos, Hadoop clusters) has a hard-coded 5-minute clock skew tolerance. The KDC (Key Distribution Center) embeds a timestamp in every ticket. If the client's clock differs from the KDC by more than 5 minutes, every authentication attempt fails with KRB5KRB_AP_ERR_SKEW. This protects against replay attacks (an attacker capturing a ticket cannot replay it more than 5 minutes later), but it means a clock drift of just 6 minutes locks every user out of Active Directory. This happens in real datacenters when a domain controller is moved to a hypervisor and inherits the wrong time from a host that was hibernated.</P>
      <P><Hl>Distributed Databases and Consensus</Hl> — Google Spanner uses TrueTime — a globally synchronized clock API backed by GPS and atomic clocks — to implement external consistency without a centralized coordinator. Spanner commits transactions by waiting out the TrueTime uncertainty interval (ε, typically 7 ms) before committing, guaranteeing that any concurrent transaction either sees this one or commits after it. Apache Cassandra uses NTP for write timestamp ordering — if clocks diverge, later writes with earlier timestamps silently overwrite newer data. CockroachDB uses a hybrid logical clock (HLC) but still depends on NTP as its physical clock substrate.</P>
      <P><Hl>Log Correlation and Forensics</Hl> — After a security incident, the ability to reconstruct a timeline across dozens of systems depends entirely on consistent timestamps. A 2-second clock difference between an application server and a database server makes it impossible to determine whether the SQL query preceded or followed the web request. In PCI DSS environments, this is not merely inconvenient — it is a compliance violation (Requirement 10.4: "Using time-synchronization technology, synchronize all critical system clocks and times").</P>
      <P><Hl>TOTP and MFA</Hl> — Time-based One-Time Passwords (RFC 6238, used by Google Authenticator, Authy, hardware tokens) generate a new code every 30 seconds based on HMAC-SHA1(secret, floor(time/30)). Both the authenticator and the server compute the code independently — they must agree on the current 30-second window. A clock drift of 60 seconds means the generated code no longer matches what the server expects. The RFC allows 1–2 adjacent windows of tolerance, but a drifted clock eventually breaks MFA entirely.</P>
      <P><Hl>Make-before-Break in Networking</Hl> — BGP route flap dampening, OSPF LSA age timers, EIGRP hold timers, and STP BPDU max age all rely on wall-clock time or system uptime. Systems with severely drifted clocks can prematurely age out routing table entries or hold them too long, causing unexpected routing instability.</P>

      <Deep>
        In high-frequency trading (HFT), the SEC requires MiFID II and CAT (Consolidated Audit Trail) regulations to timestamp order events to within 1 millisecond of UTC. NTP is insufficient for this — HFT firms use PTP (IEEE 1588) with FPGA-based timestamping on custom NICs to achieve sub-100 nanosecond accuracy. The GPS-synchronized grandmaster clocks at co-location facilities like Equinix NY4 and NY5 feed PTP slave clocks in servers via PTP-aware switches (Arista, Cisco Nexus 9000 with PTP support).
      </Deep>

      <HR />

      {/* ── PART 02: NTP Protocol Internals ── */}
      <Part n="02" title="NTP Protocol Internals — How It Actually Works" />
      <H>The NTP Timestamp Format</H>
      <P>NTP uses a 64-bit timestamp format. The upper 32 bits count seconds since the NTP epoch: <Hl>January 1, 1900, 00:00:00 UTC</Hl>. The lower 32 bits represent fractional seconds — each unit is 1/2³² ≈ 232 picoseconds. This gives NTP timestamps theoretical sub-nanosecond resolution, though practical accuracy is limited by network jitter and OS clock resolution. The 32-bit second counter rolls over every 2³² seconds ≈ 136 years. The next NTP epoch rollover occurs on <Hl>February 7, 2036</Hl> — NTPv4 handles this with an era number in the upper bits.</P>
      <P>The NTP epoch (1900) differs from the Unix epoch (January 1, 1970). To convert: subtract 70 years in seconds: 2,208,988,800. In Python: <Mono>ntp_time - 2208988800 == unix_time</Mono>. This conversion is critical when writing NTP clients or analyzing packet captures — a raw NTP timestamp will look like a number in the 3.8 billion range for 2024 (counting seconds from 1900).</P>

      <H>The Four-Timestamp Exchange</H>
      <P>Every NTP client-server exchange uses exactly four timestamps to calculate two values: <Hl>clock offset</Hl> (how much the local clock differs from the server) and <Hl>round-trip delay</Hl> (network latency between client and server). Understanding these four timestamps is fundamental — they appear in every NTP diagnostic tool and every interview question about NTP.</P>

      <CodeBlock title="NTP Four-Timestamp Exchange">
{`Timeline:

Client                      Server
  |                            |
T1 ──── NTP Request ────────►  |  (T1: client records time before sending)
  |                            T2  (T2: server records time on receipt)
  |  ◄──── NTP Response ─────  T3  (T3: server records time before sending)
T4                             |  (T4: client records time on receipt)
  |                            |

Calculations:
  Round-trip delay  δ = (T4 - T1) - (T3 - T2)
  Clock offset      θ = ((T2 - T1) + (T3 - T4)) / 2

Assumption: network delay is symmetric (same in both directions).
If asymmetric (e.g., satellite with different up/down latency),
NTP introduces systematic offset error of (asymmetry / 2).`}
      </CodeBlock>

      <P>The <Hl>offset formula</Hl> assumes symmetric network delay. Here is why: (T2 - T1) is the sum of the one-way forward delay plus the server-client time difference. (T3 - T4) is the one-way return delay minus the server-client time difference (negative, since we want client offset). Averaging eliminates the delay component: θ = ((forward_delay + offset) + (-return_delay + offset)) / 2. If delay is symmetric (forward_delay = return_delay), the delay terms cancel, leaving exactly the offset. This assumption fails on asymmetric paths (satellite uplinks, asymmetric cable internet), introducing a systematic bias of up to δ_asymmetry / 2.</P>

      <OffsetCalculator />

      <H>Clock Discipline: Slewing vs Stepping</H>
      <P>Once NTP calculates the offset, it must adjust the local clock. Simply jumping the clock to the correct time would be catastrophic — it would cause log entries to jump backward, break monotonic time guarantees that mutexes and timeouts depend on, and cause distributed systems to see time go backward. NTP's answer is <Hl>clock discipline</Hl>: a feedback control loop (a type-II PLL — Phase-Locked Loop) that gradually adjusts the local oscillator frequency to steer the clock toward accuracy.</P>
      <P><Hl>Slewing</Hl> — The normal correction mode. NTP asks the OS (via <Mono>adjtimex()</Mono> on Linux, <Mono>adjtime()</Mono> on BSD) to run the clock slightly faster or slower. The maximum slew rate defined by RFC 5905 is <Hl>500 ppm (parts per million)</Hl> — this means the clock runs at most 0.05% faster or slower than real-time. At 500 ppm, it takes about 2,000 seconds (33 minutes) to correct a 1-second offset. Most operating systems further limit the slew rate to 200 ppm (Linux default) or 128 ppm (ntpd default), meaning correction of a 1-second drift takes 80–140 minutes.</P>
      <P><Hl>Stepping</Hl> — A one-time instant jump of the clock. Used when the offset is too large to slew in a reasonable time. ntpd's default threshold is 128 ms for slewing; beyond that, it will step. chrony's <Mono>makestep</Mono> directive controls this. The step is applied via <Mono>settimeofday()</Mono> or <Mono>clock_settime(CLOCK_REALTIME)</Mono>, which jumps CLOCK_REALTIME but does not affect CLOCK_MONOTONIC. Applications using monotonic time (most well-written applications) are unaffected. Steps backward in time are particularly dangerous because they can cause negative elapsed time values, confusing applications that assume time is monotonically increasing.</P>
      <P><Hl>Panic Mode</Hl> — If the offset exceeds 1,000 seconds (16.7 minutes) on startup, ntpd refuses to synchronize and exits with an error. This is the "panic threshold" — designed to prevent an NTP daemon from "helpfully" correcting a grossly wrong clock on a system that may have serious hardware problems (dead CMOS battery, wrong timezone, etc.). Override with <Mono>-g</Mono> flag or chrony's <Mono>makestep 1.0 -1</Mono> (always step, no limit).</P>

      <NTPPacketDissector />

      <H>The Clock Filter Algorithm</H>
      <P>A single NTP exchange produces a single offset measurement, but that measurement is noisy. NTP maintains a <Hl>shift register</Hl> of the last 8 samples from each server. The clock filter algorithm selects the "best" sample: the one with the lowest <Hl>dispersion</Hl> (the spread of measurements), weighted by delay. The best sample is the one closest to the true offset — achieved by picking the sample with minimum delay (minimum network jitter) from the 8-entry register.</P>
      <P>The <Hl>dispersion</Hl> of each sample grows over time at a rate of 15 ppm (the <Hl>phi</Hl> constant), representing the maximum local oscillator frequency error. As time passes since the last measurement, uncertainty grows. This is why poll intervals matter: longer intervals mean older samples with higher dispersion, degrading sync quality.</P>

      <H>Selection and Clustering Algorithms — Detecting Falsetickers</H>
      <P>After filtering, NTP has a set of "survivor" servers with associated offset estimates. The <Hl>selection algorithm</Hl> uses a Byzantine fault-tolerant approach to identify <Hl>falsetickers</Hl> — servers providing incorrect time — by finding the largest subset of servers whose confidence intervals overlap. This is the "intersection algorithm": find the intersection of all confidence intervals (offset ± root distance) for all servers. A server whose interval doesn't intersect with the majority is a falseticker.</P>
      <P>This is why you need at least 3 NTP servers: with 2 servers, you cannot determine which is wrong if they disagree. With 3, the outlier is identified. With 4, you can tolerate 1 falseticker while maintaining a valid majority. The RFC recommends 4–5 sources for robust falseticker detection.</P>
      <P>After selection, the <Hl>clustering algorithm</Hl> further ranks survivors by their <Hl>synchronization distance</Hl> = root dispersion + (root delay / 2). Lower synchronization distance = higher quality. The system peer (the server NTP actually disciplines against) is the survivor with the lowest synchronization distance that passes all sanity checks.</P>

      <NTPStratumDiagram />

      <HR />

      {/* ── PART 03: NTP Daemons and Configuration ── */}
      <Part n="03" title="NTP Daemons — chrony, ntpd, timesyncd" />
      <P>Three daemons dominate Linux NTP deployments: <Hl>chronyd</Hl> (modern default), <Hl>ntpd</Hl> (legacy reference implementation), and <Hl>systemd-timesyncd</Hl> (SNTP-only lightweight client). Each has distinct strengths. Understanding the differences lets you choose correctly for your environment — a VM on a cloud provider has very different requirements from a physical Stratum 2 server serving thousands of clients.</P>

      <DaemonComparison />

      <H>chronyc — The Chrony Control Interface</H>
      <P>Most NTP debugging in modern Linux environments is done through <Mono>chronyc</Mono>. The key commands every network engineer should know:</P>
      <CodeBlock title="chronyc diagnostic commands">
{`# Overall sync status — your first command when debugging
chronyc tracking

# Output:
# Reference ID    : A29F2303 (time.cloudflare.com)  ← system peer
# Stratum         : 3                                ← your stratum
# Ref time (UTC)  : Thu May 14 10:22:31 2026
# System time     : 0.000124318 seconds fast of NTP time  ← offset
# Last offset     : +0.000134521 seconds
# RMS offset      : 0.000089234 seconds              ← long-run accuracy
# Frequency       : 12.456 ppm fast                  ← clock frequency error
# Residual freq   : +0.003 ppm                       ← correction being applied
# Skew            : 0.082 ppm                        ← frequency uncertainty
# Root delay      : 0.012345678 seconds              ← to reference
# Root dispersion : 0.000234567 seconds
# Update interval : 64.3 seconds                     ← current poll interval
# Leap status     : Normal

# All configured sources with status
chronyc sources -v

# Output:
# MS = Mode and State: * = synced system peer, + = combined, - = not used
# ? = unreachable, x = falseticker, ~ = high variance
# #  210 GPS0    0   4   377   0.000  +0.000000  0.000001
# ^* 162.159.200.1   1  10  377    12ms  +0.124ms  0.015ms
# ^+ 216.239.35.0    1  10  377    14ms  +0.089ms  0.019ms
# ^- 129.6.15.28     1  10  377    65ms  -1.234ms  0.234ms  ← not used (high delay)

# Detailed statistics per source
chronyc sourcestats -v

# Force immediate sync (use with caution in production)
chronyc makestep

# Check if NTP is currently serving
chronyc activity

# Manual NTS check
chronyc ntpdata <server-ip>`}
      </CodeBlock>

      <CodeBlock title="ntpq diagnostic commands (legacy ntpd)">
{`# Show all peers and their status
ntpq -p

# Output:
# remote           refid      st t when poll reach   delay   offset  jitter
# ==============================================================================
# *time.cloudflare 10.104.2.1  2 u   61   64  377   12.345  +0.124   0.234
# +time.google.com 216.239.35. 1 u   56   64  377   14.567  +0.089   0.198
# -tick.usno.navy. .USNO.      1 u  103   64  377   65.432  -1.234   2.345

# Symbols:
# * = system peer (synchronized to)
# + = considered good, combined
# - = discarded by clustering
# x = declared falseticker
# o = PPS peer (hardware pulse)
# space = not yet synchronized

# Show NTP associations in detail
ntpq -c associations

# Query a remote NTP server directly
ntpdate -q pool.ntp.org

# Force immediate sync (production risk)
ntpdate -s pool.ntp.org`}
      </CodeBlock>

      <H>Windows Time Service (W32tm)</H>
      <P>Windows uses the <Hl>Windows Time Service (W32tm)</Hl> rather than ntpd or chrony. In an Active Directory domain, time synchronization follows the domain hierarchy: domain members sync to their authenticating domain controller → non-PDC-emulator DCs sync to the PDC emulator → the PDC emulator syncs to an external NTP source. The PDC emulator FSMO role holder is the authoritative time source for the entire domain — if it drifts, every domain member drifts with it.</P>
      <CodeBlock title="Windows Time Service commands">
{`# Check current sync status
w32tm /query /status

# Show all NTP sources and their offsets
w32tm /query /peers

# Force immediate resync
w32tm /resync /force

# Configure PDC emulator to sync from external NTP
w32tm /config /manualpeerlist:"time.cloudflare.com time.google.com" /syncfromflags:manual /reliable:YES /update

# Verify configuration
w32tm /query /configuration

# Diagnose Kerberos time skew issues
w32tm /stripchart /computer:dc01.corp.example.com /samples:5`}
      </CodeBlock>

      <Err title="Not configuring the PDC emulator as authoritative">
        The most common enterprise NTP failure: the PDC emulator syncs to its own hardware clock (a VM clock, often inaccurate) instead of an external NTP source. Every domain member's clock is then only as good as the PDC emulator's VM clock, which can drift by seconds or minutes on a busy hypervisor. Always configure the PDC emulator explicitly: w32tm /config /manualpeerlist with 3–4 external NTP servers.
      </Err>

      <ProTip>
        To find your PDC emulator: <Mono>netdom query fsmo</Mono> or <Mono>Get-ADDomain | Select-Object PDCEmulator</Mono>. Then check its time source: <Mono>w32tm /query /source</Mono> run on the PDC emulator. If it shows "Local CMOS Clock" or "Free-running System Clock", it is not syncing externally — fix this immediately.
      </ProTip>

      <HR />

      {/* ── PART 04: Cloud NTP ── */}
      <Part n="04" title="Cloud Provider NTP — AWS, Azure, GCP" />
      <H>AWS Time Sync Service</H>
      <P>AWS provides a <Hl>Stratum 1</Hl> NTP service at <Mono>169.254.169.123</Mono> — a link-local IPv4 address accessible from any EC2 instance without routing configuration, internet gateway, or VPC endpoint. It is backed by GPS-synchronized atomic clocks in each Availability Zone, achieving accuracy of <Hl>±100 µs</Hl> in steady state. Always use this for EC2 workloads: it requires no internet access (works in air-gapped VPCs), has sub-millisecond latency (same AZ), and is guaranteed to be within the same failure domain as your instance.</P>
      <CodeBlock title="AWS: Configure chrony for EC2">
{`# /etc/chrony.conf on Amazon Linux 2 / AL2023 (default config)
server 169.254.169.123 prefer iburst minpoll 4 maxpoll 4

# Why maxpoll 4?
# 2^4 = 16 second poll interval — more frequent than default
# Keeps EC2 clocks tighter. AWS recommends this for production.

# Verify AWS time sync is working:
chronyc tracking | grep "Reference ID"
# Should show: A9FEA97B (169.254.169.123)

# Check it is truly stratum 1:
chronyc sources | grep 169.254.169.123
# Should show stratum 1 (*^* prefix)`}
      </CodeBlock>

      <P>Amazon also offers a <Hl>Precision Time Protocol (PTP) hardware clock</Hl> on Nitro-based EC2 instances (most current instance types: C5, M5, R5, and newer). The PTP clock is exposed as <Mono>/dev/ptp0</Mono> and provides sub-microsecond accuracy. This is the basis for AWS Timestream and Outposts time synchronization. For financial workloads requiring &lt;1 µs accuracy on EC2, use <Mono>phc2sys</Mono> to synchronize the system clock to the PTP hardware clock.</P>

      <H>Azure NTP</H>
      <P>Azure provides NTP at <Mono>time.windows.com</Mono> (external) and a VM host clock via the Hyper-V time sync provider. Azure VMs should use the <Hl>Hyper-V TimeSync driver</Hl> for highest accuracy — it syncs directly to the host clock via VMBus rather than UDP. For Linux VMs on Azure, chrony is configured to use both the Hyper-V refclock and external NTP. The Hyper-V clock is exposed as <Mono>/dev/ptp_hyperv</Mono> on newer kernels.</P>

      <H>GCP NTP</H>
      <P>Google Cloud provides NTP at <Mono>metadata.google.internal</Mono> (169.254.169.254) and <Mono>time.google.com</Mono>. Google uses a technique called <Hl>leap smearing</Hl> — instead of inserting a discrete leap second at 23:59:60 UTC, Google gradually smears the extra second over a ±12 hour window around midnight, so time appears to progress continuously. This means Google's NTP servers show slightly different time from standard NTP sources for 24 hours around a leap second. If your environment mixes Google NTP with non-smearing NTP sources, you'll get falseticker detection firing around leap second events.</P>

      <Warn title="Mixing Google NTP (leap smearing) with standard NTP servers">
        Do not mix time.google.com with time.cloudflare.com or pool.ntp.org as NTP peers on the same server around leap second events. Google smears the leap second; standard servers insert a discrete leap second. The two sets of servers will disagree by up to 0.5 seconds for hours around the event, causing your NTP daemon to mark one group as falsetickers. Choose one camp: all smearing (Google) or all discrete (standard). AWS also smears.
      </Warn>

      <HR />

      {/* ── PART 05: Security ── */}
      <Part n="05" title="NTP Security — Attacks, NTS, and Hardening" />
      <P>NTP has historically been one of the most abused protocols on the internet — used for DDoS amplification, vulnerable to on-path time injection, and frequently misconfigured. The threat model for NTP is unique: an attacker does not need to disrupt your NTP service; they just need to <Hl>subtly manipulate your clock</Hl> to break authentication systems, invalidate certificates, or corrupt audit logs. A 1-minute clock drift is invisible to users but breaks TOTP entirely.</P>

      <NTPSecurityPanel />

      <H>Network Time Security (NTS) — RFC 8915</H>
      <P><Hl>NTS (Network Time Security)</Hl>, published as RFC 8915 in 2020, is the modern authenticated NTP protocol. It uses TLS for key exchange and AES-SIV for per-packet authentication — without TLS overhead on every NTP packet. The TLS handshake happens once to establish keys; subsequent NTP packets are authenticated with a MAC using those keys. NTS is supported by Cloudflare (<Mono>time.cloudflare.com</Mono>), and by chrony 4.0+ and ntpd 4.2.8p15+.</P>
      <CodeBlock title="Enable NTS in chrony (chrony 4.0+)">
{`# /etc/chrony.conf — NTS-enabled configuration
server time.cloudflare.com iburst nts
server time.google.com iburst           # fallback without NTS

# chrony will use NTS for time.cloudflare.com:
# 1. TLS handshake to port 4460 (NTS-KE port) establishes session keys
# 2. NTP packets on port 123 are authenticated with those keys
# 3. Keys rotate periodically without new TLS handshake

# Verify NTS is working:
chronyc ntpdata time.cloudflare.com
# Look for: NTS: YES`}
      </CodeBlock>

      <H>Firewall Rules for NTP</H>
      <CodeBlock title="iptables NTP hardening rules">
{`# Allow outbound NTP (client to servers)
iptables -A OUTPUT -p udp --dport 123 -j ACCEPT
iptables -A INPUT  -p udp --sport 123 -m state --state ESTABLISHED -j ACCEPT

# If running NTP server: allow inbound from trusted ranges only
iptables -A INPUT -p udp --dport 123 -s 10.0.0.0/8 -j ACCEPT
iptables -A INPUT -p udp --dport 123 -j DROP  # block all else

# Block monlist if using ntpd (reflected DDoS prevention)
# Better: add "disable monitor" to /etc/ntp.conf
# iptables doesn't inspect NTP mode 6/7 well — use ntpd config

# Rate limit NTP queries if running a public server
iptables -A INPUT -p udp --dport 123 -m hashlimit \
  --hashlimit-name ntp --hashlimit-above 4/second \
  --hashlimit-burst 8 --hashlimit-mode srcip -j DROP`}
      </CodeBlock>

      <ProTip>
        Monitor NTP quality in production with Prometheus + node_exporter. The <Mono>node_timex_*</Mono> metrics expose offset, frequency error, and sync status directly from <Mono>adjtimex()</Mono>. Alert on: <Mono>node_timex_sync_status != 1</Mono> (not synced), <Mono>abs(node_timex_offset_seconds) &gt; 0.01</Mono> (10ms offset, Kerberos boundary is 300s but 10ms is a warning sign), and <Mono>node_timex_estimated_error_seconds &gt; 0.001</Mono> (1ms estimated error).
      </ProTip>

      <HR />

      {/* ── PART 06: NTP vs PTP ── */}
      <Part n="06" title="NTP vs PTP (IEEE 1588) — Choosing the Right Protocol" />
      <P>NTP is not the only time synchronization protocol. For applications requiring sub-millisecond accuracy — financial trading, 5G radio access networks, industrial control systems, distributed databases like Google Spanner — <Hl>PTP (Precision Time Protocol, IEEE 1588)</Hl> provides accuracy orders of magnitude better than NTP. Understanding when NTP is sufficient and when PTP is required is a senior-level skill.</P>
      <P>NTP's accuracy limit is fundamentally set by <Hl>software timestamping</Hl>: the OS timestamps packets in the kernel network stack, introducing jitter of 10–100 µs from interrupt latency, scheduler delays, and CPU cache misses. PTP achieves sub-microsecond accuracy by moving timestamping to the <Hl>NIC hardware</Hl> — the packet is stamped at the exact moment it crosses the physical wire, eliminating software jitter entirely. PTP switches (Boundary Clocks and Transparent Clocks) further remove switch queuing delay from the timestamp calculations.</P>

      <NTPvsPTP />

      <H>PTP Architecture</H>
      <P>PTP uses a <Hl>Best Master Clock (BMC)</Hl> algorithm to elect the Grandmaster — the authoritative time source. BMC compares clock attributes: clock class (GPS-disciplined = class 6), clock accuracy (GPS = 100 ns), clock variance (Allan deviation), and priority fields. The Grandmaster periodically sends <Mono>Sync</Mono> messages to slaves. Each slave requests a <Mono>Delay_Req</Mono> measurement to calculate the path delay. In a two-step mechanism, the <Mono>Follow_Up</Mono> message carries the precise transmit timestamp of the Sync message.</P>
      <P>In environments with PTP-aware switches, <Hl>Transparent Clocks (TC)</Hl> update a "correction field" in PTP packets to account for the exact time spent inside the switch's queues and processing. This eliminates switch latency from the timestamp math. Without TC, switch queuing jitter (0.1–10 µs) is the dominant error source in PTP deployments.</P>

      <Deep>
        The theoretical accuracy floor of software-timestamped NTP over a local Ethernet is ~10 µs (hardware timestamping: ~200 ns). PTP with hardware timestamping and TC switches achieves &lt;50 ns. PTP with GPS grandmaster, BC switches, and FPGA-based NICs (as used in HFT co-location) achieves &lt;10 ns. Google's TrueTime in Spanner maintains an uncertainty bound ε of ~7 ms globally (GPS + atomic + fiber RTT across datacenters), which is sufficient for global transaction ordering without a central coordinator.
      </Deep>

      <HR />

      {/* ── PART 07: Production NTP Architecture ── */}
      <Part n="07" title="Production NTP Architecture" />
      <H>Enterprise NTP Hierarchy Design</H>
      <P>A production enterprise NTP architecture has three tiers. The design goal is: every system synchronizes to time traceable to UTC, no single point of failure, falseticker detection active, and all synchronization paths auditable.</P>
      <CodeBlock title="Enterprise NTP reference architecture">
{`Stratum 0: GPS antenna + atomic clock reference (on-prem or cloud)
     │
     ▼
Stratum 1: 2x internal NTP appliances (GPS-disciplined oscillator)
           - Meinberg LANTIME M300, Trimble Thunderbolt, or
           - Raspberry Pi 4 + u-blox GPS + PPS kernel driver (< $100)
           - Located in geographically separate datacenters
           - Each syncs to 3+ external Stratum 1 servers as backup
     │
     ▼
Stratum 2: 3-4x internal NTP servers per datacenter
           - Physical or dedicated VMs with pinned CPU for low jitter
           - Each configured with:
             server ntp1.internal.corp.com iburst prefer
             server ntp2.internal.corp.com iburst
             server time.cloudflare.com iburst nts  # external backup
             pool 2.pool.ntp.org iburst maxsources 2  # last resort
           - Serve the entire organization
     │
     ▼
Stratum 3: All servers, switches, routers, VMware vCenter/ESXi hosts
           - Configured with 3 internal Stratum 2 servers
           - NOT using external NTP directly (reduces exposure, ensures
             all time derives from the same internal hierarchy)
     │
     ▼
Stratum 4: Virtual machines (sync to hypervisor OR internal NTP)
           - VMs on VMware/Hyper-V: use VMTools time sync OR NTP, not both
           - Container hosts: inherit from host (do not run ntpd in containers)
           - Cloud VMs: use cloud-provider NTP (169.254.169.123 on AWS)`}
      </CodeBlock>

      <H>NTP on VMware and Hypervisors</H>
      <P>Virtualized environments are notoriously difficult for NTP. A VM's software clock runs inside a hypervisor that may steal CPU cycles, pause the VM for vMotion, or snapshot and restore state — all of which cause the guest clock to drift. Two competing solutions exist and <Hl>you should not run both simultaneously</Hl>:</P>
      <P><Hl>VMware Tools Time Synchronization</Hl> — VMware's hypervisor periodically resets the guest clock to match the hypervisor clock. This is a step correction, not a slew. If ntpd is running and VMware Tools keeps resetting the clock, ntpd detects a sudden large offset and may panic, enter orphan mode, or desynchronize entirely. The VMware KB article (1189) documents this interaction.</P>
      <P><Hl>NTP inside the VM</Hl> — Disable VMware Tools time sync (<Mono>vmware-toolsd --cmd "vmx.set_option synctime 0 0"</Mono>) and run chrony/ntpd inside the VM pointing to your internal NTP servers. This is the preferred approach for servers that need accurate time. The hypervisor host (ESXi) itself should sync to your internal NTP servers.</P>

      <Err title="Running NTP inside containers">
        Do not run NTP daemons inside containers. Containers share the host kernel, and clock adjustments (<Mono>adjtimex()</Mono>) require CAP_SYS_TIME which containers do not have by default (and should not have — it affects the entire host). Containers automatically inherit the host's clock. Ensure the container host is synchronized via chrony/ntpd, and all containers on that host are automatically synchronized.
      </Err>

      <H>Monitoring NTP in Production</H>
      <CodeBlock title="Prometheus alerting rules for NTP">
{`# prometheus/rules/ntp.yml
groups:
  - name: ntp
    rules:
      # Alert if NTP is not synchronized
      - alert: NTPNotSynchronized
        expr: node_timex_sync_status != 1
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "NTP not synchronized on {{ $labels.instance }}"
          description: "Clock drift will cause TLS/Kerberos failures"

      # Alert on high clock offset (warning at 10ms, critical at 100ms)
      - alert: NTPHighOffset
        expr: abs(node_timex_offset_seconds) > 0.01
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: "High NTP offset on {{ $labels.instance }}: {{ $value }}s"

      # Alert on critical offset (approaching Kerberos 5-minute limit)
      - alert: NTPCriticalOffset
        expr: abs(node_timex_offset_seconds) > 60
        for: 2m
        labels:
          severity: critical

      # Alert if frequency error is very high (failing oscillator)
      - alert: NTPHighFrequencyError
        expr: abs(node_timex_freq_ppm) > 500
        for: 30m
        labels:
          severity: warning`}
      </CodeBlock>

      <HR />

      {/* ── PART 08: Interview Questions ── */}
      <Part n="08" title="Interview Questions — Junior to PhD Level" />

      <IQ q="What does NTP do and why is it important?" level="junior">
        NTP (Network Time Protocol) synchronizes the clocks of computers over a network to UTC (Coordinated Universal Time). It is important because many protocols depend on accurate time: TLS certificates are rejected if the clock is wrong, Kerberos authentication (used by Active Directory) fails if clocks differ by more than 5 minutes, log correlation becomes impossible with inconsistent timestamps, and TOTP multi-factor authentication fails if time drifts more than 30–60 seconds. NTP runs as a background daemon (chrony on modern Linux, ntpd on older systems) and continuously steers the local clock toward accuracy.
      </IQ>

      <IQ q="What is NTP stratum and why does it matter?" level="junior">
        Stratum indicates a clock's distance (in hops) from an authoritative reference source. Stratum 0 = hardware reference clocks (GPS, atomic) — these are not on the network directly. Stratum 1 = servers directly connected to Stratum 0 hardware — the most accurate NTP servers. Stratum 2 = servers synced from Stratum 1. Each hop adds one stratum and potentially more jitter and error. Stratum 16 means unsynchronized. You care about stratum because you want your internal NTP servers to be Stratum 2 or 3 — close to authoritative sources. High-stratum servers (8+) have accumulated too much error to be reliable references.
      </IQ>

      <IQ q="Why can't NTP just instantly set the clock to the correct time?" level="mid">
        Instantly jumping the clock causes several problems. If the clock jumps backward: log entries get duplicate or out-of-order timestamps (breaking forensic analysis), mutex timeouts that use wall time may never expire (deadlock), database transactions with future timestamps become invalid, and TOTP codes stop working. NTP instead "slews" the clock — it tells the OS to run slightly faster or slower (up to 500 ppm maximum, typically 200 ppm) to gradually converge on the correct time. This is a Phase-Locked Loop (PLL) feedback system. A step correction is only made when the offset is too large to slew in a reasonable time (chrony's makestep threshold, ntpd's tinker step threshold). Applications using CLOCK_MONOTONIC (which NTP never adjusts) are entirely unaffected by NTP slewing.
      </IQ>

      <IQ q="How does NTP calculate clock offset? Walk through the four-timestamp algorithm." level="mid">
        NTP uses four timestamps per exchange. T1: time the client sent the request (recorded by client). T2: time the server received the request (recorded by server). T3: time the server sent the response (recorded by server). T4: time the client received the response (recorded by client). Round-trip delay δ = (T4 - T1) - (T3 - T2). This subtracts server processing time from total elapsed time. Clock offset θ = ((T2 - T1) + (T3 - T4)) / 2. This assumes symmetric delay — if the forward path takes the same time as the return path, averaging cancels the delay component and isolates the offset. If delay is asymmetric (satellite links, asymmetric cable), a systematic error of (asymmetry / 2) remains — this is an inherent limitation of NTP.
      </IQ>

      <IQ q="What is a falseticker and how does NTP detect it?" level="mid">
        A falseticker is an NTP server providing incorrect time — either due to hardware failure, misconfiguration, GPS signal loss, or a deliberate attack. NTP detects falsetickers using the intersection algorithm (a Byzantine fault-tolerant approach). Each server's offset estimate has a confidence interval (offset ± root distance). The algorithm finds the largest subset of servers whose confidence intervals all intersect (overlap). Any server outside this intersection is a falseticker. This is why you need minimum 3 NTP servers: with 2 servers that disagree, NTP cannot determine which is wrong. With 3 servers, the outlier is identified. With 4 servers, you can tolerate 1 falseticker. NTP marks falsetickers with an 'x' in ntpq -p output.
      </IQ>

      <IQ q="Explain the NTP amplification attack and how to prevent it." level="senior">
        The monlist command (mode 6 REQ_MON_GETLIST) returns up to 600 entries of recent client IPs from ntpd. Because NTP uses UDP, an attacker can spoof the source IP (victim's IP) and send a tiny monlist request (~40 bytes) to hundreds of open NTP servers. Each server responds with up to 600 entries (~48,000 bytes) to the victim. The amplification factor is up to 1,200x. A single 100 Mbps attacker with spoofed UDP can generate 120 Gbps at the victim. CVE-2013-5211 documented this; the 2014 CloudFlare and GitHub DDoS attacks used NTP amplification. Mitigations: (1) disable monlist in ntpd with "disable monitor" in ntp.conf, (2) upgrade ntpd to 4.2.7p26+ which disables it by default, (3) BCP38 ingress filtering at ISPs prevents IP spoofing, (4) rate-limit UDP/123 at border firewalls, (5) block external access to your NTP servers unless you intentionally run a public server.
      </IQ>

      <IQ q="How does chrony differ from ntpd architecturally, and why is chrony better for VM environments?" level="senior">
        Architecturally, chrony uses a reference-time model: it maintains a best estimate of the true time and uses a Kalman filter-like algorithm that can incorporate multiple sources with different weights and convergence rates. ntpd uses a more rigid Phase-Locked Loop with specific phase and frequency correction steps that assume a mostly-stable clock. In VM environments, the hypervisor can steal CPU, pause the VM for migration (vMotion), or snapshot and restore — all causing sudden large clock discontinuities. ntpd's PLL assumes gradual drift and reacts poorly to sudden jumps — it may panic, take hours to resynchronize, or oscillate. chrony's makestep directive allows a one-time step correction on startup and its algorithm handles sudden frequency changes better. chrony also has a faster initial convergence (seconds vs ntpd's 15-30 minutes) because it uses maximum likelihood estimation for the initial offset rather than the conservative 8-sample shift register approach.
      </IQ>

      <IQ q="Describe NTS (Network Time Security) and how it differs from symmetric key authentication in NTPv4." level="senior">
        NTPv4 with symmetric key authentication (ntp.keys) uses pre-shared 128-bit MD5 or SHA-1 keys configured manually on both client and server. It prevents packet tampering but requires manual key distribution and rotation — operationally difficult at scale. There is no perfect forward secrecy. NTS (RFC 8915, 2020) uses a TLS 1.3 handshake on TCP port 4460 (NTS-KE: Key Exchange) to negotiate session keys and cookies. The TLS connection is made once; subsequent NTP packets on UDP/123 carry the cookie (encrypted session state) and an AES-SIV authentication tag. This provides: (1) authenticated key exchange without pre-shared secrets, (2) per-packet authentication preventing replay and tampering, (3) the server cannot link packets across sessions (privacy), (4) perfect forward secrecy (TLS 1.3 ECDHE), (5) scalable — server is stateless between TLS handshake and NTP queries. NTS is supported by Cloudflare (time.cloudflare.com) and chrony 4.0+. It is the correct choice for new deployments.
      </IQ>

      <IQ q="Google uses TrueTime in Spanner. What is TrueTime and why can't Google just use NTP?" level="phd">
        TrueTime is Google's globally distributed time API that returns a time interval [earliest, latest] rather than a point estimate. TrueTime.Now() returns a bounded uncertainty range — typically ε ≈ 7 ms globally — guaranteed to contain the true UTC time. It is backed by GPS receivers and atomic clocks in each Spanner zone, with Marzullo's algorithm applied across multiple reference sources. Google cannot use NTP for external consistency because NTP provides only a point estimate with unknown uncertainty. For Spanner's external consistency guarantee (serializable reads across globally distributed replicas without a central coordinator), Spanner needs to know that if transaction T1 commits before T2 starts, then T1's commit timestamp is provably less than T2's. With only NTP, you cannot prove this — the uncertainty in NTP timestamps is unknown. TrueTime allows Spanner to "commit-wait": after computing a commit timestamp ts, Spanner waits until TrueTime.After(ts) is true (i.e., the entire uncertainty interval has passed) before acknowledging the commit. This guarantees external consistency at the cost of ~14 ms additional commit latency (2ε). The paper "Spanner: Google's Globally Distributed Database" (OSDI 2012) describes this in detail.
      </IQ>

      <IQ q="Explain how PTP (IEEE 1588) achieves sub-microsecond accuracy where NTP cannot, and describe the role of Boundary Clocks and Transparent Clocks." level="phd">
        NTP's accuracy floor (~10 µs with hardware timestamping) is set by kernel processing jitter — even with hardware timestamping on the NIC, the interrupt latency, kernel scheduler, and memory bus contention introduce noise. PTP overcomes this with three mechanisms: (1) Hardware timestamping: PTP packets are stamped at the MAC layer in the NIC, eliminating all OS jitter. Timestamps are taken at the exact symbol boundary crossing on the wire. (2) Boundary Clock (BC): In a standard Ethernet network, each switch adds queuing delay to PTP packets — variable, typically 1–100 µs, depending on traffic. A Boundary Clock is a PTP-aware switch that terminates the PTP master-slave relationship, measures the exact delay through the switch, and re-originates PTP sync messages to downstream slaves with corrected timestamps. This removes switch queuing jitter from the slave's calculations. (3) Transparent Clock (TC): Rather than terminating PTP, a TC switch measures the exact transit time of each PTP packet through the switch and adds this to the packet's "correction field." Downstream slaves subtract this field from their delay calculations, leaving only wire propagation delay. With end-to-end TCs, all switch-introduced latency is measured and corrected, allowing sub-100 ns accuracy. The combined architecture — GPS Grandmaster → BC switches → TC switches → PTP-hardware-timestamping slaves — achieves &lt;10 ns in controlled lab environments and &lt;50 ns in well-engineered production networks (as required by ITU-T G.8275.1 telecom profile).
      </IQ>

      <HR />

      {/* ── PART 09: Key Terminology ── */}
      <Part n="09" title="Key Terminology" />
      <Term t="NTP epoch">January 1, 1900, 00:00:00 UTC. NTP timestamps count seconds from this point. Unix epoch is 1970 — subtract 2,208,988,800 to convert.</Term>
      <Term t="Stratum">Clock hierarchy level. 0 = hardware reference (GPS/atomic), 1 = directly connected, 16 = unsynchronized. Each hop adds one stratum.</Term>
      <Term t="Clock offset (θ)">The difference between the local clock and the reference time. Calculated as ((T2−T1)+(T3−T4))/2 from the four NTP timestamps.</Term>
      <Term t="Round-trip delay (δ)">Total network latency for an NTP exchange: (T4−T1)−(T3−T2). Used to weight offset samples — lower delay = more accurate measurement.</Term>
      <Term t="Slewing">Gradually adjusting clock rate (up to 500 ppm) rather than stepping, to avoid monotonic clock discontinuities.</Term>
      <Term t="Stepping">An instant clock correction for offsets too large to slew. Only applies to CLOCK_REALTIME; CLOCK_MONOTONIC is unaffected.</Term>
      <Term t="Falseticker">An NTP server providing incorrect time. Detected by the intersection algorithm when its confidence interval doesn't overlap the majority.</Term>
      <Term t="Root delay">Accumulated round-trip delay from a server to its Stratum 1 reference. Contributes to synchronization distance.</Term>
      <Term t="Root dispersion">Accumulated uncertainty from a server to its Stratum 1 reference. Combined with root delay gives synchronization distance.</Term>
      <Term t="Clock filter">NTP's 8-sample shift register for each server. Selects the best sample (lowest delay) for the selection algorithm.</Term>
      <Term t="Poll interval">How often the NTP client queries a server. Log₂ seconds: poll 6 = 64s, poll 10 = 1024s (~17 min). Adapts based on clock stability.</Term>
      <Term t="chrony">Modern NTP daemon. Faster convergence, VM-aware, hardware timestamping support. Default on RHEL 7+, Ubuntu 20.04+.</Term>
      <Term t="NTS">Network Time Security (RFC 8915). TLS-authenticated NTP. Prevents time injection attacks. Supported by Cloudflare NTP and chrony 4.0+.</Term>
      <Term t="PTP / IEEE 1588">Precision Time Protocol. Hardware-timestamped, switch-aware. Sub-microsecond accuracy. Used in HFT, 5G, industrial control.</Term>
      <Term t="Leap second">An extra second inserted into UTC (as 23:59:60) to keep UTC within 0.9s of UT1 (Earth rotation). IERS announces them. NTP's LI bits signal upcoming insertions.</Term>
      <Term t="TrueTime">Google's bounded-uncertainty time API. Returns [earliest, latest] interval instead of a point. Used in Spanner for external consistency without a central coordinator.</Term>

      <KeyTakeaways items={[
        'NTP is foundational: TLS certificates, Kerberos (5-minute window), TOTP, distributed databases, and log forensics all depend on synchronized clocks.',
        'The four NTP timestamps (T1–T4) yield offset θ = ((T2−T1)+(T3−T4))/2 and delay δ = (T4−T1)−(T3−T2). The formula assumes symmetric network paths.',
        'NTP slews the clock (≤500 ppm) rather than jumping it to avoid breaking monotonic time, mutex timeouts, and log ordering.',
        'Configure 3+ NTP servers — the intersection (falseticker detection) algorithm requires a majority to identify a rogue or failed server.',
        'Use chrony (not ntpd) on modern Linux and all VMs: faster convergence, better drift handling, hardware timestamp support.',
        'AWS 169.254.169.123 is Stratum 1, link-local, sub-millisecond latency — always use it on EC2 instead of external NTP.',
        'NTP amplification (CVE-2013-5211, monlist command): up to 1,200x amplification. Disable monitor in ntpd; block UDP/123 externally.',
        'NTS (RFC 8915) adds TLS authentication to NTP, preventing time injection attacks. Use time.cloudflare.com with nts option in chrony.',
        'PTP (IEEE 1588) achieves sub-microsecond accuracy via hardware NIC timestamping + Boundary/Transparent Clock switches. Required for HFT, 5G, and Spanner-class distributed systems.',
        'Google TrueTime provides a bounded uncertainty interval [earliest, latest] — the basis of Spanner external consistency via commit-wait.',
      ]} />
    </LearnLayout>
  )
}
