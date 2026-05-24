'use client'

import { useState } from 'react'
import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

/* ── helper components ─────────────────────────────────────────────── */
const G = '#10b981'

const Chapter = ({ n, title }: { n: number; title: string }) => (
  <div style={{ marginBottom: 32 }}>
    <p style={{ fontSize: 11, color: G, fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 6px', letterSpacing: '.12em', textTransform: 'uppercase' }}>
      Chapter {String(n).padStart(2, '0')}
    </p>
    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px,3.5vw,34px)', fontWeight: 900, letterSpacing: '-1.5px', color: 'var(--text)', margin: 0 }}>{title}</h2>
  </div>
)

const Divider = () => <div style={{ borderTop: '1px solid var(--border)', margin: '56px 0' }} />

const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.95, margin: '0 0 20px' }}>{children}</p>
)

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', margin: '36px 0 14px', letterSpacing: '-0.5px' }}>{children}</h3>
)

const H3 = ({ children }: { children: React.ReactNode }) => (
  <h4 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', margin: '28px 0 10px' }}>{children}</h4>
)

const Accent = ({ children }: { children: React.ReactNode }) => (
  <strong style={{ color: G, fontWeight: 700 }}>{children}</strong>
)

const Code = ({ children }: { children: React.ReactNode }) => (
  <code style={{ fontSize: 13, background: `${G}15`, color: G, padding: '2px 7px', borderRadius: 5, fontFamily: 'var(--font-mono)' }}>{children}</code>
)

const CodeBlock = ({ children }: { children: React.ReactNode }) => (
  <pre style={{ background: '#0a0a0a', border: '1px solid #1f2937', borderRadius: 10, padding: '18px 20px', overflowX: 'auto', fontSize: 13, lineHeight: 1.75, color: '#e5e7eb', margin: '20px 0', fontFamily: 'var(--font-mono)' }}>
    {children}
  </pre>
)

const StoryBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'linear-gradient(135deg,#0f2027,#203a43,#2c5364)', border: `1px solid ${G}30`, borderRadius: 12, padding: '20px 24px', margin: '28px 0', position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', top: 12, right: 16, fontSize: 22, opacity: 0.18 }}>📖</div>
    <p style={{ fontSize: 11, fontWeight: 700, color: G, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.12em', margin: '0 0 10px' }}>Story</p>
    <div style={{ fontSize: 14, color: '#d1fae5', lineHeight: 1.9 }}>{children}</div>
  </div>
)

const WowBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'linear-gradient(135deg,#1c1917,#292524)', border: '1px solid #f59e0b30', borderRadius: 12, padding: '20px 24px', margin: '28px 0', position: 'relative' }}>
    <div style={{ position: 'absolute', top: 12, right: 16, fontSize: 22, opacity: 0.25 }}>⚡</div>
    <p style={{ fontSize: 11, fontWeight: 700, color: '#f59e0b', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.12em', margin: '0 0 10px' }}>Wow Factor</p>
    <div style={{ fontSize: 14, color: '#fef3c7', lineHeight: 1.9 }}>{children}</div>
  </div>
)

const Warn = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ background: '#f59e0b08', border: '1px solid #f59e0b35', borderRadius: 10, padding: '16px 20px', margin: '24px 0' }}>
    <p style={{ fontSize: 11, fontWeight: 700, color: '#f59e0b', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 8px' }}>Caution — {title}</p>
    <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.85 }}>{children}</div>
  </div>
)

const Err = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ background: '#ef444408', border: '1px solid #ef444430', borderRadius: 10, padding: '16px 20px', margin: '24px 0' }}>
    <p style={{ fontSize: 11, fontWeight: 700, color: '#ef4444', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 8px' }}>Misconception — {title}</p>
    <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.85 }}>{children}</div>
  </div>
)

const LEVEL_COLORS: Record<string, string> = {
  Beginner: '#10b981',
  Intermediate: '#3b82f6',
  Senior: '#8b5cf6',
  PhD: '#f97316',
}

const IQ = ({ q, level, children }: { q: string; level: 'Beginner' | 'Intermediate' | 'Senior' | 'PhD'; children: React.ReactNode }) => (
  <div style={{ marginBottom: 32 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 0 }}>
      <span style={{ fontSize: 10, fontWeight: 700, color: '#000', background: LEVEL_COLORS[level], padding: '2px 9px', borderRadius: 20, letterSpacing: '.06em', textTransform: 'uppercase', flexShrink: 0 }}>{level}</span>
      <div style={{ background: `${LEVEL_COLORS[level]}12`, border: `1px solid ${LEVEL_COLORS[level]}30`, borderRadius: '0 8px 0 0', padding: '12px 16px', fontSize: 14, fontWeight: 700, color: 'var(--text)', flex: 1 }}>Q: {q}</div>
    </div>
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: 'none', borderRadius: '0 0 8px 8px', padding: '16px 18px', fontSize: 14, color: 'var(--text)', lineHeight: 1.9 }}>{children}</div>
  </div>
)

/* ── helper functions ──────────────────────────────────────────────── */
function parseIPv4(ip: string): number[] | null {
  const parts = ip.split('.').map(Number)
  if (parts.length !== 4) return null
  if (parts.some(p => isNaN(p) || p < 0 || p > 255)) return null
  return parts
}

function cidrToSubnetMask(prefix: number): number[] {
  const mask = ~((1 << (32 - prefix)) - 1) >>> 0
  return [(mask >>> 24) & 0xFF, (mask >>> 16) & 0xFF, (mask >>> 8) & 0xFF, mask & 0xFF]
}

function octetsToNum(octets: number[]): number {
  return ((octets[0] << 24) | (octets[1] << 16) | (octets[2] << 8) | octets[3]) >>> 0
}

function numToOctets(n: number): number[] {
  return [(n >>> 24) & 0xFF, (n >>> 16) & 0xFF, (n >>> 8) & 0xFF, n & 0xFF]
}

/* ── interactive components ────────────────────────────────────────── */

