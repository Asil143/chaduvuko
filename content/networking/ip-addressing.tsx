'use client'

import { useState } from 'react'
import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

/* ── design tokens ──────────────────────────────────────────────────── */
const G = '#10b981'
const FONT_MONO = 'var(--font-mono)'
const FONT_DISPLAY = 'var(--font-display)'

/* ── helper components ──────────────────────────────────────────────── */
const Chapter = ({ n, title, subtitle }: { n: string; title: string; subtitle?: string }) => (
  <div style={{ marginBottom: 36 }}>
    <p style={{ fontSize: 11, color: G, fontFamily: FONT_MONO, fontWeight: 700, margin: '0 0 6px', letterSpacing: '.12em' }}>
      {`// CHAPTER ${n}`}
    </p>
    <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 'clamp(22px,3.5vw,34px)', fontWeight: 900, letterSpacing: '-1.5px', color: 'var(--text)', margin: subtitle ? '0 0 8px' : 0 }}>{title}</h2>
    {subtitle && <p style={{ fontSize: 15, color: 'var(--muted)', margin: 0, lineHeight: 1.6 }}>{subtitle}</p>}
  </div>
)

const Divider = () => <div style={{ borderTop: '1px solid var(--border)', margin: '56px 0' }} />

const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.95, margin: '0 0 20px' }}>{children}</p>
)

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', margin: '40px 0 14px', letterSpacing: '-0.5px' }}>{children}</h3>
)

const H3 = ({ children }: { children: React.ReactNode }) => (
  <h4 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', margin: '28px 0 10px' }}>{children}</h4>
)

const Accent = ({ children }: { children: React.ReactNode }) => (
  <strong style={{ color: G, fontWeight: 700 }}>{children}</strong>
)

const Code = ({ children }: { children: React.ReactNode }) => (
  <code style={{ fontSize: 13, background: `${G}18`, color: G, padding: '2px 7px', borderRadius: 5, fontFamily: FONT_MONO }}>{children}</code>
)

const CodeBlock = ({ title, children }: { title?: string; children: React.ReactNode }) => (
  <div style={{ margin: '24px 0', borderRadius: 10, overflow: 'hidden', border: '1px solid #30363d' }}>
    {title && (
      <div style={{ background: '#161b22', padding: '8px 16px', borderBottom: '1px solid #30363d' }}>
        <span style={{ fontSize: 12, color: '#8b949e', fontFamily: FONT_MONO }}>{title}</span>
      </div>
    )}
    <pre style={{ background: '#0d1117', padding: '18px 20px', overflowX: 'auto', fontSize: 13, lineHeight: 1.75, color: '#e6edf3', margin: 0, fontFamily: FONT_MONO }}>
      {children}
    </pre>
  </div>
)

const StoryBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'rgba(59,130,246,0.07)', border: '1px solid rgba(59,130,246,0.25)', borderLeft: '3px solid #3b82f6', borderRadius: 10, padding: '20px 24px', margin: '28px 0' }}>
    <p style={{ fontSize: 11, fontWeight: 700, color: '#3b82f6', fontFamily: FONT_MONO, letterSpacing: '.12em', margin: '0 0 10px' }}>// REAL-WORLD SCENARIO</p>
    <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.9 }}>{children}</div>
  </div>
)

const WowBox = ({ emoji, title, children }: { emoji: string; title: string; children: React.ReactNode }) => (
  <div style={{ background: `${G}0d`, border: `1px solid ${G}30`, borderRadius: 10, padding: '20px 24px', margin: '28px 0' }}>
    <p style={{ fontSize: 11, fontWeight: 700, color: G, fontFamily: FONT_MONO, letterSpacing: '.12em', margin: '0 0 10px' }}>{emoji} {title}</p>
    <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.9 }}>{children}</div>
  </div>
)

const Warn = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 10, padding: '16px 20px', margin: '24px 0' }}>
    <p style={{ fontSize: 12, fontWeight: 700, color: '#f59e0b', fontFamily: FONT_MONO, letterSpacing: '.1em', margin: '0 0 8px' }}>⚠ {title}</p>
    <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.85 }}>{children}</div>
  </div>
)

const Err = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 10, padding: '16px 20px', margin: '24px 0' }}>
    <p style={{ fontSize: 12, fontWeight: 700, color: '#ef4444', fontFamily: FONT_MONO, letterSpacing: '.1em', margin: '0 0 8px' }}>✗ Common Mistake — {title}</p>
    <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.85 }}>{children}</div>
  </div>
)

const LEVEL_COLORS: Record<string, string> = {
  Beginner: '#10b981', Intermediate: '#3b82f6', Senior: '#8b5cf6', PhD: '#f97316',
}

const IQ = ({ q, level, children }: { q: string; level: 'Beginner' | 'Intermediate' | 'Senior' | 'PhD'; children: React.ReactNode }) => (
  <div style={{ marginBottom: 32 }}>
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 0 }}>
      <span style={{ fontSize: 10, fontWeight: 700, color: '#fff', background: LEVEL_COLORS[level], padding: '3px 10px', borderRadius: 20, letterSpacing: '.06em', whiteSpace: 'nowrap', marginTop: 3, flexShrink: 0 }}>{level}</span>
      <div style={{ background: `${LEVEL_COLORS[level]}12`, border: `1px solid ${LEVEL_COLORS[level]}30`, borderRadius: '0 8px 0 0', padding: '12px 16px', fontSize: 14, fontWeight: 700, color: 'var(--text)', flex: 1 }}>{q}</div>
    </div>
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: 'none', borderRadius: '0 0 8px 8px', padding: '16px 18px', fontSize: 14, color: 'var(--muted)', lineHeight: 1.9 }}>{children}</div>
  </div>
)

/* ── helper functions ───────────────────────────────────────────────── */
function parseIPv4(ip: string): number[] | null {
  const parts = ip.split('.').map(Number)
  if (parts.length !== 4) return null
  if (parts.some(p => isNaN(p) || p < 0 || p > 255)) return null
  return parts
}

function cidrToMask(prefix: number): number[] {
  const mask = ~((1 << (32 - prefix)) - 1) >>> 0
  return [(mask >>> 24) & 0xFF, (mask >>> 16) & 0xFF, (mask >>> 8) & 0xFF, mask & 0xFF]
}

function octetsToNum(o: number[]): number {
  return ((o[0] << 24) | (o[1] << 16) | (o[2] << 8) | o[3]) >>> 0
}

function numToOctets(n: number): number[] {
  return [(n >>> 24) & 0xFF, (n >>> 16) & 0xFF, (n >>> 8) & 0xFF, n & 0xFF]
}

/* ── interactive: IPv4 Address Analyzer ─────────────────────────────── */
function IPv4AddressAnalyzer() {
  const [input, setInput] = useState('192.168.10.50')
  const [prefix, setPrefix] = useState(24)

  const octets = parseIPv4(input)
  const valid = octets !== null

  let networkAddr = '', broadcastAddr = '', firstHost = '', lastHost = ''
  let totalHosts = 0, subnetMask = '', wildcard = ''
  const bits: number[] = []

  if (valid && octets) {
    const mask = cidrToMask(prefix)
    const wcMask = mask.map(b => 255 - b)
    subnetMask = mask.join('.')
    wildcard = wcMask.join('.')
    const ipNum = octetsToNum(octets)
    const maskNum = octetsToNum(mask)
    const netNum = (ipNum & maskNum) >>> 0
    const bcNum = (netNum | (~maskNum >>> 0)) >>> 0
    networkAddr = numToOctets(netNum).join('.')
    broadcastAddr = numToOctets(bcNum).join('.')
    firstHost = numToOctets(netNum + 1).join('.')
    lastHost = numToOctets(bcNum - 1).join('.')
    totalHosts = prefix <= 30 ? Math.max(0, (1 << (32 - prefix)) - 2) : prefix === 31 ? 2 : 1
    for (let i = 0; i < 4; i++) for (let b = 7; b >= 0; b--) bits.push((octets[i] >> b) & 1)
  }

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: G, fontFamily: FONT_MONO, margin: '0 0 4px', letterSpacing: '.1em' }}>IPv4 ADDRESS ANALYZER</p>
      <p style={{ fontSize: 12, color: 'var(--muted)', margin: '0 0 20px' }}>Enter an IPv4 address and prefix length to calculate all subnet parameters.</p>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 20, alignItems: 'flex-end' }}>
        <div>
          <label style={{ fontSize: 12, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>IP Address</label>
          <input value={input} onChange={e => setInput(e.target.value)}
            style={{ background: 'var(--bg)', border: `1px solid ${valid ? 'var(--border)' : '#ef4444'}`, borderRadius: 6, padding: '7px 12px', color: G, fontSize: 14, fontFamily: FONT_MONO, width: 164, outline: 'none' }} />
        </div>
        <div>
          <label style={{ fontSize: 12, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>Prefix /{prefix}</label>
          <input type="range" min={1} max={32} value={prefix} onChange={e => setPrefix(Number(e.target.value))}
            style={{ width: 120 }} />
        </div>
      </div>

      {valid && octets && (
        <>
          <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 8, padding: '14px 16px', marginBottom: 16, fontFamily: FONT_MONO, fontSize: 12 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: 8 }}>
              {bits.map((b, i) => (
                <span key={i} style={{
                  display: 'inline-block', width: 14, height: 20, textAlign: 'center', fontSize: 10, lineHeight: '20px',
                  color: i < prefix ? '#fff' : 'var(--muted)',
                  background: i < prefix ? (b ? G : '#374151') : (b ? '#374151' : 'transparent'),
                  borderRight: (i === 7 || i === 15 || i === 23) ? `2px solid var(--border)` : undefined,
                  borderBottom: i < prefix ? `2px solid ${G}` : `2px solid var(--border)`,
                }}>
                  {b}
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 16, fontSize: 11, marginTop: 6 }}>
              <span style={{ color: G }}>Network bits: {prefix}</span>
              <span style={{ color: 'var(--muted)' }}>Host bits: {32 - prefix}</span>
              <span style={{ color: 'var(--muted)' }}>Total addresses: {prefix <= 30 ? (1 << (32 - prefix)).toLocaleString() : prefix === 31 ? 2 : 1}</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 10 }}>
            {[
              { label: 'Subnet Mask', value: subnetMask, color: '#3b82f6' },
              { label: 'Wildcard Mask', value: wildcard, color: '#8b5cf6' },
              { label: 'Network Address', value: networkAddr, color: G },
              { label: 'Broadcast Address', value: broadcastAddr, color: '#ef4444' },
              { label: 'First Host', value: prefix <= 30 ? firstHost : networkAddr, color: G },
              { label: 'Last Host', value: prefix <= 30 ? lastHost : broadcastAddr, color: G },
              { label: 'Usable Hosts', value: totalHosts.toLocaleString(), color: '#f59e0b' },
            ].map(item => (
              <div key={item.label} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px' }}>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 3 }}>{item.label}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: item.color, fontFamily: FONT_MONO }}>{item.value}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {!valid && (
        <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, padding: 12 }}>
          <p style={{ fontSize: 13, color: '#ef4444', margin: 0, fontFamily: FONT_MONO }}>Invalid IPv4 address — enter a value like 10.0.0.1 or 172.16.5.100</p>
        </div>
      )}
    </div>
  )
}