function IPv4AddressAnalyzer() {
  const [input, setInput] = useState('192.168.10.50')
  const [prefix, setPrefix] = useState(24)

  const octets = parseIPv4(input)
  const valid = octets !== null

  let networkAddr = ''
  let broadcastAddr = ''
  let firstHost = ''
  let lastHost = ''
  let totalHosts = 0
  let subnetMask = ''
  let bits: number[] = []
  let networkBits: number[] = []
  let hostBits: number[] = []

  if (valid && octets) {
    const mask = cidrToSubnetMask(prefix)
    subnetMask = mask.join('.')
    const ipNum = octetsToNum(octets)
    const maskNum = octetsToNum(mask)
    const netNum = (ipNum & maskNum) >>> 0
    const bcNum = (netNum | (~maskNum >>> 0)) >>> 0
    networkAddr = numToOctets(netNum).join('.')
    broadcastAddr = numToOctets(bcNum).join('.')
    firstHost = numToOctets(netNum + 1).join('.')
    lastHost = numToOctets(bcNum - 1).join('.')
    totalHosts = Math.max(0, (1 << (32 - prefix)) - 2)

    for (let i = 0; i < 4; i++) {
      for (let b = 7; b >= 0; b--) {
        bits.push((octets[i] >> b) & 1)
      }
    }
    networkBits = bits.slice(0, prefix)
    hostBits = bits.slice(prefix)
  }

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: G, fontFamily: 'var(--font-mono)', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '.1em' }}>Interactive — IPv4 Address Analyzer</p>
      <p style={{ fontSize: 12, color: 'var(--muted)', margin: '0 0 20px' }}>Enter an IPv4 address and prefix to analyze network, broadcast, and host ranges.</p>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 20, alignItems: 'flex-end' }}>
        <div>
          <label style={{ fontSize: 12, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>IP Address</label>
          <input value={input} onChange={e => setInput(e.target.value)}
            style={{ background: 'var(--bg)', border: `1px solid ${valid ? 'var(--border)' : '#ef4444'}`, borderRadius: 6, padding: '7px 12px', color: G, fontSize: 14, fontFamily: 'var(--font-mono)', width: 160 }} />
        </div>
        <div>
          <label style={{ fontSize: 12, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>Prefix /{prefix}</label>
          <input type="range" min={1} max={30} value={prefix} onChange={e => setPrefix(Number(e.target.value))}
            style={{ width: 120 }} />
        </div>
      </div>

      {valid && (
        <>
          <div style={{ background: '#0a0a0a', borderRadius: 8, padding: '14px 16px', marginBottom: 16, fontFamily: 'var(--font-mono)', fontSize: 12 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 0, marginBottom: 8 }}>
              {bits.map((b, i) => (
                <span key={i} style={{
                  display: 'inline-block', width: 14, height: 18, textAlign: 'center', fontSize: 11, lineHeight: '18px',
                  color: i < prefix ? '#fff' : '#6b7280',
                  background: i < prefix ? (b ? G : '#374151') : (b ? '#374151' : '#0a0a0a'),
                  borderRight: (i === 7 || i === 15 || i === 23) ? '2px solid #4b5563' : 'none',
                  borderBottom: i < prefix ? `2px solid ${G}` : '2px solid #374151',
                }}>
                  {b}
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 16, fontSize: 11 }}>
              <span style={{ color: G }}>Network bits: {prefix}</span>
              <span style={{ color: '#6b7280' }}>Host bits: {32 - prefix}</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10 }}>
            {[
              { label: 'Subnet Mask', value: subnetMask, color: '#3b82f6' },
              { label: 'Network Address', value: networkAddr, color: G },
              { label: 'Broadcast Address', value: broadcastAddr, color: '#ef4444' },
              { label: 'First Host', value: firstHost, color: G },
              { label: 'Last Host', value: lastHost, color: G },
              { label: 'Usable Hosts', value: totalHosts.toLocaleString(), color: '#f59e0b' },
            ].map(item => (
              <div key={item.label} style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px' }}>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 2 }}>{item.label}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: item.color, fontFamily: 'var(--font-mono)' }}>{item.value}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {!valid && (
        <div style={{ background: '#ef444410', border: '1px solid #ef444430', borderRadius: 8, padding: 12 }}>
          <p style={{ fontSize: 13, color: '#ef4444', margin: 0 }}>Invalid IPv4 address. Enter a valid address like 192.168.1.1</p>
        </div>
      )}
    </div>
  )
}

const CLASSES = [
  { cls: 'A', range: '1.0.0.0 – 126.255.255.255', firstBit: '0', prefix: '/8', privateRange: '10.0.0.0/8', hosts: '16,777,214', color: '#3b82f6', use: 'Originally for very large organizations (government, telcos). IANA reserved 10.0.0.0/8 for private use.' },
  { cls: 'B', range: '128.0.0.0 – 191.255.255.255', firstBit: '10', prefix: '/16', privateRange: '172.16.0.0/12', hosts: '65,534', color: '#8b5cf6', use: 'Mid-size organizations. 172.16.0.0–172.31.255.255 are private. 16 contiguous /16 networks.' },
  { cls: 'C', range: '192.0.0.0 – 223.255.255.255', firstBit: '110', prefix: '/24', privateRange: '192.168.0.0/16', hosts: '254', color: G, use: 'Small networks. 192.168.0.0–192.168.255.255 private. Most common for home and small office networks.' },
  { cls: 'D', range: '224.0.0.0 – 239.255.255.255', firstBit: '1110', prefix: 'N/A', privateRange: 'N/A', hosts: 'N/A', color: '#f59e0b', use: 'Multicast addresses. Not for regular host assignment. Used for routing protocols (OSPF, EIGRP), streaming.' },
  { cls: 'E', range: '240.0.0.0 – 255.255.255.255', firstBit: '1111', prefix: 'N/A', privateRange: 'N/A', hosts: 'N/A', color: '#6b7280', use: 'Reserved for experimental use. 255.255.255.255 is limited broadcast. Never used in production.' },
]

function IpClassExplorer() {
  const [selected, setSelected] = useState<string | null>(null)
  const cls = CLASSES.find(c => c.cls === selected)

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: G, fontFamily: 'var(--font-mono)', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '.1em' }}>Interactive — IPv4 Address Classes</p>
      <p style={{ fontSize: 12, color: 'var(--muted)', margin: '0 0 20px' }}>Click a class to see range, default prefix, private ranges, and use cases.</p>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
        {CLASSES.map(c => (
          <div key={c.cls} onClick={() => setSelected(selected === c.cls ? null : c.cls)}
            style={{ padding: '10px 18px', background: selected === c.cls ? c.color : `${c.color}15`, border: `2px solid ${selected === c.cls ? c.color : 'transparent'}`, borderRadius: 8, cursor: 'pointer', transition: 'all .15s' }}>
            <div style={{ fontSize: 16, fontWeight: 900, color: selected === c.cls ? '#fff' : c.color }}>Class {c.cls}</div>
          </div>
        ))}
      </div>

      {cls && (
        <div style={{ background: `${cls.color}10`, border: `1px solid ${cls.color}30`, borderRadius: 10, padding: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10, marginBottom: 12 }}>
            {[
              { label: 'Range', value: cls.range },
              { label: 'First Bit(s)', value: cls.firstBit },
              { label: 'Default Prefix', value: cls.prefix },
              { label: 'Private Range', value: cls.privateRange },
              { label: 'Usable Hosts', value: cls.hosts },
            ].map(item => (
              <div key={item.label}>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 2 }}>{item.label}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: cls.color, fontFamily: 'var(--font-mono)' }}>{item.value}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 13, color: 'var(--text)', margin: 0 }}>{cls.use}</p>
        </div>
      )}
    </div>
  )
}

const SPECIAL_RANGES = [
  { range: '0.0.0.0/8', name: 'This network', use: 'Source address in DHCP discover (before address assigned). Never routed.' },
  { range: '10.0.0.0/8', name: 'Private (Class A)', use: '16.7M addresses. Large enterprise networks, cloud VPCs, data centers.' },
  { range: '100.64.0.0/10', name: 'Shared address space', use: 'RFC 6598. Carrier-Grade NAT (CGNAT) pool. ISPs use for subscriber networks between CPE and BRAS.' },
  { range: '127.0.0.0/8', name: 'Loopback', use: '127.0.0.1 is localhost. Traffic to this range never leaves the host. Used for IPC and service testing.' },
  { range: '169.254.0.0/16', name: 'Link-local (APIPA)', use: 'Automatic Private IP Addressing. Assigned when DHCP fails. Not routed beyond local subnet.' },
  { range: '172.16.0.0/12', name: 'Private (Class B range)', use: '172.16.0.0–172.31.255.255. 1M addresses. Common for enterprise internal networks.' },
  { range: '192.0.0.0/24', name: 'IETF protocol assignments', use: 'Reserved for IETF protocol use. 192.0.0.0/29 used for DS-Lite.' },
  { range: '192.168.0.0/16', name: 'Private (Class C range)', use: '65,536 addresses. Home networks, small offices. Most commonly recognized private range.' },
  { range: '198.18.0.0/15', name: 'Benchmarking', use: 'RFC 2544. Network device benchmarking. Never routed on the public internet.' },
  { range: '224.0.0.0/4', name: 'Multicast', use: 'Class D. 224.0.0.x = link-local multicast (routing protocols). 239.x.x.x = admin-scoped multicast.' },
  { range: '255.255.255.255/32', name: 'Limited broadcast', use: 'Broadcast to all hosts on local subnet. Never forwarded by routers.' },
]

function SpecialRangesReference() {
  const [selected, setSelected] = useState<string | null>(null)
  const r = SPECIAL_RANGES.find(x => x.range === selected)

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: G, fontFamily: 'var(--font-mono)', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '.1em' }}>Interactive — Special IPv4 Address Ranges</p>
      <p style={{ fontSize: 12, color: 'var(--muted)', margin: '0 0 20px' }}>Click any range to see its purpose and use cases.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {SPECIAL_RANGES.map((sr, i) => (
          <div key={sr.range} onClick={() => setSelected(selected === sr.range ? null : sr.range)}
            style={{ display: 'flex', gap: 16, alignItems: 'center', padding: '10px 14px', background: selected === sr.range ? `${G}12` : i % 2 === 0 ? 'var(--bg)' : 'var(--surface)', border: `1px solid ${selected === sr.range ? G : 'var(--border)'}`, borderTop: i === 0 ? '1px solid var(--border)' : 'none', borderRadius: i === 0 ? '8px 8px 0 0' : i === SPECIAL_RANGES.length - 1 ? '0 0 8px 8px' : 0, cursor: 'pointer', transition: 'all .15s' }}>
            <code style={{ fontSize: 12, fontWeight: 700, color: G, fontFamily: 'var(--font-mono)', minWidth: 140 }}>{sr.range}</code>
            <span style={{ fontSize: 13, color: selected === sr.range ? G : 'var(--text)', fontWeight: selected === sr.range ? 700 : 400 }}>{sr.name}</span>
          </div>
        ))}
      </div>

      {r && (
        <div style={{ marginTop: 12, background: `${G}10`, border: `1px solid ${G}30`, borderRadius: 8, padding: 14 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: G, margin: '0 0 4px' }}>{r.range} — {r.name}</p>
          <p style={{ fontSize: 13, color: 'var(--text)', margin: 0 }}>{r.use}</p>
        </div>
      )}
    </div>
  )
}

/* ── main module ───────────────────────────────────────────────────── */