/* ── interactive: IPv4 Class Explorer ──────────────────────────────── */
const CLASSES = [
  { cls: 'A', range: '1.0.0.0 – 126.255.255.255', firstBits: '0xxxxxxx', defaultPrefix: '/8', privateRange: '10.0.0.0/8', private: '10.0.0.0 – 10.255.255.255', hosts: '16,777,214', color: '#3b82f6', note: 'Leading bit 0. IANA allocated /8s to large organizations (governments, telcos). The Class A private range (10/8) gives 16.7M addresses for large enterprise internals.' },
  { cls: 'B', range: '128.0.0.0 – 191.255.255.255', firstBits: '10xxxxxx', defaultPrefix: '/16', privateRange: '172.16.0.0/12', private: '172.16.0.0 – 172.31.255.255', hosts: '65,534', color: '#8b5cf6', note: 'Leading bits 10. Mid-size organizations. The Class B private range covers 172.16.x.x–172.31.x.x — 16 contiguous /16 networks, ~1M addresses.' },
  { cls: 'C', range: '192.0.0.0 – 223.255.255.255', firstBits: '110xxxxx', defaultPrefix: '/24', privateRange: '192.168.0.0/16', private: '192.168.0.0 – 192.168.255.255', hosts: '254', color: G, note: 'Leading bits 110. Small networks. 192.168.x.x (65,536 addresses) is the most commonly recognized private range — home routers default to 192.168.1.x or 192.168.0.x.' },
  { cls: 'D', range: '224.0.0.0 – 239.255.255.255', firstBits: '1110xxxx', defaultPrefix: 'N/A (multicast)', privateRange: 'N/A', private: '224.0.0.x (link-local), 239.x.x.x (scoped)', hosts: 'N/A', color: '#f59e0b', note: 'Multicast addresses. Not assigned to individual hosts. 224.0.0.5 = OSPF, 224.0.0.9 = RIP, 224.0.0.251 = mDNS (Bonjour), 239.x.x.x = organization-local scope.' },
  { cls: 'E', range: '240.0.0.0 – 255.255.255.255', firstBits: '1111xxxx', defaultPrefix: 'N/A (reserved)', privateRange: 'N/A', private: '255.255.255.255 = limited broadcast', hosts: 'N/A', color: '#6b7280', note: 'Reserved experimental range. Never used in production. 255.255.255.255 (limited broadcast) is the only meaningful address — sent to all hosts on the local subnet, not forwarded by routers.' },
]

function IpClassExplorer() {
  const [selected, setSelected] = useState<string | null>('C')
  const cls = CLASSES.find(c => c.cls === selected)

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: G, fontFamily: FONT_MONO, margin: '0 0 4px', letterSpacing: '.1em' }}>IPv4 ADDRESS CLASSES</p>
      <p style={{ fontSize: 12, color: 'var(--muted)', margin: '0 0 20px' }}>Click a class to see range, default prefix, private ranges, and use cases.</p>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
        {CLASSES.map(c => (
          <div key={c.cls} onClick={() => setSelected(selected === c.cls ? null : c.cls)}
            style={{ padding: '10px 20px', background: selected === c.cls ? c.color : `${c.color}18`, border: `2px solid ${selected === c.cls ? c.color : 'transparent'}`, borderRadius: 8, cursor: 'pointer', transition: 'all .15s' }}>
            <div style={{ fontSize: 16, fontWeight: 900, color: selected === c.cls ? '#fff' : c.color }}>Class {c.cls}</div>
          </div>
        ))}
      </div>

      {cls && (
        <div style={{ background: `${cls.color}0d`, border: `1px solid ${cls.color}30`, borderRadius: 10, padding: 18 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, marginBottom: 14 }}>
            {[
              { label: 'Range', value: cls.range },
              { label: 'First Bits', value: cls.firstBits },
              { label: 'Default Prefix', value: cls.defaultPrefix },
              { label: 'Private Range (RFC 1918)', value: cls.private },
            ].map(item => (
              <div key={item.label}>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 3 }}>{item.label}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: cls.color, fontFamily: FONT_MONO }}>{item.value}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 13, color: 'var(--text)', margin: 0, lineHeight: 1.8 }}>{cls.note}</p>
        </div>
      )}
    </div>
  )
}

/* ── interactive: Special Ranges Reference ──────────────────────────── */
const SPECIAL_RANGES = [
  { range: '0.0.0.0/8', name: 'This network', rfc: 'RFC 1122', use: 'Source address in DHCP Discover (before IP is assigned). 0.0.0.0 means "unspecified". Never routed.' },
  { range: '10.0.0.0/8', name: 'Private — Class A', rfc: 'RFC 1918', use: '16.7 million addresses. Used in large enterprise networks, AWS VPCs, data centers. 10.x.x.x is often the root of a corporate address plan.' },
  { range: '100.64.0.0/10', name: 'Shared Address Space (CGNAT)', rfc: 'RFC 6598', use: 'Carrier-Grade NAT pool. ISPs assign 100.64–100.127 between subscriber CPE and BRAS. Not routed on public internet.' },
  { range: '127.0.0.0/8', name: 'Loopback', rfc: 'RFC 1122', use: '127.0.0.1 = localhost. Traffic stays in host network stack. Never leaves the machine. Used for IPC, service testing, health checks.' },
  { range: '169.254.0.0/16', name: 'Link-local / APIPA', rfc: 'RFC 3927', use: 'Auto-assigned when DHCP fails (Windows/macOS). Not routed beyond local subnet. Seeing 169.254.x.x = DHCP failure diagnostic.' },
  { range: '172.16.0.0/12', name: 'Private — Class B range', rfc: 'RFC 1918', use: '172.16.0.0–172.31.255.255. ~1 million addresses. Common in enterprise private networks. Docker uses 172.17.0.0/16 by default.' },
  { range: '192.168.0.0/16', name: 'Private — Class C range', rfc: 'RFC 1918', use: '65,536 addresses. Home routers default to 192.168.1.x or 192.168.0.x. Most recognized private range globally.' },
  { range: '192.0.2.0/24', name: 'Documentation (TEST-NET-1)', rfc: 'RFC 5737', use: 'Reserved for documentation and examples — like this module. Never appears on real networks. Also 198.51.100.0/24 and 203.0.113.0/24.' },
  { range: '198.18.0.0/15', name: 'Benchmarking', rfc: 'RFC 2544', use: 'Network device performance testing. Never routed on public internet. Used to generate test traffic without affecting real addresses.' },
  { range: '224.0.0.0/4', name: 'Multicast (Class D)', rfc: 'RFC 1112', use: '224.0.0.x = link-local (routing protocols). 232.x.x.x = source-specific multicast. 239.x.x.x = organization scope.' },
  { range: '240.0.0.0/4', name: 'Reserved (Class E)', rfc: 'RFC 1112', use: 'Experimental. Never assigned. Some proposals to reclaim for use, but compatibility issues prevent deployment.' },
  { range: '255.255.255.255/32', name: 'Limited Broadcast', rfc: 'RFC 919', use: 'Broadcast to all hosts on local subnet. Routers never forward this address. Used in DHCP Discover, Wake-on-LAN.' },
]

function SpecialRangesTable() {
  const [selected, setSelected] = useState<string | null>(null)
  const r = SPECIAL_RANGES.find(x => x.range === selected)

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: G, fontFamily: FONT_MONO, margin: '0 0 4px', letterSpacing: '.1em' }}>SPECIAL IPv4 ADDRESS RANGES</p>
      <p style={{ fontSize: 12, color: 'var(--muted)', margin: '0 0 20px' }}>Click any range to see RFC authority and detailed purpose.</p>

      <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border)' }}>
        {SPECIAL_RANGES.map((sr, i) => (
          <div key={sr.range} onClick={() => setSelected(selected === sr.range ? null : sr.range)}
            style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '9px 14px', background: selected === sr.range ? `${G}12` : i % 2 === 0 ? 'var(--bg)' : 'var(--surface)', borderBottom: i < SPECIAL_RANGES.length - 1 ? '1px solid var(--border)' : 'none', cursor: 'pointer', transition: 'all .15s' }}>
            <code style={{ fontSize: 11, fontWeight: 700, color: G, fontFamily: FONT_MONO, minWidth: 152 }}>{sr.range}</code>
            <span style={{ fontSize: 13, color: selected === sr.range ? G : 'var(--text)', fontWeight: selected === sr.range ? 600 : 400, flex: 1 }}>{sr.name}</span>
            <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: FONT_MONO }}>{sr.rfc}</span>
          </div>
        ))}
      </div>

      {r && (
        <div style={{ marginTop: 12, background: `${G}0d`, border: `1px solid ${G}30`, borderRadius: 8, padding: 14 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: G, margin: '0 0 6px', fontFamily: FONT_MONO }}>{r.range} — {r.name} ({r.rfc})</p>
          <p style={{ fontSize: 13, color: 'var(--text)', margin: 0, lineHeight: 1.8 }}>{r.use}</p>
        </div>
      )}
    </div>
  )
}