export default function IPAddressingModule() {
  return (
    <LearnLayout
      title="IP Addressing"
      description="The addressing system that routes billions of packets per second across the global internet. From the 32-bit IPv4 design of 1981 through exhaustion crises to the 128-bit IPv6 future — IP addressing is the foundation of all modern networking."
      section="Networking Fundamentals — Module 13"
      readTime="22–30 min"
      updatedAt="May 2026"
    >
      {/* ── Chapter 1 ── */}
      <Chapter n={1} title="Why Every Device Needs an Address" />

      <StoryBox>
        In 1973, Vint Cerf and Bob Kahn were designing the protocol that would become TCP/IP. They needed a universal addressing scheme — a way to uniquely identify any computer on any network, anywhere on Earth. They chose 32 bits. "32 bits gives us 4.3 billion addresses," Cerf said. "That should be more than enough." In 1973, there were fewer than 100 computers on ARPANet. By 2011, the last /8 blocks were allocated. The 4.3 billion addresses had run out. IANA declared IPv4 exhaustion on February 3rd, 2011. The 32-bit choice — made for a network that would eventually connect 8 billion humans and hundreds of billions of devices — had run out.
      </StoryBox>

      <Para>
        Every device that participates in IP communication needs an <Accent>IP address</Accent> — a logical identifier that specifies both who the device is and where it is located in the network topology. Unlike MAC addresses (which are permanent hardware identifiers), IP addresses are <Accent>logical and hierarchical</Accent>: they encode location information that routers use to forward packets to the correct destination.
      </Para>

      <Para>
        The hierarchy is the key insight. An IP address is split into two parts: the <Accent>network portion</Accent> (identifying which network) and the <Accent>host portion</Accent> (identifying which device on that network). Routers use the network portion to make routing decisions — they don't need to know about individual hosts, only networks. This hierarchical aggregation is what makes routing the entire internet feasible with finite memory in router forwarding tables.
      </Para>

      <H2>Layer 3 vs. Layer 2 Addressing</H2>

      <Para>
        MAC addresses (Layer 2) are flat — every MAC address is globally unique but there is no hierarchy. A router cannot look at a MAC address and determine which direction to forward a packet. It would need an entry for every MAC on Earth in its forwarding table (billions of entries).
      </Para>

      <Para>
        IP addresses (Layer 3) are hierarchical. A router with an entry for 10.10.10.0/24 doesn't need individual entries for 10.10.10.1 through 10.10.10.254 — one entry covers all 254 hosts. Furthermore, entries can be aggregated: a route for 10.10.0.0/16 covers all 65,534 hosts in that block. This aggregation is why the global internet's routing table (BGP) has ~900,000 routes, not billions.
      </Para>

      <WowBox>
        The entire internet routing system — connecting 5 billion internet users through hundreds of thousands of networks — is managed by approximately 900,000 BGP route prefixes as of 2024. Each of these prefixes represents not a single host but a range of IP addresses (a block). Without hierarchical IP addressing and prefix aggregation, the internet routing table would need billions of individual host entries and no router on Earth could hold it in memory.
      </WowBox>

      <Divider />

      {/* ── Chapter 2 ── */}
      <Chapter n={2} title="IPv4: The 32-Bit Address" />

      <StoryBox>
        IPv4 addresses are 32 bits, typically written in dotted-decimal notation: four decimal numbers (0–255) separated by dots. Each decimal number represents one octet (8 bits). The address 192.168.10.50 in binary is: 11000000.10101000.00001010.00110010. This notation was invented purely for human readability — the IP protocol itself uses the 32-bit binary representation.
      </StoryBox>

      <H2>Dotted-Decimal Notation</H2>

      <Para>
        An IPv4 address contains 32 binary bits. To make it human-readable, the bits are divided into four groups of 8 (octets), and each octet is expressed as a decimal number from 0 to 255. The conversion: take the 8-bit binary number, multiply each bit by its positional value (128, 64, 32, 16, 8, 4, 2, 1), and sum the results.
      </Para>

      <Para>
        Example: the binary octet <Code>11000000</Code> = 128 + 64 = 192. The binary octet <Code>10101000</Code> = 128 + 32 + 8 = 168. Together: 192.168. The full address 192.168.10.50 in binary is <Code>11000000 10101000 00001010 00110010</Code>.
      </Para>

      <IPv4AddressAnalyzer />

      <H2>Classful Addressing (Historical)</H2>

      <Para>
        The original IPv4 design divided the address space into classes based on the leading bits of the first octet. This <Accent>classful addressing</Accent> system predates CIDR notation and was the only addressing model from 1981 to 1993.
      </Para>

      <IpClassExplorer />

      <Para>
        Classful addressing was rigid and wasteful. A company needing 1,000 hosts had to be given a Class B (/16, 65,534 hosts) because a Class C (/24, 254 hosts) was too small. The 64,534 "extra" addresses in the Class B were wasted. This inflexibility was a primary driver of IPv4 exhaustion.
      </Para>

      <H2>The Classless Revolution: CIDR</H2>

      <Para>
        <Accent>CIDR (Classless Inter-Domain Routing)</Accent>, introduced in 1993 (RFC 1519), eliminated fixed class boundaries. Instead of "Class A = /8, Class B = /16, Class C = /24," CIDR allows any prefix length from /0 to /32. An organization needing 1,000 hosts gets a /22 (1,022 usable hosts) — not a wasteful /16.
      </Para>

      <Para>
        CIDR notation writes the prefix length after a slash: 192.168.1.0<Accent>/24</Accent>. The prefix length indicates how many bits belong to the network portion. A /24 has 24 network bits and 8 host bits (256 addresses, 254 usable). A /22 has 22 network bits and 10 host bits (1,024 addresses, 1,022 usable).
      </Para>

      <Para>
        CIDR also enabled <Accent>route aggregation (supernetting)</Accent>: multiple smaller prefixes can be advertised as a single larger prefix, reducing routing table size. If an ISP owns 192.168.0.0/23 and 192.168.2.0/23, it can advertise a single 192.168.0.0/22 to the internet, saving routing table entries.
      </Para>

      <Divider />

      {/* ── Chapter 3 ── */}
      <Chapter n={3} title="Subnet Masks and Network/Host Decomposition" />

      <Para>
        A <Accent>subnet mask</Accent> indicates which bits of an IPv4 address are the network portion and which are the host portion. The subnet mask is a 32-bit value where all network bits are 1 and all host bits are 0. For a /24: the subnet mask is 255.255.255.0 (binary: 11111111.11111111.11111111.00000000).
      </Para>

      <H2>Calculating Network Address with Bitwise AND</H2>

      <Para>
        The network address is calculated by performing a bitwise AND between the IP address and the subnet mask. Every bit position where both the IP and mask have a 1 becomes a 1 in the network address; everywhere else is 0.
      </Para>

      <CodeBlock>
{`IP Address:   192.168.10.50  =  11000000.10101000.00001010.00110010
Subnet Mask:  255.255.255.0  =  11111111.11111111.11111111.00000000
                             AND ─────────────────────────────────
Network:      192.168.10.0   =  11000000.10101000.00001010.00000000
Broadcast:    192.168.10.255 =  11000000.10101000.00001010.11111111
First Host:   192.168.10.1   =  11000000.10101000.00001010.00000001
Last Host:    192.168.10.254 =  11000000.10101000.00001010.11111110`}
      </CodeBlock>

      <H2>The Four Addresses Every Subnet Has</H2>

      <Para>
        <Accent>Network address</Accent>: all host bits = 0. Identifies the subnet itself. Cannot be assigned to a host. In a CIDR context, this is the "prefix" or "subnet identifier."
      </Para>

      <Para>
        <Accent>Broadcast address</Accent>: all host bits = 1. A packet sent to the broadcast address is delivered to every host in the subnet. Cannot be assigned to a host.
      </Para>

      <Para>
        <Accent>First host</Accent>: network address + 1. The first assignable host address.
      </Para>

      <Para>
        <Accent>Last host</Accent>: broadcast address - 1. The last assignable host address.
      </Para>

      <Para>
        Therefore, the number of usable host addresses in a /n subnet is 2^(32-n) - 2. A /24 has 2^8 - 2 = 254 usable hosts. A /30 has 2^2 - 2 = 2 usable hosts (commonly used for point-to-point router links).
      </Para>

      <Warn title="/31 and /32 prefixes">
        RFC 3021 allows /31 subnets for point-to-point links — they contain exactly 2 addresses, both usable (no network/broadcast overhead). A /32 is a host route — it addresses a single specific IP address with no subnet context. /32 host routes are used for loopback interfaces and very specific routing policies.
      </Warn>

      <Divider />

      {/* ── Chapter 4 ── */}
      <Chapter n={4} title="Special and Reserved IPv4 Address Ranges" />

      <Para>
        Not all IPv4 addresses are available for general assignment. Various RFCs reserve specific ranges for special purposes. Understanding these ranges is critical for network design — using a reserved range for production hosts creates mysterious failures.
      </Para>

      <SpecialRangesReference />

      <H2>Private Address Space (RFC 1918)</H2>

      <Para>
        RFC 1918 (1996) defined three private address ranges that are never routed on the public internet: <Accent>10.0.0.0/8</Accent> (Class A private, 16.7M addresses), <Accent>172.16.0.0/12</Accent> (Class B range private, 1.05M addresses), and <Accent>192.168.0.0/16</Accent> (Class C range private, 65,536 addresses). These ranges can be reused by any organization for internal networks without coordination.
      </Para>

      <Para>
        The consequence: the same private address can exist in millions of different networks simultaneously (your home network's 192.168.1.100 and your company's 192.168.1.100 are different devices). They can coexist because private addresses are never routed to the public internet — <Accent>NAT (Network Address Translation)</Accent> translates private addresses to public ones at the internet boundary.
      </Para>

      <H2>Loopback (127.0.0.0/8)</H2>

      <Para>
        The entire 127.0.0.0/8 range (127.x.x.x) is reserved for loopback. Traffic sent to any address in this range is processed internally by the host's networking stack and never leaves the machine. <Code>127.0.0.1</Code> (localhost) is the conventional loopback address. Servers often bind to 127.0.0.1 to accept only local connections — not accessible from the network.
      </Para>

      <H2>Link-Local (169.254.0.0/16) — APIPA</H2>

      <Para>
        When a Windows or macOS host cannot reach a DHCP server, it auto-assigns itself an address in the 169.254.0.0/16 range — this is <Accent>APIPA (Automatic Private IP Addressing)</Accent>. Link-local addresses are not routed beyond the local subnet. Seeing a 169.254.x.x address on a host is a diagnostic signal that DHCP failed. On Linux systems, link-local addresses (also called "zeroconf" addresses) serve the same purpose.
      </Para>

      <Divider />

      {/* ── Chapter 5 ── */}
      <Chapter n={5} title="IPv4 Address Allocation and IANA" />

      <StoryBox>
        IANA (Internet Assigned Numbers Authority) manages the global IP address pool. In January 1992, Vint Cerf warned in an RFC that IPv4 addresses would run out "within 12 years." He was off by one year. IANA exhausted its free pool on February 3, 2011, allocating the final five /8 blocks simultaneously to the five Regional Internet Registries (RIRs) in a ceremony in Miami. APNIC (Asia-Pacific) exhausted its pool in April 2011. RIPE NCC (Europe/Middle East) followed in September 2012. ARIN (North America) entered exhaustion in September 2015. IPv6 was standardized in 1998 — 13 years before exhaustion — but adoption has been slow, driven by NAT extending IPv4's effective lifetime.
      </StoryBox>

      <H2>The RIR System</H2>

      <Para>
        IP address allocation is hierarchical. IANA allocates large blocks (/8s historically) to five Regional Internet Registries: <Accent>ARIN</Accent> (North America), <Accent>RIPE NCC</Accent> (Europe/Middle East/Central Asia), <Accent>APNIC</Accent> (Asia-Pacific), <Accent>LACNIC</Accent> (Latin America/Caribbean), and <Accent>AFRINIC</Accent> (Africa). RIRs allocate smaller blocks to ISPs, who allocate sub-blocks to their customers.
      </Para>

      <Para>
        Following exhaustion, the RIRs continue to operate secondary markets and "last resort" policies. Organizations return unused address space; the RIRs reallocate it. IPv4 addresses now have significant monetary value — a /24 (256 addresses) sells for approximately $15,000–$25,000 on the secondary market (2024 prices).
      </Para>

      <H2>Carrier-Grade NAT (CGNAT)</H2>

      <Para>
        To stretch remaining IPv4 addresses, most ISPs deploy <Accent>CGNAT (Carrier-Grade NAT)</Accent>. Instead of assigning each customer a public IPv4 address, the ISP assigns a private address from the <Code>100.64.0.0/10</Code> range (RFC 6598 shared address space) and performs NAT at the ISP level. Multiple customers share a single public IP address.
      </Para>

      <Para>
        CGNAT breaks many internet services: peer-to-peer (BitTorrent, VoIP, gaming), port forwarding, inbound connections, and some VPN protocols. It also complicates abuse tracking — when the ISP receives a subpoena for the owner of IP 203.0.113.100 at 14:35:22, they must check which of potentially hundreds of customers was NAT'd to that IP at that exact second, requiring detailed logging. CGNAT is a stopgap solution, not a long-term one.
      </Para>

      <Divider />

      {/* ── Chapter 6 ── */}
      <Chapter n={6} title="IPv4 Packet Header" />

      <Para>
        Understanding the IP packet header is essential for network engineering, security analysis, and performance optimization. Every IP packet begins with a minimum 20-byte header containing all routing and control information.
      </Para>

      <CodeBlock>
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

      <H2>Critical Header Fields</H2>

      <Para>
        <Accent>TTL (Time to Live)</Accent>: 8-bit hop counter. Each router decrements TTL by 1 when forwarding. When TTL reaches 0, the router drops the packet and sends an ICMP "Time Exceeded" back to the source. This prevents packets from looping forever in routing loops. Starting TTL is typically 64 (Linux/macOS) or 128 (Windows). Traceroute exploits TTL to map network paths.
      </Para>

      <Para>
        <Accent>Protocol</Accent>: 8-bit value indicating the Layer 4 protocol. 6 = TCP, 17 = UDP, 1 = ICMP, 89 = OSPF (sent directly over IP), 50 = ESP (IPsec).
      </Para>

      <Para>
        <Accent>DSCP (Differentiated Services Code Point)</Accent>: 6 bits in the original ToS (Type of Service) byte. Marks packets for QoS treatment. EF (Expedited Forwarding, DSCP 46) = voice/video priority. AF41 (Assured Forwarding) = video conferencing. CS0 = best effort. Routers use DSCP to prioritize queues.
      </Para>

      <Para>
        <Accent>Fragmentation fields</Accent> (Identification, Flags, Fragment Offset): IPv4 routers can fragment packets that exceed the path MTU. Modern networks set the "Don't Fragment" (DF) bit and rely on PMTU Discovery (RFC 1191) to find the minimum MTU along a path. IPv6 eliminates router fragmentation entirely.
      </Para>

      <Para>
        <Accent>Header Checksum</Accent>: 16-bit checksum of the IP header only (not the payload). Recomputed at every hop because TTL changes at each router. This is one reason IPv6 eliminated the header checksum — it's redundant work per router hop, and Layer 2 checksums (Ethernet FCS) and Layer 4 checksums (TCP/UDP) already protect data integrity.
      </Para>

      <Divider />

      {/* ── Chapter 7 ── */}
      <Chapter n={7} title="Public vs. Private IP Addresses and NAT" />

      <H2>Public IP Addresses</H2>

      <Para>
        A <Accent>public IP address</Accent> is globally unique and routable on the public internet. Public addresses are allocated by the RIR system to ISPs and organizations. Every packet with a public destination IP can, in principle, be routed to its destination by any internet router.
      </Para>

      <H2>NAT: Extending IPv4's Lifetime</H2>

      <Para>
        <Accent>NAT (Network Address Translation)</Accent> allows multiple hosts with private IP addresses to share a single public IP address. When a host with private IP 192.168.1.50 sends a packet to the internet, the NAT device (typically a router/firewall) replaces the source IP with the public IP and records the mapping in a state table. When the response arrives, NAT translates the destination IP back to 192.168.1.50.
      </Para>

      <Para>
        This is specifically <Accent>PAT (Port Address Translation)</Accent> or NAPT (Network Address and Port Translation): NAT distinguishes multiple simultaneous sessions from different private hosts by also mapping unique source port numbers. The state table entry: (private IP: private port) ↔ (public IP: translated port).
      </Para>

      <CodeBlock>
{`NAT State Table:
Private IP:Port          Public IP:Port           Protocol  State
192.168.1.50:54321  <->  203.0.113.1:54321        TCP       ESTABLISHED
192.168.1.51:12345  <->  203.0.113.1:12346        TCP       ESTABLISHED
192.168.1.52:8080   <->  203.0.113.1:8081         TCP       TIME_WAIT
192.168.1.50:5353   <->  203.0.113.1:15000        UDP       -`}
      </CodeBlock>

      <Para>
        NAT breaks the internet's end-to-end principle: a host behind NAT cannot receive unsolicited inbound connections because there is no NAT state entry to map the inbound packet to an internal host. This breaks:
        <ul style={{ margin: '8px 0 0', paddingLeft: 20 }}>
          <li>Peer-to-peer applications (requiring NAT traversal techniques like STUN/TURN/ICE)</li>
          <li>Hosting servers (requiring explicit port forwarding rules)</li>
          <li>Some VPN protocols (requiring NAT-T UDP encapsulation)</li>
        </ul>
      </Para>

      <Divider />

      {/* ── Chapter 8 ── */}
      <Chapter n={8} title="Unicast, Broadcast, Multicast, Anycast" />

      <Para>
        IPv4 supports four addressing modes, each with different delivery semantics:
      </Para>

      <H2>Unicast</H2>

      <Para>
        A unicast address identifies a single interface. Packets sent to a unicast address are delivered to exactly one destination. This is the standard addressing mode for all host-to-host communication. Example: a TCP connection between your laptop and a web server — both using unicast addresses.
      </Para>

      <H2>Broadcast</H2>

      <Para>
        IPv4 has two broadcast types. <Accent>Limited broadcast</Accent> (255.255.255.255) is sent to all hosts on the local subnet — routers never forward it. <Accent>Directed broadcast</Accent> (network address with all host bits set to 1) targets all hosts on a specific remote subnet — e.g., 192.168.1.255 is the directed broadcast for 192.168.1.0/24. Routers by default block directed broadcasts (they were historically used in Smurf DDoS amplification attacks).
      </Para>

      <H2>Multicast</H2>

      <Para>
        Multicast (224.0.0.0/4) delivers a packet to a group of interested receivers simultaneously — more efficient than multiple unicast copies. Multicast group membership is managed by IGMP (Internet Group Management Protocol) at the host level and by PIM (Protocol Independent Multicast) for router-level multicast routing. Used for streaming media, IPTV, OSPF (224.0.0.5, 224.0.0.6), and RIP (224.0.0.9).
      </Para>

      <H2>Anycast</H2>

      <Para>
        Anycast assigns the same IP address to multiple nodes in different locations. Packets are routed to the topologically nearest instance. DNS root servers and CDNs use anycast extensively: Cloudflare's 1.1.1.1 DNS resolver runs on servers in 300+ cities worldwide, all announcing the same IP via BGP. Your DNS query is automatically routed to the closest server, minimizing latency. The internet has no explicit anycast support — it emerges naturally from BGP routing each city announcing the same prefix, and BGP's shortest-path selection naturally delivering packets to the nearest instance.
      </Para>

      <Divider />

      {/* ── Chapter 9 ── */}
      <Chapter n={9} title="Static vs. Dynamic IP Assignment" />

      <H2>Static IP Addresses</H2>

      <Para>
        Statically assigned IP addresses are manually configured on devices and do not change. Used for: servers (consistent address for DNS records), network infrastructure (routers, switches — predictable addresses simplify troubleshooting), printers, and other devices that need to be consistently reachable at a known address. Static IPs require manual management — assigning a duplicate IP to two devices causes an <Accent>IP conflict</Accent> (both devices see each other's ARP replies and behave unpredictably).
      </Para>

      <H2>DHCP: Dynamic Host Configuration Protocol</H2>

      <Para>
        <Accent>DHCP</Accent> automates IP address assignment. When a device connects to a network, it broadcasts a DHCP Discover. The DHCP server responds with an Offer containing an available IP address, subnet mask, default gateway, DNS server addresses, and lease duration. The client accepts with a Request; the server confirms with an Acknowledge (ACK). This four-step process (DORA: Discover, Offer, Request, Acknowledge) completes in milliseconds.
      </Para>

      <Para>
        DHCP leases expire after the configured duration (commonly 8 hours to 24 hours for corporate networks, 24 hours for home networks). Clients renew leases at 50% of the lease duration (T1) and again at 87.5% (T2) if the first renewal fails. If the lease expires without renewal, the client loses its IP address and must restart the DHCP process.
      </Para>

      <H2>DHCP Reservations</H2>

      <Para>
        A <Accent>DHCP reservation</Accent> (also called static DHCP or DHCP static mapping) assigns a specific IP address to a device based on its MAC address. The device still uses DHCP, but always receives the same IP. This gives the administrative benefits of DHCP (centralized management, no manual configuration on the device) with the predictability of a static address. Best practice for printers, network cameras, APs, and other infrastructure that needs consistent addressing but doesn't need to be manually configured.
      </Para>

      <Divider />

      {/* ── Chapter 10 ── */}
      <Chapter n={10} title="IP Address Planning in Enterprise Networks" />

      <StoryBox>
        A startup begins with 192.168.1.0/24. By year three, they have 5 offices, 500 employees, and cloud workloads. The original /24 (254 hosts) is exhausted. They start using 192.168.2.0/24 for the second floor. Then 192.168.3.0/24 for HR. No documentation. Three years later, the network engineer hired to audit the infrastructure finds 47 separate /24 subnets assigned without any coherent scheme — overlapping DHCP scopes, missing route entries, incorrect default gateways. This is IP addressing debt. Good planning at the beginning prevents years of painful cleanup.
      </StoryBox>

      <H2>IP Address Planning Principles</H2>

      <Para>
        <Accent>Hierarchical allocation:</Accent> Assign large blocks at the top of the hierarchy and carve subnets from them. Example: allocate 10.0.0.0/8 for the entire organization. Site 1 gets 10.1.0.0/16. Building A in Site 1 gets 10.1.1.0/24. Floor 2 of Building A gets 10.1.2.0/24. This enables route summarization at each level, reducing routing table complexity.
      </Para>

      <Para>
        <Accent>Subnet sizing based on function:</Accent> Different network zones need different subnet sizes. Point-to-point router links: /30 or /31 (2 hosts). Management networks (switch/AP management): /24 (254 hosts). Server VLANs: /23 or /22 (510–1022 hosts). User VLANs: /22 (1022 hosts). DMZ segments: /28 or /27 (14–30 hosts). Leave room for growth — a subnet that's 80% full today becomes 100% full when the new project deploys.
      </Para>

      <Para>
        <Accent>Consistent numbering:</Accent> Establish conventions that any engineer can follow. Common example: x.x.x.1 = gateway, x.x.x.2 = secondary gateway, x.x.x.10-50 = servers (static), x.x.x.100-200 = DHCP pool, x.x.x.254 = management. Document in an IPAM (IP Address Management) system.
      </Para>

      <H2>IPAM Tools</H2>

      <Para>
        Manual IP address management in spreadsheets is error-prone and doesn't scale beyond a few dozen subnets. <Accent>IPAM (IP Address Management)</Accent> tools provide: visual subnet allocation trees, DHCP scope management, DNS integration, conflict detection, and audit trails. Open-source options include phpIPAM and Netbox. Enterprise solutions include Infoblox, SolarWinds IPAM, and BlueCat.
      </Para>

      <Divider />

      {/* ── Chapter 11 ── */}
      <Chapter n={11} title="Routing and IP Addressing: The Connection" />

      <Para>
        IP addressing and routing are inseparable — the hierarchical structure of IP addresses exists specifically to make routing efficient. Understanding how routers use IP addresses to make forwarding decisions is essential for network design.
      </Para>

      <H2>Longest Prefix Match</H2>

      <Para>
        When a router receives a packet, it looks up the destination IP in its routing table. Multiple routes may match (e.g., a default route 0.0.0.0/0 matches everything; a specific route 10.10.10.0/24 also matches 10.10.10.50). The router applies <Accent>longest prefix match (LPM)</Accent>: the most specific matching route (longest prefix) is used.
      </Para>

      <Para>
        This is why a more specific /32 host route overrides a /24 network route: the /32 is the longest possible match. Internet routing uses this: the default route (0.0.0.0/0) is the last resort, used only when no more specific route matches. A route to 10.10.10.0/24 matches 10.10.10.0/24 more specifically than a 10.0.0.0/8 route — the /24 wins.
      </Para>

      <H2>Subnet Routing and Summarization</H2>

      <Para>
        When a network is properly hierarchically allocated, <Accent>route summarization</Accent> reduces routing table size. If Site 1 has subnets 10.1.1.0/24 through 10.1.255.0/24, the distribution router can advertise a single 10.1.0.0/16 summary route to the core — hiding the internal complexity of 255 subnets behind a single route entry.
      </Para>

      <Para>
        Summarization breaks if the address space is not contiguous: if Site 1 also uses 10.5.0.0/24 (which falls outside the 10.1.0.0/16 summary), that subnet needs its own routing entry. This is why hierarchical address planning matters — disorganized address allocation prevents effective summarization and bloats routing tables.
      </Para>

      <Divider />

      {/* ── Chapter 12 ── */}
      <Chapter n={12} title="Diagnosing IP Addressing Issues" />

      <CodeBlock>
{`# Linux — show IP address and prefix
ip addr show
ip addr show eth0

# Linux — show routing table
ip route show
ip route get 8.8.8.8    # which interface/next-hop for specific destination

# macOS — IP configuration
ifconfig en0
route get default

# Windows
ipconfig /all
route print

# Test connectivity at Layer 3
ping 192.168.1.1           # ICMP echo to gateway
ping -c 4 8.8.8.8          # ICMP echo to internet

# Trace routing path (exploits TTL)
traceroute 8.8.8.8         # Linux/macOS
tracert 8.8.8.8            # Windows

# DNS resolution
nslookup google.com
dig google.com A

# DHCP release and renew
sudo dhclient -r eth0      # release
sudo dhclient eth0         # renew`}
      </CodeBlock>

      <H2>Common IP Addressing Issues</H2>

      <Para>
        <Accent>IP address conflict:</Accent> Two devices assigned the same IP. Symptoms: intermittent connectivity, ARP storms, both devices showing "duplicate IP address" warnings. Diagnosis: <Code>arp -a</Code> to see which MACs map to the conflicting IP; <Code>arping</Code> to send targeted ARP probes.
      </Para>

      <Para>
        <Accent>Wrong subnet mask:</Accent> A device with 192.168.1.50/23 considers both 192.168.0.x and 192.168.1.x as local. If the rest of the network uses /24, the device will try to ARP for hosts that aren't local, failing to reach them. Diagnosis: compare subnet mask with other devices on the segment.
      </Para>

      <Para>
        <Accent>Wrong default gateway:</Accent> Device can reach hosts on its own subnet (Layer 2) but cannot reach other subnets or the internet. The gateway IP must be on the same subnet as the host.
      </Para>

      <Para>
        <Accent>APIPA (169.254.x.x):</Accent> Device failed to get a DHCP lease. Causes: DHCP server unreachable, DHCP scope exhausted, VLAN misconfiguration (device is in wrong VLAN without DHCP), DHCP relay not configured (device and server are on different subnets).
      </Para>

      <Divider />

      {/* ── Chapter 13 ── */}
      <Chapter n={13} title="Common Misconceptions" />

      <Err title="IP addresses are permanent like MAC addresses">
        IP addresses are logical and dynamic. A device's IP address can change (DHCP lease renewal, reconfiguration), and the same IP can be assigned to different devices over time. MAC addresses are burned into hardware and permanent (though they can be spoofed in software). Never assume a device's IP address is stable without explicit static assignment or DHCP reservation. DNS names abstract this — a hostname always resolves to the current IP.
      </Err>

      <Err title="Private IPs cannot be routed at all">
        Private IPs (RFC 1918) cannot be routed on the public internet — routers on the internet are configured to drop packets with private source/destination addresses. However, private IPs are routinely routed within private networks, VPNs, and cloud provider internal networks. An enterprise WAN using MPLS or SD-WAN can route 10.x.x.x packets between sites. IPsec VPN tunnels carry private-to-private traffic over public infrastructure. The prohibition is specifically on public internet routing, not on routing in general.
      </Err>

      <Err title="The network address and broadcast address waste two addresses">
        It's true that a /24 has 256 addresses and only 254 are usable (network and broadcast are reserved). But this "waste" is not caused by an arbitrary rule — it's inherent to the subnet model. The network address identifies the subnet (necessary for routing), and the broadcast address is required for Layer 2 broadcast semantics (DHCP, ARP, etc.). The /31 standard (RFC 3021) eliminates this for point-to-point links where no broadcast is needed.
      </Err>

      <Err title="NAT provides security by hiding internal addresses">
        NAT is not a security mechanism — it's an address translation mechanism. NAT does incidentally hide internal addresses from external observation, but it provides no protection against outbound threats (malware on internal hosts can still communicate out), no inspection of packet contents, and no authentication. A firewall provides actual security (stateful packet inspection, ACLs, application-layer inspection). Confusing NAT with a firewall leads to false security assumptions — a "nat router" with all traffic allowed outbound provides no meaningful security, just address translation.
      </Err>

      <Err title="127.0.0.1 and localhost are the same thing">
        127.0.0.1 is the conventional loopback IPv4 address. localhost is a hostname that typically resolves to 127.0.0.1 (IPv4) and/or ::1 (IPv6 loopback). They are often equivalent, but not always. If a service is only listening on 127.0.0.1 but your client resolves localhost to ::1 (IPv6) first, the connection will fail even though the service is "running locally." Modern applications often need to explicitly bind to both 127.0.0.1 and ::1 (or use 0.0.0.0 to bind all interfaces) to handle both protocol families.
      </Err>

      <Err title="A /16 always has 65,534 hosts">
        A /16 has 2^16 - 2 = 65,534 usable addresses, but only if it is not further subnetted. In practice, a /16 allocation is almost always divided into smaller subnets (/24s, /23s, etc.) for different network segments. The /16 is the allocation — the actual assignment to individual hosts is in the sub-subnets. A flat /16 network with 65,534 hosts on one broadcast domain would have catastrophic broadcast traffic. Real networks always subnet into smaller broadcast domains.
      </Err>

      <Divider />

      {/* ── Chapter 14 ── */}
      <Chapter n={14} title="Interview Questions" />

      <IQ q="What is an IP address and how is it different from a MAC address?" level="Beginner">
        An IP address is a logical, hierarchical identifier assigned to a network interface for Layer 3 (Internet layer) communication. IPv4 addresses are 32 bits, written in dotted-decimal notation (e.g., 192.168.1.1). They encode location information — the network portion tells routers which network a device is on; the host portion identifies the specific device. MAC addresses are 48-bit hardware identifiers burned into network interface hardware, flat (no hierarchy), globally unique, and used for Layer 2 (Ethernet) communication within a local network. A key difference: MAC addresses don't change (permanently assigned to hardware), while IP addresses are logical and can be dynamically assigned (DHCP) or changed. Routers use IP addresses to route across networks; switches use MAC addresses to forward within a network.
      </IQ>

      <IQ q="Given 192.168.10.50/24, calculate the network address, broadcast address, and usable host range." level="Beginner">
        The /24 prefix means 24 network bits and 8 host bits. Subnet mask: 255.255.255.0. Network address: perform AND between IP and mask = 192.168.10.50 AND 255.255.255.0 = 192.168.10.0. Broadcast: set all host bits to 1 = 192.168.10.255. First host: 192.168.10.1 (network + 1). Last host: 192.168.10.254 (broadcast - 1). Usable hosts: 2^8 - 2 = 254.
      </IQ>

      <IQ q="What is CIDR and why was it introduced?" level="Intermediate">
        CIDR (Classless Inter-Domain Routing, RFC 1519, 1993) eliminated the rigid class boundaries (Class A=/8, B=/16, C=/24) of the original IPv4 design. In classful addressing, an organization needing 1,000 hosts was allocated a /16 (65,534 hosts), wasting 64,534 addresses. CIDR allows any prefix length (/0 to /32), enabling precise allocation — a /22 provides exactly 1,022 usable hosts. CIDR was introduced to: (1) combat IPv4 exhaustion by enabling efficient allocation without wasted addresses; (2) enable route aggregation — multiple smaller prefixes can be summarized as a single larger prefix, reducing internet routing table size. CIDR notation adds the prefix length after a slash: 192.168.1.0/24.
      </IQ>

      <IQ q="Explain longest prefix match and how it affects routing decisions." level="Intermediate">
        When a router has multiple routing table entries that all match a destination IP address, it selects the one with the longest (most specific) prefix — Longest Prefix Match (LPM). Example: routing table has 10.0.0.0/8, 10.10.0.0/16, and 10.10.10.0/24. A packet destined for 10.10.10.50 matches all three. LPM selects 10.10.10.0/24 (longest). A packet for 10.10.20.50 matches 10.0.0.0/8 and 10.10.0.0/16 — LPM selects /16. A packet for 10.20.0.1 matches only 10.0.0.0/8. The default route (0.0.0.0/0) matches everything but has the shortest prefix — used only when no more specific route matches. TCAM hardware in modern routers performs this lookup in constant time regardless of table size.
      </IQ>

      <IQ q="Why is NAT not a security mechanism, and what problems does it create?" level="Senior">
        NAT is address translation, not security. It incidentally hides internal addresses but provides none of: packet inspection (no examination of payload), authentication (no verification that connections are authorized), or protection against outbound-initiated attacks (malware can use outbound connections NAT passes freely). A firewall's value comes from stateful inspection rules — NAT alone drops inbound unsolicited connections but would pass all outbound traffic, including C&C (command and control) callbacks from compromised hosts. NAT creates functional problems: breaks end-to-end connectivity (hosts behind NAT cannot receive unsolicited inbound connections without port forwarding), complicates peer-to-peer protocols (requiring STUN/TURN/ICE NAT traversal), breaks protocols that embed IP addresses in payloads (FTP active mode, SIP without ALG), creates forensic problems (a single public IP shared by thousands of users via CGNAT requires per-second connection logs to identify a specific user), and violates the internet's original end-to-end principle. IPv6 was designed specifically to eliminate the need for NAT.
      </IQ>

      <IQ q="Describe the IPv4 exhaustion problem and the technical and policy mechanisms that extended IPv4's lifetime. What ultimately solves it?" level="PhD">
        IPv4 exhaustion results from a mismatch between the 2^32 = 4.3 billion address space and growth in internet-connected devices beyond that number. Technical mechanisms extending IPv4 lifetime: (1) CIDR (1993): replaced classful allocation with variable-length prefixes, eliminating waste. A network needing 300 hosts gets a /23 instead of a /16, saving 65,234 addresses. (2) RFC 1918 private addresses + NAT: allows unbounded internal networks to share a single public IP. One public IP can serve thousands of private hosts — effectively multiplying IPv4 capacity by orders of magnitude. (3) CGNAT (RFC 6598): ISPs place NAT at the carrier level, assigning multiple subscribers to one public IP — extending capacity but breaking end-to-end connectivity. (4) IPv4 address markets: organizations sell unused IPv4 blocks (a /8 = 16M addresses is worth ~$400M at current market rates), recycling previously idle space. Policy mechanisms: RIR exhaustion policies, IPv4 transfer markets with ARIN/RIPE oversight, increased scrutiny of allocation requests. None of these solve the fundamental problem — they defer it. The actual solution is IPv6 (128-bit addresses, 2^128 = 340 undecillion addresses — more than enough for every atom on Earth). IPv6 deployment has accelerated: as of 2024, ~50% of Google traffic globally is IPv6. The transition is dual-stack (running both IPv4 and IPv6 simultaneously) until IPv4 can eventually be deprecated, a process measured in decades.
      </IQ>

      <KeyTakeaways items={[
        'IPv4 addresses are 32 bits written in dotted-decimal notation (e.g., 192.168.1.1); they are hierarchical — the network portion enables routing, the host portion identifies the device.',
        'CIDR (Classless Inter-Domain Routing) replaced fixed class boundaries with variable prefix lengths (/0–/32), enabling efficient allocation and route aggregation.',
        'The subnet mask identifies network vs. host bits; AND of IP with mask gives the network address. All host bits = 1 gives the broadcast address.',
        'RFC 1918 defines private address ranges (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) that are never routed on the public internet — NAT translates them to public IPs.',
        'Special ranges include loopback (127.0.0.0/8), link-local/APIPA (169.254.0.0/16), multicast (224.0.0.0/4), and CGNAT shared space (100.64.0.0/10).',
        'IPv4 was exhausted at IANA level in February 2011; NAT, CIDR, and CGNAT extended its practical lifetime but broke end-to-end connectivity.',
        'Longest Prefix Match (LPM) selects the most specific routing table entry for a destination — a /32 host route overrides a /24 network route.',
        'DHCP automates IP assignment using the DORA process (Discover, Offer, Request, Acknowledge); DHCP reservations assign consistent IPs based on MAC address.',
        'NAT is address translation, not security — it provides no packet inspection, no authentication, and passes all outbound traffic including malware callbacks.',
        'Hierarchical IP address planning with IPAM tools prevents IP conflicts, enables route summarization, and scales to thousands of subnets without management chaos.',
      ]} />
    </LearnLayout>
  )
}