/* ── main export ────────────────────────────────────────────────────── */
export default function IPAddressingModule() {
  return (
    <LearnLayout
      title="IP Addressing"
      description="The addressing system that routes billions of packets per second across the global internet. From the 32-bit IPv4 design of 1981 through exhaustion crises to the 128-bit IPv6 future — IP addressing is the foundation of all modern networking."
      section="Networking Fundamentals"
      readTime="50 min"
    >

      {/* ──────────────────────────────────────────── CHAPTER 1 */}
      <Chapter n="01" title="Why Every Device Needs an Address" subtitle="Logical identity, location, and the hierarchy that makes the internet possible" />

      <StoryBox>
        In 1973, Vint Cerf and Bob Kahn sat in the Stanford University's computer science building designing what would become TCP/IP. They needed a universal addressing scheme — a way to uniquely identify any computer on any network, anywhere on Earth. They chose 32 bits. "That gives us 4.3 billion addresses," Cerf recalled. "That should be more than enough for any conceivable network." In 1973, fewer than 100 computers existed on ARPANet. By 2011, IANA allocated the final five /8 blocks — simultaneously, in a ceremony in Miami — marking IPv4 address exhaustion. The 32-bit choice had connected 8 billion humans and hundreds of billions of devices, but the math had finally run out.
      </StoryBox>

      <Para>
        Every device that participates in IP communication needs an <Accent>IP address</Accent> — a logical identifier that tells the network both <em>who</em> the device is and <em>where</em> it lives in the topology. This is the key distinction from MAC addresses. A MAC address is a flat, permanent hardware identifier — there is no structural information in a MAC that tells you which city, country, or network a device is on. An IP address is hierarchical by design.
      </Para>

      <Para>
        The hierarchy is the critical insight. An IP address is divided into two parts: the <Accent>network portion</Accent> (which network is the device on?) and the <Accent>host portion</Accent> (which specific device on that network?). Routers use only the network portion to make forwarding decisions — they never need to know about individual hosts, only about reachable networks. This aggregation is what makes routing the entire internet feasible within the memory constraints of real hardware.
      </Para>

      <H2>Layer 3 vs. Layer 2 Addressing</H2>

      <Para>
        MAC addresses operate at Layer 2 (the data link layer, within a single broadcast domain). They are flat — every MAC is globally unique, but there is no geographic or topological information embedded. A router that needed to forward packets using MAC addresses would require an entry for every MAC address on Earth: ~15 billion devices as of 2024, and growing to hundreds of billions with IoT. This is computationally and economically impossible.
      </Para>

      <Para>
        IP addresses operate at Layer 3 (the network layer, across routed boundaries). They are hierarchical — a router with a route for 10.10.10.0/24 covers 254 individual hosts with one table entry. A route for 10.0.0.0/8 covers 16.7 million hosts with one entry. This <Accent>prefix aggregation</Accent> is how the global internet routing table remains manageable.
      </Para>

      <WowBox emoji="🌐" title="The Internet Fits in ~900,000 Routes">
        The entire public internet — connecting 5 billion users through hundreds of thousands of autonomous systems — is represented in BGP routing tables by approximately 900,000 route prefixes as of 2024. Each prefix covers a range of IP addresses, not individual hosts. Without hierarchical addressing and aggregation, the routing table would need billions of host entries, far exceeding the TCAM memory capacity of any router ever built. Hierarchical IP addressing is literally what makes the internet work at scale.
      </WowBox>

      <Para>
        The forwarding lookup happens in TCAM (Ternary Content-Addressable Memory) — specialized hardware that performs longest-prefix-match lookups across all routing table entries simultaneously in nanoseconds. This is how a core internet router can forward tens of millions of packets per second while consulting a ~900,000-entry routing table: the lookup is a parallel hardware operation, not a sequential software search.
      </Para>

      <Divider />

      {/* ──────────────────────────────────────────── CHAPTER 2 */}
      <Chapter n="02" title="IPv4: Structure, Notation, and the 32-Bit Address" subtitle="From 32 binary bits to dotted-decimal and back" />

      <Para>
        An IPv4 address is a 32-bit binary number. Humans don't work well with 32-bit binary strings, so the address is expressed in <Accent>dotted-decimal notation</Accent>: the 32 bits are divided into four groups of 8 bits (octets), and each octet is written as a decimal number from 0 to 255.
      </Para>

      <CodeBlock title="IPv4 dotted-decimal notation">
{`Binary:    11000000 . 10101000 . 00001010 . 00110010
Decimal:      192   .    168   .    10    .    50
                               ↑
               This is 192.168.10.50 — a /24 host address`}
      </CodeBlock>

      <Para>
        Converting a binary octet to decimal is straightforward positional math. Each bit has a positional weight (128, 64, 32, 16, 8, 4, 2, 1). Sum the weights of bits that are 1:
      </Para>

      <CodeBlock title="Octet to decimal conversion">
{`11000000  →  128 + 64 = 192
10101000  →  128 + 32 + 8 = 168
00001010  →  8 + 2 = 10
00110010  →  32 + 16 + 2 = 50`}
      </CodeBlock>

      <Para>
        The reverse — decimal to binary — requires repeated halving or subtraction of powers of 2. For 192: 192 ≥ 128 → bit 7 = 1, remainder 64. 64 ≥ 64 → bit 6 = 1, remainder 0. All remaining bits = 0. Result: 11000000.
      </Para>

      <IPv4AddressAnalyzer />

      <H2>Classful Addressing (Historical Context)</H2>

      <Para>
        The original IPv4 RFC 791 (1981) defined <Accent>classful addressing</Accent> — the address space was divided into fixed classes based on the leading bits of the first octet. This predates CIDR notation and was the only addressing model until 1993.
      </Para>

      <IpClassExplorer />

      <Para>
        Classful addressing was rigid and catastrophically wasteful. A company needing 300 hosts could not get a /23 — that didn't exist in classful. They had to take a Class B (/16, 65,534 hosts), leaving 65,234 addresses permanently wasted in their allocation but unavailable to anyone else. This waste, multiplied across thousands of organizations, consumed the IPv4 address space faster than growth alone would have. CIDR fixed this in 1993.
      </Para>

      <Warn title="Class D and E have no subnet mask or host addresses">
        Class D (224.0.0.0–239.255.255.255) is multicast — addresses are group identifiers, not host addresses. You cannot assign a Class D address to a network interface as a host IP. Class E (240.0.0.0–255.255.255.255) is reserved and experimental. 255.255.255.255 is the limited broadcast address, always sent to the local subnet. Class A/B/C are the only classes with assignable host addresses.
      </Warn>

      <H2>CIDR: Classless Inter-Domain Routing</H2>

      <Para>
        CIDR (RFC 1519, 1993) eliminated fixed class boundaries. Instead of "Class A = /8, Class B = /16, Class C = /24," CIDR allows any prefix length from /0 to /32. A company needing 300 hosts gets a /23 (510 usable hosts) — not a wasteful /16.
      </Para>

      <Para>
        CIDR notation appends the prefix length after a slash: <Code>192.168.1.0/24</Code>. The prefix length specifies how many bits are the network portion. The remaining (32 − prefix) bits are the host portion. A /24 has 8 host bits = 256 addresses, 254 usable. A /22 has 10 host bits = 1,024 addresses, 1,022 usable.
      </Para>

      <Para>
        CIDR also enables <Accent>supernetting (route aggregation)</Accent>: multiple smaller contiguous prefixes can be summarized as a single larger prefix in routing advertisements. An ISP owning 192.168.0.0/24 through 192.168.3.0/24 can advertise one 192.168.0.0/22, saving routing table entries on the internet. This aggregation is why BGP tables have ~900K entries, not tens of millions.
      </Para>

      <CodeBlock title="CIDR prefix length reference">
{`Prefix  Subnet Mask      Total Addr  Usable Hosts  Use Case
/30     255.255.255.252       4             2       Point-to-point links
/29     255.255.255.248       8             6       Small segments
/28     255.255.255.240      16            14       DMZ, firewall zones
/27     255.255.255.224      32            30       Small VLANs
/26     255.255.255.192      64            62       Small office networks
/25     255.255.255.128     128           126       Medium VLANs
/24     255.255.255.0       256           254       Standard VLAN (most common)
/23     255.255.254.0       512           510       Two /24s merged
/22     255.255.252.0      1024          1022       Large server pools
/21     255.255.248.0      2048          2046       Campus segment
/20     255.255.240.0      4096          4094       Large campus
/16     255.255.0.0       65536         65534       Regional office
/8      255.0.0.0      16777216      16777214       Large ISP/cloud`}
      </CodeBlock>

      <Divider />

      {/* ──────────────────────────────────────────── CHAPTER 3 */}
      <Chapter n="03" title="Subnet Masks and Network/Host Decomposition" subtitle="Bitwise AND, network addresses, broadcast, and host ranges" />

      <Para>
        A <Accent>subnet mask</Accent> is a 32-bit value where all network bits are 1 and all host bits are 0. It serves as a bitmask that, when AND'd with an IP address, extracts the network address. The subnet mask is the operational counterpart to CIDR notation: /24 = subnet mask 255.255.255.0.
      </Para>

      <H2>Calculating the Network Address: Bitwise AND</H2>

      <Para>
        Apply bitwise AND between the IP address and subnet mask. For every bit position: the result is 1 only if both IP and mask have a 1; otherwise 0. All host bits become 0 in the result — this is the network address.
      </Para>

      <CodeBlock title="Subnet calculation: 192.168.10.50/24">
{`IP Address:   192.168.10.50   = 11000000.10101000.00001010.00110010
Subnet Mask:  255.255.255.0   = 11111111.11111111.11111111.00000000
                             AND ─────────────────────────────────
Network:      192.168.10.0    = 11000000.10101000.00001010.00000000

Broadcast (all host bits = 1):
              192.168.10.255  = 11000000.10101000.00001010.11111111

First host = network + 1  →  192.168.10.1
Last host  = broadcast - 1 →  192.168.10.254
Usable hosts = 2^8 - 2 = 254`}
      </CodeBlock>

      <H2>The Four Addresses Every Subnet Contains</H2>

      <Para>
        <Accent>Network address:</Accent> All host bits = 0. Identifies the subnet itself. Cannot be assigned to any host. Used in routing table entries (e.g., "route 192.168.10.0/24 via 10.0.0.1").
      </Para>

      <Para>
        <Accent>Broadcast address:</Accent> All host bits = 1. A packet sent to the broadcast address is delivered to every host in the subnet by Layer 2 (Ethernet broadcast). Cannot be assigned to a host. Routers do not forward directed broadcasts by default (CVE against Smurf amplification attacks).
      </Para>

      <Para>
        <Accent>First usable host:</Accent> Network address + 1. Commonly assigned to the default gateway (router) by convention — though this is convention, not a requirement.
      </Para>

      <Para>
        <Accent>Last usable host:</Accent> Broadcast address − 1. The formula: usable hosts = 2^(32−prefix) − 2.
      </Para>

      <H2>Special Prefix Lengths: /31 and /32</H2>

      <Para>
        <Accent>/31 (RFC 3021):</Accent> Contains exactly 2 addresses. Normally neither would be usable (network + broadcast). RFC 3021 explicitly allows /31s for point-to-point links where broadcast is never needed — both addresses are assignable to the two endpoints. This saves the 2 addresses that a /30 (4 total, 2 usable) wastes. Cisco, Juniper, and modern routers support /31 on P2P interfaces.
      </Para>

      <Para>
        <Accent>/32 (host route):</Accent> A single specific IP address with no subnet context. Used for: loopback interfaces (routers assign 32-bit loopbacks for router IDs), policy-based routing for specific hosts, OSPF/BGP router IDs, and very specific routing entries that override broader routes via LPM.
      </Para>

      <H2>Wildcard Masks</H2>

      <Para>
        A <Accent>wildcard mask</Accent> is the bitwise inverse of the subnet mask. Where the subnet mask has 1s (network bits), the wildcard has 0s; where the subnet mask has 0s (host bits), the wildcard has 1s. Wildcards are used in Cisco ACLs and OSPF area statements to match ranges of addresses.
      </Para>

      <CodeBlock title="Wildcard mask examples">
{`/24 subnet mask:   255.255.255.0   → wildcard: 0.0.0.255
/16 subnet mask:   255.255.0.0     → wildcard: 0.0.255.255
/30 subnet mask:   255.255.255.252 → wildcard: 0.0.0.3

OSPF area statement using wildcard:
  network 10.0.0.0 0.255.255.255 area 0   ← matches all 10.x.x.x

Cisco ACL entry (permit host range 10.10.10.0–10.10.10.255):
  access-list 1 permit 10.10.10.0 0.0.0.255`}
      </CodeBlock>

      <Divider />

      {/* ──────────────────────────────────────────── CHAPTER 4 */}
      <Chapter n="04" title="Special and Reserved IPv4 Address Ranges" subtitle="RFC 1918, loopback, link-local, CGNAT, documentation, and multicast" />

      <Para>
        Large portions of the 4.3 billion IPv4 address space are permanently reserved for specific purposes defined by IANA and various RFCs. Using a reserved range for production hosts causes silent, mysterious failures — packets to or from reserved ranges may be dropped by internet routers without notification.
      </Para>

      <SpecialRangesTable />

      <H2>RFC 1918 Private Address Space (The Foundation of NAT)</H2>

      <Para>
        RFC 1918 (1996) defined the three private ranges that can be freely reused by any organization without IANA coordination: <Code>10.0.0.0/8</Code> (16.7M addresses), <Code>172.16.0.0/12</Code> (1.05M addresses across 172.16.x.x–172.31.x.x), and <Code>192.168.0.0/16</Code> (65,536 addresses).
      </Para>

      <Para>
        The fundamental rule: private addresses are <Accent>never routed on the public internet</Accent>. All internet routers drop packets with private source or destination IPs. This means the same private address can simultaneously exist in millions of different private networks — your home 192.168.1.100 and a hospital's 192.168.1.100 are entirely separate devices. NAT translates private-to-public at the internet boundary.
      </Para>

      <WowBox emoji="🏠" title="The Entire World Shares Three Address Ranges">
        Every home network, every enterprise, every cloud provider's internal VPC — all of them share just three RFC 1918 ranges. Your laptop's 192.168.1.100 is the same address as millions of other laptops worldwide. They coexist because NAT isolates them. Docker containers default to 172.17.0.0/16 on every machine globally. AWS VPCs are built from 10.x.x.x space. This reuse is what prevented complete internet collapse when IPv4 ran out in 2011.
      </WowBox>

      <H2>Loopback (127.0.0.0/8)</H2>

      <Para>
        The entire /8 block 127.0.0.0–127.255.255.255 is reserved for loopback. Traffic sent to any address in this range is processed by the local TCP/IP stack and never transmitted on the wire. <Code>127.0.0.1</Code> is the conventional loopback address ("localhost"). Services that should only accept local connections bind to 127.0.0.1 explicitly — a database server bound to 127.0.0.1 is not accessible from the network.
      </Para>

      <Para>
        On Linux, the <Code>lo</Code> interface handles loopback. Packets to 127.0.0.1 travel through the socket layer, are processed by the TCP/IP stack in kernel, and delivered to the destination socket — all without touching any network hardware. Round-trip latency is typically &lt;0.1ms.
      </Para>

      <H2>Link-Local / APIPA (169.254.0.0/16)</H2>

      <Para>
        When a host using DHCP cannot reach a DHCP server after the standard retry period (4 seconds, then escalating backoff), Windows and macOS auto-assign an address from 169.254.0.0/16 — <Accent>APIPA (Automatic Private IP Addressing)</Accent>. The host picks a random address in this range and uses ARP to verify no other host has claimed it. Link-local addresses are not routed beyond the local subnet (no gateway is configured, TTL stays local).
      </Para>

      <Para>
        Diagnostically: seeing a 169.254.x.x address means DHCP failed. Common causes: DHCP server unreachable (wrong VLAN, server down), DHCP scope exhausted (no addresses available), DHCP relay agent not configured (server is on a different subnet with no ip helper-address), or VLAN misconfiguration (device is in the wrong VLAN).
      </Para>

      <H2>Documentation Addresses (RFC 5737)</H2>

      <Para>
        Three /24 blocks are reserved for documentation and examples in textbooks, RFCs, training materials, and tutorials: <Code>192.0.2.0/24</Code> (TEST-NET-1), <Code>198.51.100.0/24</Code> (TEST-NET-2), and <Code>203.0.113.0/24</Code> (TEST-NET-3). These addresses should appear only in documentation — never in production configurations. This module uses them for examples.
      </Para>

      <Divider />

      {/* ──────────────────────────────────────────── CHAPTER 5 */}
      <Chapter n="05" title="IPv4 Exhaustion, IANA, and the RIR System" subtitle="How 4.3 billion addresses ran out — and what extended IPv4's lifetime" />

      <StoryBox>
        In 1992, Vint Cerf published RFC 1287, warning that IPv4 addresses would be exhausted "within 12 years." On February 3, 2011, at a ceremony in Miami, IANA Administrator Rod Beckstrom signed the last allocation paperwork. The final five /8 blocks (approximately 80 million addresses) were simultaneously issued to the five Regional Internet Registries (RIRs). APNIC, serving Asia-Pacific, exhausted its free pool in April 2011. RIPE NCC (Europe/Middle East) followed in September 2012. ARIN (North America) reached exhaustion in September 2015. LACNIC in June 2014. AFRINIC still had reserves into the 2020s. The internet did not collapse — NAT, CIDR, and secondary markets stretched the IPv4 supply far beyond what the 2011 event implied.
      </StoryBox>

      <H2>The IANA → RIR → ISP Hierarchy</H2>

      <Para>
        IP address allocation follows a three-tier hierarchy. <Accent>IANA (Internet Assigned Numbers Authority)</Accent>, managed by ICANN, maintains the master IP address registry. IANA allocates large blocks (/8s historically) to five Regional Internet Registries:
      </Para>

      <CodeBlock title="RIR regions and approximate coverage">
{`ARIN    — North America (US, Canada, Caribbean)
RIPE NCC — Europe, Middle East, Central Asia
APNIC   — Asia-Pacific (China, Japan, Australia, India, SE Asia)
LACNIC  — Latin America and Caribbean
AFRINIC — Africa

Allocation path:
IANA → RIR (allocates to ISPs) → ISP (allocates to customers) → You`}
      </CodeBlock>

      <Para>
        After IANA exhaustion, RIRs continue to operate <Accent>waiting list policies</Accent> for new allocations from returned or recovered space. Organizations also return unused blocks — a company that received a /8 in the 1980s might return it to IANA/RIR if their growth never required that many addresses.
      </Para>

      <H2>IPv4 Address Markets</H2>

      <Para>
        IPv4 addresses have become a tradable commodity. RIRs facilitate or permit transfers of address blocks between organizations. As of 2024 market prices: a /24 (256 addresses) trades for approximately $15,000–$25,000 USD; a /16 (65,536 addresses) is worth roughly $1–2 million. Large legacy holders (MIT held 18.0.0.0/8; Stanford held 36.0.0.0/8) have sold portions of these historic /8 allocations, injecting millions of addresses back into the pool.
      </Para>

      <H2>Carrier-Grade NAT (CGNAT, RFC 6598)</H2>

      <Para>
        To avoid assigning a public IP to every customer, ISPs deploy <Accent>CGNAT (Carrier-Grade NAT)</Accent>. The ISP assigns each customer a private address from 100.64.0.0/10 (the RFC 6598 shared address space) and performs NAT at the ISP's border router. Multiple customers share one public IP.
      </Para>

      <Para>
        CGNAT creates two layers of NAT: the customer's home router does NAT from 192.168.x.x to 100.64.x.x (ISP private), then the ISP's CGNAT device does NAT from 100.64.x.x to the public IP. This double-NAT breaks many applications:
      </Para>

      <CodeBlock title="CGNAT impact">
{`Broken by CGNAT:
  ✗ Port forwarding (gaming servers, self-hosted services)
  ✗ Peer-to-peer without STUN/TURN relay (VoIP, gaming, WebRTC)
  ✗ Inbound VPN connections (IPsec/OpenVPN server at home)
  ✗ Some VPN protocols (require NAT-T UDP 4500 workaround)
  ✗ Abuse tracking (one public IP → thousands of users → requires per-second logs)

Works despite CGNAT:
  ✓ HTTP/HTTPS browsing
  ✓ Streaming video
  ✓ Email
  ✓ VPN clients connecting outbound to a VPN server`}
      </CodeBlock>

      <Divider />

      {/* ──────────────────────────────────────────── CHAPTER 6 */}
      <Chapter n="06" title="IPv4 Packet Header Deep Dive" subtitle="Every field, its purpose, and why some were eliminated in IPv6" />

      <Para>
        Every IP packet begins with a minimum 20-byte header. Network engineers, security analysts, and performance tuners need to understand every field — not just source and destination IP. The header controls routing, fragmentation, QoS, and transport protocol selection.
      </Para>

      <CodeBlock title="IPv4 header (RFC 791) — 32-bit words">
{` 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|Version|  IHL  |   DSCP    |ECN|          Total Length         |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|         Identification        |Flags|      Fragment Offset    |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|  Time to Live |    Protocol   |         Header Checksum       |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                       Source Address                          |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    Destination Address                        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    Options (if IHL > 5)                       |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+`}
      </CodeBlock>

      <H2>Field-by-Field Analysis</H2>

      <Para>
        <Accent>Version (4 bits):</Accent> Always 4 for IPv4, always 6 for IPv6. The first thing a network device checks. IPv4 and IPv6 packets can coexist on the same wire (dual-stack) — this field distinguishes them.
      </Para>

      <Para>
        <Accent>IHL — Internet Header Length (4 bits):</Accent> Header length in 32-bit words. Minimum 5 (= 20 bytes, no options). Maximum 15 (= 60 bytes, with 40 bytes of options). If IHL &gt; 5, the router must parse and potentially act on options — a performance cost. Most modern traffic has IHL = 5.
      </Para>

      <Para>
        <Accent>DSCP — Differentiated Services Code Point (6 bits):</Accent> Previously the "Type of Service" (ToS) field. DSCP marks packets for QoS treatment — routers and switches use DSCP to classify traffic into priority queues. Critical DSCP values: EF (Expedited Forwarding, DSCP 46 / 0x2E) for voice/delay-sensitive traffic; AF41 (DSCP 34) for video conferencing; CS0 (DSCP 0) for best-effort/default. Reclassified at trust boundaries — only devices the administrator trusts (VoIP phones, internal servers) have their DSCP preserved.
      </Para>

      <Para>
        <Accent>ECN — Explicit Congestion Notification (2 bits):</Accent> Allows routers to signal congestion to endpoints without dropping packets (RFC 3168). An ECN-capable transport (ECT) sets bits 01 or 10. A congested router sets bits 11 (CE — Congestion Experienced). The receiving endpoint signals the sender (via TCP ECE flag) to reduce its sending rate. ECN is TCP's congestion signal without the "slow down by dropping" pain — important for latency-sensitive applications and modern QoS systems (CoDel/FQ-CoDel use ECN marking).
      </Para>

      <Para>
        <Accent>Total Length (16 bits):</Accent> Total IP packet size in bytes, including header and payload. Maximum: 65,535 bytes. Practical maximum over Ethernet: 1,500 bytes (MTU). Larger packets require fragmentation or jumbo frames.
      </Para>

      <Para>
        <Accent>Identification (16 bits):</Accent> Unique ID for the original packet. All fragments of the same packet share the same Identification value — the reassembly engine uses this to group fragments back together. Each new packet gets a different Identification (typically a counter or random value).
      </Para>

      <Para>
        <Accent>Flags (3 bits):</Accent> Bit 0 = reserved (always 0). Bit 1 = <Accent>DF (Don't Fragment)</Accent> — if set and the packet exceeds the next-hop MTU, the router drops the packet and sends ICMP "Fragmentation Needed" (type 3, code 4) back to the source. This is essential for PMTU Discovery (RFC 1191). Bit 2 = <Accent>MF (More Fragments)</Accent> — set on all fragments except the last.
      </Para>

      <Para>
        <Accent>Fragment Offset (13 bits):</Accent> Position of this fragment's data within the original unfragmented packet, in 8-byte units. The first fragment has offset 0. Maximum offset: 8191 × 8 = 65,528 bytes.
      </Para>

      <Para>
        <Accent>TTL — Time to Live (8 bits):</Accent> Hop counter. Each router decrements TTL by 1 before forwarding. When TTL reaches 0, the router drops the packet and sends ICMP Type 11 (Time Exceeded) to the source. Prevents routing loops from trapping packets forever. Default TTL values: Linux/macOS = 64, Windows = 128, Cisco routers = 255. <Code>traceroute</Code> exploits TTL by sending packets with TTL=1,2,3,… to map each hop — each TTL-expired router sends its IP in the ICMP response.
      </Para>

      <Para>
        <Accent>Protocol (8 bits):</Accent> Identifies the Layer 4 (or direct IP) protocol in the payload. Key values: 1 = ICMP, 6 = TCP, 17 = UDP, 41 = IPv6-in-IPv4 (6in4 tunnels), 47 = GRE, 50 = ESP (IPsec), 51 = AH (IPsec), 89 = OSPF (sent directly over IP, not UDP/TCP), 112 = VRRP.
      </Para>

      <Para>
        <Accent>Header Checksum (16 bits):</Accent> One's complement checksum of the IP header only (not payload). The checksum is recomputed at every hop because the TTL changes (and options might change). This per-hop recomputation was identified as unnecessary overhead — Layer 2 (Ethernet FCS) and Layer 4 (TCP/UDP checksums) already protect data integrity end-to-end. IPv6 eliminated the header checksum entirely.
      </Para>

      <H2>IPv4 Fragmentation and PMTU Discovery</H2>

      <Para>
        When a router receives a packet larger than the next-hop MTU and the DF bit is not set, it fragments the packet into smaller pieces. Each fragment gets the same Identification, different offsets, and MF bit set (except the last fragment). The destination host reassembles the fragments using Identification + offset.
      </Para>

      <Para>
        Fragmentation is harmful to performance: it creates CPU overhead at the fragmenting router and the reassembling host, fragments can arrive out of order causing reassembly buffer pressure, and if any fragment is lost, the entire original packet must be retransmitted. Modern networks use <Accent>PMTU Discovery (RFC 1191)</Accent>: hosts set DF=1 and rely on ICMP "Fragmentation Needed" responses from routers to learn the path's minimum MTU, then segment their data accordingly. TCP MSS negotiation handles this at the transport layer.
      </Para>

      <Warn title="PMTU Discovery blackholes">
        Some firewalls block all ICMP, including "Fragmentation Needed" (type 3/code 4). When PMTU Discovery is blocked, the host sets DF=1, sends packets too large for the path, they get dropped silently, and TCP connections establish (the 3-way handshake uses small packets) but then hang when sending large data. This is called an ICMP black hole or PMTU black hole. Fix: configure the firewall to allow ICMP type 3/code 4 specifically; or use TCP MSS clamping on the router.
      </Warn>

      <Divider />

      {/* ──────────────────────────────────────────── CHAPTER 7 */}
      <Chapter n="07" title="Public vs. Private IP Addresses" subtitle="Routable vs. RFC 1918, NAT, PAT, and the end-to-end principle" />

      <H2>Public IP Addresses</H2>

      <Para>
        A <Accent>public IP address</Accent> is globally unique and routable on the public internet. It is allocated by an RIR and registered in IANA's global database (WHOIS). Every internet router has a route to every public IP prefix — any packet with a public destination can theoretically be delivered anywhere on Earth.
      </Para>

      <H2>NAT: Address Translation at the Network Boundary</H2>

      <Para>
        <Accent>NAT (Network Address Translation)</Accent> translates IP addresses at the boundary between a private network and the public internet. When a host with private IP 192.168.1.50 sends a packet to the internet, the NAT device (home router, enterprise firewall) replaces the source IP with the public IP. When the reply arrives, NAT replaces the destination IP (public) with the original private IP and forwards it internally.
      </Para>

      <Para>
        Simple NAT (one-to-one) maps one private IP to one public IP. Rare — wastes public addresses. More common: <Accent>PAT (Port Address Translation)</Accent>, also called NAPT — the NAT device distinguishes multiple simultaneous sessions from different private hosts by also mapping unique source port numbers. One public IP can support ~65,000 simultaneous sessions (the port space) from potentially thousands of private hosts.
      </Para>

      <CodeBlock title="NAT/PAT state table">
{`Private IP:Port        →  Public IP:Port       Protocol  State
192.168.1.50:54321     →  203.0.113.1:54321    TCP       ESTABLISHED
192.168.1.51:12345     →  203.0.113.1:12346    TCP       ESTABLISHED
192.168.1.52:8080      →  203.0.113.1:8081     TCP       TIME_WAIT
192.168.1.50:5353      →  203.0.113.1:15000    UDP       —

Inbound reply (from internet):
  Dst 203.0.113.1:12346 → translated to → 192.168.1.51:12345
  Dst 203.0.113.1:54321 → translated to → 192.168.1.50:54321`}
      </CodeBlock>

      <H2>NAT Breaks the End-to-End Principle</H2>

      <Para>
        The internet's original design principle (RFC 1958) was end-to-end: any host can communicate directly with any other host without intermediary state. NAT violates this: a host behind NAT cannot receive unsolicited inbound connections unless an explicit port forwarding rule exists on the NAT device. There is no NAT state entry to match an inbound packet from an unknown external host.
      </Para>

      <Para>
        Applications requiring inbound connections (hosting a web server, running a game server, accepting peer-to-peer connections) require explicit <Accent>port forwarding</Accent> configuration on the NAT device. Modern applications use <Accent>NAT traversal techniques</Accent> to establish peer-to-peer connections despite NAT: STUN (Session Traversal Utilities for NAT) to discover the external IP/port; TURN (Traversal Using Relays around NAT) to relay traffic through a server when STUN fails; ICE (Interactive Connectivity Establishment) to try multiple traversal paths simultaneously. WebRTC (browser video/audio) uses ICE+STUN+TURN to establish peer connections through NAT.
      </Para>

      <H2>Static NAT vs. Dynamic NAT vs. PAT</H2>

      <Para>
        <Accent>Static NAT:</Accent> One private IP permanently maps to one public IP. All traffic to the public IP is forwarded to the private IP. Used for internal servers that must be reachable from the internet (web server, VPN gateway). Requires one public IP per server.
      </Para>

      <Para>
        <Accent>Dynamic NAT:</Accent> A pool of public IPs is shared among private hosts. When a host initiates outbound traffic, it is assigned an available public IP from the pool. When the session ends, the public IP returns to the pool. Limited by pool size — if more concurrent sessions than pool IPs, new connections fail.
      </Para>

      <Para>
        <Accent>PAT (Port Address Translation):</Accent> Overloads one public IP using port numbers to distinguish sessions. The standard mode for home routers and most enterprise NAT. Provides ~65,000 port slots per public IP — effectively unlimited for most practical use.
      </Para>

      <Divider />

      {/* ──────────────────────────────────────────── CHAPTER 8 */}
      <Chapter n="08" title="Unicast, Broadcast, Multicast, and Anycast" subtitle="The four delivery modes of IPv4 — and when to use each" />

      <H2>Unicast</H2>

      <Para>
        <Accent>Unicast</Accent> identifies a single interface. A packet sent to a unicast address is delivered to exactly one destination. Every host-to-host TCP connection, every DNS query to a specific server, every HTTP request — all unicast. This is the default and most common addressing mode in IPv4.
      </Para>

      <H2>Broadcast</H2>

      <Para>
        IPv4 has two broadcast types. <Accent>Limited broadcast</Accent> (255.255.255.255) is sent to all hosts on the local subnet — routers never forward it. Used by DHCP Discover (client doesn't know the DHCP server's IP yet), and Wake-on-LAN. <Accent>Directed broadcast</Accent> targets all hosts on a specific remote subnet: the network address with all host bits set to 1 (e.g., the directed broadcast for 192.168.1.0/24 is 192.168.1.255). Routers by default do not forward directed broadcasts (RFC 2644) — they were exploited in the Smurf DDoS amplification attack of the late 1990s where a spoofed source IP could trigger thousands of hosts to send ICMP replies to the victim.
      </Para>

      <H2>Multicast</H2>

      <Para>
        <Accent>Multicast</Accent> (224.0.0.0/4, Class D) delivers one packet to a subscribed group of receivers simultaneously. This is far more efficient than unicast for one-to-many delivery: a 1 Gbps video stream multicast to 1,000 receivers uses 1 Gbps of network bandwidth regardless of group size. The same stream via unicast would require 1 Tbps.
      </Para>

      <Para>
        <Accent>IGMP (Internet Group Management Protocol)</Accent> manages multicast group membership at the host level — hosts send IGMP Join/Leave messages to subscribe to or unsubscribe from multicast groups. Switches use IGMP snooping to avoid flooding multicast to all ports. <Accent>PIM (Protocol Independent Multicast)</Accent> handles multicast routing between routers — PIM-SM (Sparse Mode) for wide-area multicast, PIM-DM (Dense Mode) for local multicast.
      </Para>

      <CodeBlock title="Common multicast group addresses">
{`224.0.0.1    — All hosts on local subnet (not routed)
224.0.0.2    — All routers on local subnet
224.0.0.5    — OSPF all routers
224.0.0.6    — OSPF DR/BDR
224.0.0.9    — RIPv2 routers
224.0.0.10   — EIGRP routers
224.0.0.18   — VRRP (Virtual Router Redundancy Protocol)
224.0.0.251  — mDNS (Multicast DNS, used by Bonjour/Avahi)
224.0.0.252  — LLMNR (Link-Local Multicast Name Resolution, Windows)
239.x.x.x    — Organization-local scope (admin-controlled, not routed beyond org)`}
      </CodeBlock>

      <H2>Anycast</H2>

      <Para>
        <Accent>Anycast</Accent> assigns the same IP address to multiple nodes in geographically distributed locations. Routers receive route advertisements for the same prefix from multiple locations. BGP's shortest-path selection naturally routes packets to the topologically nearest instance. If that instance fails, BGP reconverges and the next-nearest instance handles traffic.
      </Para>

      <Para>
        Anycast is the technology behind global DNS infrastructure and CDNs. Cloudflare's 1.1.1.1 DNS resolver runs on servers in 300+ cities worldwide — all announcing the same IP via BGP. A DNS query from Tokyo reaches a Tokyo server; from London, a London server. Anycast is not explicitly "configured" in IPv4 — it emerges from BGP's normal behavior when multiple locations announce the same prefix.
      </Para>

      <WowBox emoji="🌍" title="DNS Root Servers Run on 13 Anycast Addresses">
        The global DNS root server system consists of 13 logical servers (labeled a.root-servers.net through m.root-servers.net, addresses 198.41.0.4 through 192.228.79.201). In physical reality, hundreds of servers in cities worldwide each operate under these 13 anycast addresses. In 2024, the root server infrastructure comprises over 1,600 physical instances globally, all reachable via 13 IP addresses through anycast. A DNS resolver in Singapore and one in Chicago both query "a root server" but actually reach different physical machines.
      </WowBox>

      <Divider />

      {/* ──────────────────────────────────────────── CHAPTER 9 */}
      <Chapter n="09" title="Static vs. Dynamic IP Assignment" subtitle="Manual configuration, DHCP, DORA handshake, and DHCP reservations" />

      <H2>Static IP Configuration</H2>

      <Para>
        A statically assigned IP is manually configured and does not change unless an administrator changes it. Required parameters: IP address, subnet mask, default gateway, DNS server(s). Static IPs are used for: servers (DNS A records point to static IPs — a changing server IP breaks DNS), network infrastructure (routers, managed switches, APs have predictable management IPs), printers, IP phones, and any device that other systems need to reach at a consistent address.
      </Para>

      <Para>
        Risk: IP address conflicts. If two devices are manually assigned the same IP, both will observe conflicting ARP replies and enter an error state. Linux prints kernel warning "ARPHRD: 2 conflict detected" and usually keeps the IP. Windows shows a notification and may disable the adapter. The original holder and the conflict both experience intermittent connectivity. Prevention: use IPAM tools to track all static assignments.
      </Para>

      <H2>DHCP: The DORA Process</H2>

      <Para>
        <Accent>DHCP (Dynamic Host Configuration Protocol)</Accent> automates IP assignment. The four-step negotiation is called DORA:
      </Para>

      <CodeBlock title="DHCP DORA handshake">
{`1. DISCOVER — client broadcasts (src: 0.0.0.0, dst: 255.255.255.255, UDP src:68 dst:67)
   "I need an IP address — anyone out there?"
   Client sends its MAC address and a transaction ID.

2. OFFER — server unicasts or broadcasts (src: server IP, dst: 255.255.255.255)
   "I offer you 192.168.1.100 with /24, gateway 192.168.1.1, lease 86400s"
   Server tentatively holds this IP for this client.

3. REQUEST — client broadcasts (dst: 255.255.255.255)
   "I accept the offer from server 192.168.1.1, requesting 192.168.1.100"
   Broadcast so ALL DHCP servers know which offer was accepted.

4. ACK — server unicasts or broadcasts
   "Confirmed — 192.168.1.100 is yours for 86400 seconds"
   Client configures its interface. DNS servers, NTP, and other options included.`}
      </CodeBlock>

      <Para>
        Why does the Request broadcast (step 3) go to all servers, not just the one that made the Offer? Multiple DHCP servers may have sent Offers. The broadcast informs all servers which one was chosen — servers that were not chosen release their tentative offer back to their available pool.
      </Para>

      <H2>DHCP Lease Renewal</H2>

      <Para>
        DHCP leases are time-limited. At <Accent>T1 (50% of lease duration)</Accent>, the client sends a unicast DHCP Request to its original server, asking to renew. If no response, at <Accent>T2 (87.5% of lease duration)</Accent>, the client broadcasts a DHCP Request to any available server. If the lease expires with no renewal, the IP is released and the client must restart the DORA process from scratch.
      </Para>

      <CodeBlock title="DHCP lease renewal timeline (86400s = 24h lease)">
{`T=0       Client receives lease, configures 192.168.1.100/24
T=43200s  T1 (50%): unicast renewal attempt to original server
T=75600s  T2 (87.5%): broadcast renewal to any server
T=86400s  Lease expires: client loses IP, must DORA again`}
      </CodeBlock>

      <H2>DHCP Options (Beyond Just an IP)</H2>

      <Para>
        DHCP delivers much more than just an IP address. Option 3 = default gateway. Option 6 = DNS server IPs. Option 15 = domain name (appended to unqualified hostnames for resolution). Option 43 = vendor-specific information (used by VoIP phones to locate provisioning server). Option 66 = TFTP server (for PXE boot and network booting). Option 150 = TFTP server IP for Cisco IP phones. Option 121 (classless static routes) = additional routes beyond the default gateway. Enterprise DHCP servers deliver network-specific configurations to different client types using these options.
      </Para>

      <H2>DHCP Reservations vs. Static Addresses</H2>

      <Para>
        A <Accent>DHCP reservation</Accent> (static DHCP binding) assigns a specific IP to a device based on its MAC address. The device still uses DHCP — it sends DORA, but the server always offers the same reserved IP. Benefits: the device IP is predictable (for DNS records, firewall rules, IPAM tracking) without manually configuring the device itself. Best practice for printers, IP cameras, APs, VoIP phones, and any infrastructure device that needs a consistent address.
      </Para>

      <Divider />

      {/* ──────────────────────────────────────────── CHAPTER 10 */}
      <Chapter n="10" title="IP Address Planning and IPAM" subtitle="Hierarchical allocation, subnet sizing, and managing thousands of addresses" />

      <StoryBox>
        A Series-B startup begins with a /24 for the office. Year 2: new office, grab another /24. Year 3: cloud workloads need internal connectivity, take 10.10.0.0/24. Year 4: branch offices, grab whatever subnets seem free. Year 5: they hire their first dedicated network engineer. She opens the network documentation — a shared spreadsheet last updated 18 months ago — and finds 47 disconnected /24s spread across three RFC 1918 ranges, no consistent subnet scheme, overlapping DHCP scopes in two locations, a VPN failing because both sites use 192.168.1.0/24, and three IP conflicts per week. Restructuring costs three months of work and a maintenance window affecting all 400 employees. Good addressing design from the beginning costs one afternoon.
      </StoryBox>

      <H2>Hierarchical Allocation Principles</H2>

      <Para>
        Assign a large block at the organizational root and carve subnets downward. Example: start with 10.0.0.0/8 for the entire organization. Assign each geographic site a /16: Site-NY = 10.1.0.0/16, Site-LA = 10.2.0.0/16, Cloud = 10.10.0.0/16. Within each site, assign functional VLANs from the site's /16: servers = .1.0/24, workstations = .2.0/23, management = .3.0/28, VoIP = .4.0/24. This hierarchy enables route summarization at every level — Site-NY is summarized as 10.1.0.0/16 in the WAN routing table, hiding 256 potential /24s behind one route entry.
      </Para>

      <CodeBlock title="Enterprise address plan example">
{`Organization: 10.0.0.0/8
  Site: NY       10.1.0.0/16
    VLAN 10 — Servers:    10.1.1.0/24   (254 hosts)
    VLAN 20 — Users:      10.1.2.0/23   (510 hosts)
    VLAN 30 — VoIP:       10.1.4.0/24   (254 hosts)
    VLAN 40 — Mgmt:       10.1.5.0/27   (30 hosts — switches/APs)
    VLAN 50 — DMZ:        10.1.6.0/28   (14 hosts — public-facing servers)
    P2P links:            10.1.255.0/24  (carved into /30s or /31s for router links)

  Site: LA       10.2.0.0/16
    (same structure, different second octet)

  Cloud VPC:     10.10.0.0/16
    AWS us-east-1:  10.10.1.0/24
    AWS us-west-2:  10.10.2.0/24`}
      </CodeBlock>

      <H2>Subnet Sizing Guidelines</H2>

      <Para>
        Size subnets for expected maximum population plus 30% growth headroom. Never create subnets that are already 80%+ utilized at deployment — DHCP scope exhaustion causes outages. Standard sizing by role:
      </Para>

      <CodeBlock title="Subnet sizing by function">
{`Point-to-point router links:   /30 or /31  (2 addresses)
Loopback interfaces:           /32          (1 address)
Firewall DMZ segments:         /28          (14 hosts)
Management VLAN (infra only):  /26 or /27   (62 or 30 hosts)
Small server VLAN:             /24          (254 hosts)
Medium server VLAN:            /23          (510 hosts)
Standard user VLAN (office):   /23 or /22   (510–1022 hosts)
Large user VLAN (campus):      /22 or /21   (1022–2046 hosts)
Cloud VPC subnet:              /24          (254 hosts, standard for cloud)`}
      </CodeBlock>

      <H2>IPAM: IP Address Management</H2>

      <Para>
        Beyond ~50 subnets, managing IP allocations in a spreadsheet is a liability. <Accent>IPAM (IP Address Management)</Accent> tools provide: a visual tree of your address space showing allocations and free space; DHCP scope management integrated with physical DHCP servers (ISC DHCP, Windows DHCP, Infoblox); DNS record management integrated with IP assignments; conflict detection and automatic alerting; utilization trending (when will a subnet fill up?); change history and audit trail. Open-source: phpIPAM, Netbox (also manages rack diagrams, cabling, and device inventory). Enterprise: Infoblox, BlueCat, SolarWinds IPAM.
      </Para>

      <Divider />

      {/* ──────────────────────────────────────────── CHAPTER 11 */}
      <Chapter n="11" title="Longest Prefix Match and IP Routing" subtitle="How routers use IP addresses to forward packets — the heart of the internet" />

      <Para>
        IP addressing and routing are inseparable — the hierarchical structure of IP addresses exists specifically to make routing efficient. Every IPv4 forwarding decision is a lookup: given the destination IP, which routing table entry is the best match?
      </Para>

      <H2>Longest Prefix Match (LPM)</H2>

      <Para>
        When a router's routing table has multiple entries that all match a destination IP, it selects the entry with the <Accent>longest (most specific) prefix</Accent>. A /32 beats a /24 beats a /16 beats a /0. This is LPM (Longest Prefix Match).
      </Para>

      <CodeBlock title="LPM example">
{`Routing table:
  0.0.0.0/0    → via 10.0.0.1  (default route — matches everything)
  10.0.0.0/8   → via 10.0.0.1  (matches 10.x.x.x)
  10.10.0.0/16 → via 10.0.0.2  (matches 10.10.x.x)
  10.10.10.0/24 → via 10.0.0.3  (matches 10.10.10.x)
  10.10.10.50/32 → via 10.0.0.4  (matches only 10.10.10.50)

Packet to 10.10.10.50:  matches /0, /8, /16, /24, /32 → uses /32 (→ 10.0.0.4)
Packet to 10.10.10.99:  matches /0, /8, /16, /24       → uses /24 (→ 10.0.0.3)
Packet to 10.10.200.1:  matches /0, /8, /16            → uses /16 (→ 10.0.0.2)
Packet to 10.20.0.1:    matches /0, /8                 → uses /8  (→ 10.0.0.1)
Packet to 8.8.8.8:      matches /0 only               → uses /0  (→ 10.0.0.1)`}
      </CodeBlock>

      <Para>
        The default route (0.0.0.0/0) is the "route of last resort" — it matches everything but is always the lowest-priority match because it has the shortest prefix. An explicit route always wins over the default.
      </Para>

      <H2>TCAM: How LPM Happens in Hardware</H2>

      <Para>
        Modern router ASICs perform LPM using <Accent>TCAM (Ternary Content-Addressable Memory)</Accent>. Unlike regular RAM (read a specific address → get a value) or CAM (provide content → get address), TCAM allows each memory cell to store 0, 1, or X (don't care). A /24 route stored in TCAM has 24 specific bits followed by 8 don't-cares. A /0 default route is all don't-cares. Hardware queries all TCAM entries simultaneously by broadcasting the destination IP to every entry — a massively parallel comparison that produces the matching entry with the longest prefix in nanoseconds, regardless of table size.
      </Para>

      <H2>Route Summarization and Address Planning</H2>

      <Para>
        Route summarization reduces the routing table by advertising one aggregate prefix instead of many specific ones. If Site-NY has subnets 10.1.1.0/24 through 10.1.254.0/24, the WAN edge router can advertise just 10.1.0.0/16 to other sites and the internet — 254 internal routes become 1. Downstream routers never learn about internal topology.
      </Para>

      <Para>
        Summarization breaks when address space is non-contiguous. If Site-NY also has 10.5.100.0/24 (outside the 10.1.0.0/16 block), that subnet cannot be summarized with the others and requires a separate routing entry. This is why disorganized addressing plans with random subnet assignments prevent effective aggregation — and bloat routing tables.
      </Para>

      <Divider />

      {/* ──────────────────────────────────────────── CHAPTER 12 */}
      <Chapter n="12" title="Troubleshooting IP Addressing Issues" subtitle="Diagnostic tools, systematic approach, and common failure modes" />

      <CodeBlock title="Essential IP diagnostic commands">
{`# Linux — interface addresses and prefixes
ip addr show
ip addr show eth0          # specific interface
ip -4 addr show            # IPv4 only

# Linux — routing table
ip route show
ip route get 8.8.8.8       # which interface/next-hop for a specific IP

# macOS
ifconfig en0
netstat -rn                # routing table
route get 8.8.8.8

# Windows
ipconfig /all              # all interfaces, DHCP info, DNS, MAC
route print                # routing table
arp -a                     # ARP cache (IP→MAC mappings)

# Connectivity tests
ping 192.168.1.1           # ICMP echo to gateway (Layer 3 reachability)
ping -c 4 8.8.8.8          # to internet
traceroute 8.8.8.8         # path trace (exploits TTL)
tracert 8.8.8.8            # Windows

# DNS
nslookup google.com        # simple DNS lookup
dig google.com A           # detailed DNS query
dig @8.8.8.8 google.com   # query specific DNS server

# ARP
arp -n                     # neighbor table
arping -I eth0 192.168.1.1 # send ARP probes (detect IP conflicts)

# DHCP
sudo dhclient -v eth0      # verbose DHCP request (shows DORA)
sudo dhclient -r eth0      # release current lease`}
      </CodeBlock>

      <H2>Systematic Troubleshooting Flow</H2>

      <Para>
        Start at Layer 3 and work outward. Check if the device has a valid IP (not 169.254.x.x). Verify the subnet mask is correct (wrong mask = wrong "local" determination). Verify the default gateway is configured and on the same subnet. Ping the gateway (LAN reachability). Ping a known internet IP (8.8.8.8) to test routing. Ping by hostname (google.com) to test DNS. Each step isolates a specific potential failure.
      </Para>

      <H2>Common IP Addressing Failure Modes</H2>

      <Para>
        <Accent>IP address conflict:</Accent> Two devices have the same IP. Symptoms: intermittent connectivity, ARP instability, "duplicate IP address" messages in OS logs. Diagnosis: <Code>arping -I eth0 192.168.x.x</Code> sends ARP probes — if you see two different MAC addresses respond, there is a conflict. Check both static assignments and DHCP scope for duplicate entries.
      </Para>

      <Para>
        <Accent>Wrong subnet mask:</Accent> A device with 192.168.1.50 and mask /23 (255.255.254.0) considers both 192.168.0.x and 192.168.1.x as local. If the network uses /24, the device will ARP for hosts that aren't on the local segment, fail to route through the gateway for them, and experience failures. Diagnosis: compare the subnet mask with other devices on the same segment.
      </Para>

      <Para>
        <Accent>Wrong or missing default gateway:</Accent> The device can reach hosts on its own subnet (Layer 2 via MAC) but fails to reach any other subnet or the internet. The "default gateway not configured" or wrong gateway error is immediately visible with <Code>ip route show</Code> — there should be a 0.0.0.0/0 route.
      </Para>

      <Para>
        <Accent>APIPA (169.254.x.x):</Accent> DHCP acquisition failed. Escalation checklist: Is the DHCP server running? (<Code>systemctl status dhcpd</Code> or check Windows DHCP service.) Is the DHCP scope exhausted? (check DHCP server lease count vs. pool size.) Is the device in the correct VLAN? (wrong VLAN = wrong DHCP scope.) Is a DHCP relay agent configured? (devices on different subnets from the DHCP server need <Code>ip helper-address</Code> on the gateway router.) Is there a rogue DHCP server? (<Code>tcpdump -i eth0 port 67 or port 68</Code> to observe DHCP traffic.)
      </Para>

      <Para>
        <Accent>Asymmetric routing:</Accent> Packets take different paths inbound vs. outbound. A stateful firewall that sees only one direction drops the connection. Common in multihomed networks with multiple ISPs. Diagnosis: <Code>traceroute</Code> from each side to identify asymmetry; fix with policy routing or asymmetric routing exceptions on the firewall.
      </Para>

      <Divider />

      {/* ──────────────────────────────────────────── CHAPTER 13 */}
      <Chapter n="13" title="Common Misconceptions" subtitle="IP addressing errors that cost engineers hours of troubleshooting" />

      <Err title="IP addresses are permanent like MAC addresses">
        IP addresses are logical and can change at any time — DHCP lease expiry, reconfiguration, failover. MAC addresses are burned into hardware (though software-spoofable). Never assume an IP address identifies the same device over time without explicit static assignment or DHCP reservation. This is why DNS exists: names abstract IP addresses so services remain reachable even when IPs change. Use hostnames in application configs, not hardcoded IPs.
      </Err>

      <Err title="NAT is a security mechanism">
        NAT is address translation, not security. It incidentally prevents unsolicited inbound connections (because no state entry exists), but it provides no protection against outbound threats. Malware on internal hosts connects outbound freely through NAT — no inspection, no filtering. A firewall provides actual security through stateful packet inspection, application-layer inspection, and ACLs. "I have a NAT router so I'm protected" is a dangerous misconception. You need a firewall. Many home routers combine NAT + basic stateful firewall, but they are separate functions.
      </Err>

      <Err title="Private IPs cannot be routed at all">
        Private IPs (RFC 1918) cannot be routed on the public internet — border routers drop them. But within private networks — enterprise WANs, VPNs, MPLS networks, cloud provider internals — private IPs are routed normally. An MPLS WAN carries 10.x.x.x traffic between 20 office sites. IPsec tunnels carry private-to-private traffic over public links. AWS VPCs route 10.x.x.x internally. The restriction is specifically "public internet routing," not routing in general.
      </Err>

      <Err title="The broadcast address wastes two IP addresses unnecessarily">
        The network and broadcast addresses are not "wasted" due to poor design — they are structurally necessary. The network address identifies the subnet in routing tables. The broadcast address enables Layer 2 broadcast semantics (ARP, DHCP, OSPF hello packets). Neither can be assigned to hosts because they have semantic meaning for the subnet infrastructure. RFC 3021 /31s eliminate this for point-to-point links specifically where no broadcast is needed — but this is a special case optimization, not evidence that the addresses were wasted in normal subnets.
      </Err>

      <Err title="127.0.0.1 and localhost are always identical">
        localhost is a hostname that resolves to a loopback address via /etc/hosts or DNS. On most systems it resolves to 127.0.0.1 (IPv4) — but on modern dual-stack systems, <Code>getaddrinfo("localhost")</Code> may return ::1 (IPv6 loopback) first. If a service binds only to 127.0.0.1 but your application resolves "localhost" to ::1, the connection fails even though the service is running. This causes mysterious connection-refused errors. Fix: bind services to both 127.0.0.1 and ::1, or use 0.0.0.0 (all IPv4 interfaces). In /etc/hosts, verify localhost resolves to both 127.0.0.1 and ::1.
      </Err>

      <Err title="Classful address ranges still matter in modern networking">
        Classful addressing was deprecated by CIDR in 1993 — over 30 years ago. Modern routing (BGP, OSPF, EIGRP) is entirely classless. There are no "Class A routes" or "Class B routes" — only prefixes with lengths. The terms Class A/B/C survive in context only for: describing historical RIR allocations ("MIT's Class A"), describing the private ranges defined in RFC 1918 (which were coincidentally structured around classful boundaries), and explaining APIPA (which assigns 169.254.0.0/16, a "Class B range"). Never use classful notation for network design or route analysis.
      </Err>

      <Divider />

      {/* ──────────────────────────────────────────── CHAPTER 14 */}
      <Chapter n="14" title="Interview Questions" subtitle="Beginner through PhD — what to actually know for networking interviews" />

      <IQ q="What is an IP address and how does it differ from a MAC address?" level="Beginner">
        An IP address is a logical, hierarchical Layer 3 identifier assigned to a network interface. IPv4 addresses are 32 bits written in dotted-decimal (e.g., 192.168.1.1). The hierarchy encodes location: the network portion tells routers which network the device is on; the host portion identifies the specific device within that network. A MAC address is a 48-bit hardware identifier burned into the network interface — flat (no topology information), globally unique, and used for Layer 2 forwarding within a single broadcast domain. Key differences: MAC addresses are hardware-permanent and flat; IP addresses are logical, hierarchical, and can be dynamically assigned (DHCP) or changed by configuration. Switches use MAC addresses to forward within a network; routers use IP addresses to forward between networks.
      </IQ>

      <IQ q="Given 10.10.10.100/22, calculate the network, broadcast, and usable host range." level="Beginner">
        /22 means 22 network bits, 10 host bits. Subnet mask: 255.255.252.0 (binary: 11111111.11111111.11111100.00000000). 10.10.10.100 in binary: 00001010.00001010.00001010.01100100. AND with mask: 00001010.00001010.00001000.00000000 = 10.10.8.0 (network address). Broadcast: set all host bits to 1 = 10.10.11.255. First host: 10.10.8.1. Last host: 10.10.11.254. Usable hosts: 2^10 − 2 = 1,022. Note: the /22 boundary is on the third octet at bit positions divisible by the block size — the block size for /22 is 4 in the third octet (256/64 = 4), so the /22 boundaries are .0.0, .4.0, .8.0, .12.0 … etc in the third octet. 10.10.10.x falls in the 10.10.8.0 block.
      </IQ>

      <IQ q="What is CIDR and why was it introduced? What problems does it solve that classful addressing could not?" level="Intermediate">
        CIDR (Classless Inter-Domain Routing, RFC 1519, 1993) replaced the rigid classful system where only /8 (Class A), /16 (Class B), and /24 (Class C) were valid prefix lengths. The problems CIDR solved: (1) Address waste — a company needing 300 hosts was allocated a Class B (/16, 65,534 hosts), wasting 65,234 addresses. CIDR allows /23 allocation (510 hosts) — precise sizing. (2) Route table explosion — before CIDR, every Class C network was a separate routing entry. An ISP with 256 Class C networks had 256 BGP routes. With CIDR, the ISP aggregates them into one /16 announcement — 256 routes become 1. This is critical: internet BGP tables were growing toward millions of entries; CIDR reduced them to ~900K prefixes. CIDR uses slash notation (192.168.0.0/22) and allows any prefix 0–32.
      </IQ>

      <IQ q="Explain longest prefix match. Why does it matter, and how is it implemented in hardware?" level="Intermediate">
        When a router's routing table has multiple entries matching a destination IP, it selects the most specific one — the entry with the longest prefix (most bits specified). A /32 host route beats a /24 network route beats a /16 summary beats the /0 default. Example: table has 10.0.0.0/8, 10.10.0.0/16, 10.10.10.0/24. Packet to 10.10.10.50 → /24 wins. Packet to 10.10.99.1 → /16 wins. Packet to 10.100.0.1 → /8 wins. Packet to 8.8.8.8 → no match except 0.0.0.0/0 default. LPM matters because it allows specific overrides (policy routing, host routes) without affecting general traffic. Hardware implementation: TCAM (Ternary Content-Addressable Memory). Each cell stores 0/1/X (don't care). A /24 has 24 specific bits + 8 don't-cares. The router broadcasts the destination IP to all TCAM entries simultaneously — a massively parallel hardware comparison returning the longest match in nanoseconds. This is why core routers can lookup 900K routing entries in the time it takes to forward a packet.
      </IQ>

      <IQ q="Walk through every scenario where NAT breaks applications, and explain NAT traversal techniques." level="Senior">
        NAT breaks the internet's end-to-end principle by creating asymmetric reachability: internal hosts can initiate outbound connections, but external hosts cannot initiate inbound connections (no state entry). Specific breakage: (1) Server hosting — a web server on 192.168.1.10:80 requires explicit port forwarding on the NAT device to map public IP:80 → 192.168.1.10:80. Without this rule, inbound HTTP connections have nowhere to go. (2) Peer-to-peer — both peers are behind NAT; neither can directly reach the other's private IP. VoIP, gaming, WebRTC, BitTorrent all require NAT traversal. (3) Protocols embedding IP in payload — FTP active mode embeds the data connection IP:port in the ASCII PORT command; NAT cannot translate this without an ALG (Application Layer Gateway). SIP (VoIP signaling) embeds IP addresses in SDP bodies. (4) IPsec — ESP protocol has no port fields; NAT cannot distinguish multiple ESP flows by port. Fix: NAT-T (NAT Traversal, RFC 3948) encapsulates ESP in UDP port 4500, giving NAT a port to track. NAT traversal techniques: STUN (Session Traversal Utilities for NAT, RFC 5389) — a client queries a STUN server on the internet to learn its external IP:port mapping (NAT binding). TURN (Traversal Using Relays around NAT) — a relay server forwards packets when direct peer-to-peer is impossible (symmetric NAT). ICE (Interactive Connectivity Establishment) — tries all possible connection methods (direct, STUN, TURN) simultaneously and uses the first that works. WebRTC mandates ICE.
      </IQ>

      <IQ q="Describe the full IPv4 exhaustion problem: root cause, timeline, technical mitigation, policy response, and what IPv6 adoption looks like in 2024." level="PhD">
        Root cause: IPv4's 32-bit address space (4.3 billion addresses) was designed in 1981 for a network of hundreds of computers. The internet's growth to billions of devices, each needing at least one IP, made exhaustion mathematically inevitable — the question was only timing. Timeline: IANA free pool exhausted February 3, 2011 (last 5 /8s allocated simultaneously to RIRs). APNIC (Asia-Pacific) exhausted in April 2011, driving aggressive IPv6 adoption in the region. RIPE NCC (Europe) exhausted September 2012. ARIN (North America) exhausted September 2015. LACNIC June 2014. AFRINIC retained reserves into the early 2020s but reached exhaustion policies by 2021. Technical mitigation: (1) CIDR (1993) — variable-length prefixes eliminated classful waste, extending the address supply significantly. (2) RFC 1918 + NAT — private addresses allow unbounded internal devices to share a single public IP. This is the primary reason IPv4 survived 13 years post-IPv6 standardization — NAT effectively multiplied IPv4 capacity by 1-3 orders of magnitude. (3) CGNAT (RFC 6598) — ISPs place NAT at the carrier level, sharing one public IP among hundreds of subscribers. Breaks peer-to-peer applications. (4) IPv4 transfer markets — ARIN/RIPE facilitate address block transfers. A /8 (16M addresses) is worth hundreds of millions; organizations sell legacy allocations. Policy response: RIRs implement waiting lists, transfer policies, 3-month maximum allocations for new entrants. IPv6 transition: standardized 1998 (RFC 2460), finalized 2017 (RFC 8200). 2024 status: ~50% of Google traffic is IPv6 globally; ~45% of US internet traffic is IPv6 (per ARIN statistics); major cloud providers (AWS, GCP, Azure) support IPv6 natively. Transition mechanisms: dual-stack (run both simultaneously — the production standard), 6rd (IPv6 rapid deployment over ISP IPv4 infrastructure), DS-Lite (ISPs provide IPv6 directly, tunnel IPv4 over IPv6). Pure IPv6-only networks remain rare due to IPv4-only legacy content and services. The transition is measured in decades — IPv4 will coexist with IPv6 until legacy applications and devices are replaced.
      </IQ>

      <KeyTakeaways items={[
        'IPv4 addresses are 32 bits in dotted-decimal notation — the hierarchy of network + host portions enables routing aggregation, keeping the global routing table at ~900K entries instead of billions.',
        'CIDR replaced classful addressing in 1993, allowing any prefix length /0–/32. A /24 has 8 host bits (254 usable hosts); bitwise AND with the subnet mask gives the network address.',
        'RFC 1918 private ranges (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) are never routed on the public internet — NAT translates private-to-public at the boundary.',
        'The IPv4 header carries TTL (decremented each hop, prevents loops), Protocol (1=ICMP, 6=TCP, 17=UDP, 89=OSPF), DSCP (QoS markings), and fragmentation fields.',
        'NAT is address translation, not security — it enables private-address hosts to share public IPs but breaks end-to-end connectivity and requires STUN/TURN/ICE for peer-to-peer.',
        'DHCP delivers IPs via the DORA process (Discover→Offer→Request→Acknowledge). DHCP reservations bind a specific IP to a MAC address for predictable addressing without manual config.',
        'Longest Prefix Match (LPM): a router always uses the most specific matching route — a /32 host route overrides a /24 network route overrides the /0 default. Implemented in TCAM hardware.',
        'Seeing 169.254.x.x (APIPA) means DHCP failed — check DHCP server availability, scope exhaustion, VLAN assignment, and relay agent configuration.',
        'CGNAT (RFC 6598, 100.64.0.0/10) is the ISP-level NAT extending IPv4 lifetime — it breaks port forwarding, P2P applications, and inbound server hosting.',
        'IANA exhausted IPv4 in February 2011; IPv6 (128-bit, 2^128 addresses) is the long-term solution — ~50% of Google traffic is IPv6 as of 2024, but full IPv4 sunset is decades away.',
      ]} />
    </LearnLayout>
  )
}
