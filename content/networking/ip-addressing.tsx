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

const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, margin: '0 0 18px' }}>{children}</p>
)

const H = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', margin: '32px 0 12px' }}>{children}</h3>
)

const Hl = ({ children }: { children: React.ReactNode }) => (
  <strong style={{ color: N }}>{children}</strong>
)

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

const TimeBlock = ({ time, label, children }: { time: string; label: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', gap: 20, marginBottom: 28 }}>
    <div style={{ flexShrink: 0, textAlign: 'right', width: 100 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: N, fontFamily: 'var(--font-mono)' }}>{time}</div>
    </div>
    <div style={{ flex: 1, borderLeft: `2px solid ${N}30`, paddingLeft: 20, paddingBottom: 8 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8 }}>{children}</div>
    </div>
  </div>
)

const Term = ({ word, def }: { word: string; def: string }) => (
  <div style={{ display: 'flex', gap: 0, marginBottom: 12, border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
    <div style={{ background: `${N}12`, borderRight: `1px solid ${N}20`, padding: '10px 16px', minWidth: 160, display: 'flex', alignItems: 'center' }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: N }}>{word}</span>
    </div>
    <div style={{ padding: '10px 16px', fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{def}</div>
  </div>
)

// ── IP Address Calculator ─────────────────────────────────────────────────────
function parseIPOctets(ip: string): number[] | null {
  const parts = ip.split('.')
  if (parts.length !== 4) return null
  const nums = parts.map(p => parseInt(p, 10))
  if (nums.some(n => isNaN(n) || n < 0 || n > 255)) return null
  return nums
}

function octetsToInt(octets: number[]): number {
  return ((octets[0] << 24) | (octets[1] << 16) | (octets[2] << 8) | octets[3]) >>> 0
}

function intToOctets(n: number): number[] {
  return [(n >>> 24) & 0xff, (n >>> 16) & 0xff, (n >>> 8) & 0xff, n & 0xff]
}

function toBinary(octets: number[]): string {
  return octets.map(o => o.toString(2).padStart(8, '0')).join('.')
}

function IPCalc() {
  const [ipStr, setIpStr] = useState('192.168.10.50')
  const [prefix, setPrefix] = useState(24)

  const octets = parseIPOctets(ipStr)
  const valid = octets !== null

  const maskInt = valid ? (prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0) : 0
  const maskOctets = intToOctets(maskInt)

  const ipInt = valid ? octetsToInt(octets) : 0
  const networkInt = valid ? (ipInt & maskInt) >>> 0 : 0
  const broadcastInt = valid ? (networkInt | (~maskInt >>> 0)) >>> 0 : 0
  const firstHostInt = networkInt + 1
  const lastHostInt = broadcastInt - 1
  const totalHosts = prefix <= 30 ? Math.pow(2, 32 - prefix) - 2 : (prefix === 31 ? 2 : 1)

  const networkOctets = intToOctets(networkInt)
  const broadcastOctets = intToOctets(broadcastInt)
  const firstHostOctets = intToOctets(firstHostInt)
  const lastHostOctets = intToOctets(lastHostInt)
  const wildcardOctets = maskOctets.map(b => 255 - b)

  const isPrivate = valid && (
    octets[0] === 10 ||
    (octets[0] === 172 && octets[1] >= 16 && octets[1] <= 31) ||
    (octets[0] === 192 && octets[1] === 168)
  )
  const isLoopback = valid && octets[0] === 127
  const isLinkLocal = valid && octets[0] === 169 && octets[1] === 254
  const isMulticast = valid && octets[0] >= 224 && octets[0] <= 239

  const addrType = isLoopback ? 'Loopback' : isLinkLocal ? 'Link-Local (APIPA)' : isMulticast ? 'Multicast' : isPrivate ? 'Private (RFC 1918)' : 'Public'
  const typeColor = isPrivate ? N : isLoopback || isLinkLocal ? '#f59e0b' : isMulticast ? '#8b5cf6' : '#3b82f6'

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden', margin: '28px 0' }}>
      <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--border)', background: `${N}06` }}>
        <p style={{ fontSize: 11, color: N, fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: '.1em', margin: '0 0 4px' }}>// INTERACTIVE — IP ADDRESS CALCULATOR</p>
        <p style={{ fontSize: 13, color: 'var(--muted)', margin: 0 }}>Enter any IPv4 address and prefix length to see network, broadcast, host range, and binary representation.</p>
      </div>

      <div style={{ padding: '20px 22px', display: 'flex', gap: 16, flexWrap: 'wrap', borderBottom: '1px solid var(--border)', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input
            value={ipStr}
            onChange={e => setIpStr(e.target.value)}
            style={{ padding: '10px 14px', borderRadius: 8, border: `1px solid ${valid ? 'var(--border)' : '#ef4444'}`, background: 'var(--background)', color: 'var(--text)', fontSize: 15, fontFamily: 'var(--font-mono)', fontWeight: 700, width: 180 }}
            placeholder="192.168.1.1"
          />
          <span style={{ fontSize: 20, fontWeight: 700, color: 'var(--muted)' }}>/</span>
          <input
            type="number"
            min={0}
            max={32}
            value={prefix}
            onChange={e => setPrefix(Math.max(0, Math.min(32, parseInt(e.target.value) || 0)))}
            style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--text)', fontSize: 15, fontFamily: 'var(--font-mono)', fontWeight: 700, width: 70 }}
          />
        </div>
        {valid && (
          <div style={{ background: `${typeColor}15`, border: `1px solid ${typeColor}40`, borderRadius: 8, padding: '6px 14px', fontSize: 12, fontWeight: 700, color: typeColor }}>
            {addrType}
          </div>
        )}
      </div>

      {valid ? (
        <div style={{ padding: '20px 22px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10, marginBottom: 20 }}>
            {[
              { label: 'Network Address', value: networkOctets.join('.'), sub: `/${prefix}` },
              { label: 'Subnet Mask', value: maskOctets.join('.'), sub: `/${prefix} prefix` },
              { label: 'Wildcard Mask', value: wildcardOctets.join('.'), sub: 'ACL wildcard' },
              { label: 'First Host', value: prefix <= 30 ? firstHostOctets.join('.') : 'N/A', sub: '' },
              { label: 'Last Host', value: prefix <= 30 ? lastHostOctets.join('.') : 'N/A', sub: '' },
              { label: 'Broadcast', value: prefix <= 31 ? broadcastOctets.join('.') : 'N/A', sub: 'last address' },
              { label: 'Usable Hosts', value: totalHosts.toLocaleString(), sub: `2^${32 - prefix}${prefix <= 30 ? '−2' : ''}` },
            ].map(item => (
              <div key={item.label} style={{ background: 'var(--background)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px' }}>
                <div style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', fontFamily: 'var(--font-mono)' }}>{item.value}</div>
                {item.sub && <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 2 }}>{item.sub}</div>}
              </div>
            ))}
          </div>

          <div style={{ marginBottom: 16 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: N, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 8px' }}>Binary Representation</p>
            <div style={{ background: 'var(--background)', border: '1px solid var(--border)', borderRadius: 8, padding: '14px 16px', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 6, alignItems: 'baseline' }}>
                <span style={{ color: 'var(--muted)', minWidth: 70, fontSize: 11 }}>IP:</span>
                <span style={{ color: 'var(--text)' }}>{toBinary(octets)}</span>
              </div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 6, alignItems: 'baseline' }}>
                <span style={{ color: 'var(--muted)', minWidth: 70, fontSize: 11 }}>Mask:</span>
                <span style={{ color: N }}>{toBinary(maskOctets)}</span>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
                <span style={{ color: 'var(--muted)', minWidth: 70, fontSize: 11 }}>Network:</span>
                <span>
                  {toBinary(networkOctets).split('').map((bit, i) => {
                    const dotIdx = Math.floor(i / 9)
                    const bitPos = i - dotIdx * 9
                    if (i % 9 === 8) return <span key={i} style={{ color: 'var(--border)' }}>.</span>
                    const flatBit = i - dotIdx
                    return (
                      <span key={i} style={{ color: flatBit < prefix ? '#3b82f6' : '#ef4444' }}>{bit}</span>
                    )
                  })}
                  <span style={{ fontSize: 10, color: 'var(--muted)', marginLeft: 10 }}>
                    <span style={{ color: '#3b82f6' }}>■</span> network bits ({prefix})&nbsp;
                    <span style={{ color: '#ef4444' }}>■</span> host bits ({32 - prefix})
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ padding: '20px 22px', color: '#ef4444', fontSize: 13 }}>Invalid IP address — enter in dotted decimal format (e.g., 192.168.1.1)</div>
      )}
    </div>
  )
}

// ── CIDR Supernetting Visualizer ──────────────────────────────────────────────
const CIDR_EXAMPLES = [
  { block: '10.0.0.0/8', desc: 'Class A private — 16,777,214 hosts', hosts: 16777214, subnets: '65536 /24s' },
  { block: '172.16.0.0/12', desc: 'Class B private range — 1,048,574 hosts', hosts: 1048574, subnets: '4096 /24s' },
  { block: '192.168.0.0/16', desc: 'Class C private range — 65,534 hosts', hosts: 65534, subnets: '256 /24s' },
  { block: '192.168.1.0/24', desc: 'Typical home/small office LAN — 254 hosts', hosts: 254, subnets: '—' },
  { block: '192.168.1.0/25', desc: 'Split /24 in half — 126 hosts each', hosts: 126, subnets: '2 × /25' },
  { block: '192.168.1.0/26', desc: 'Quarter /24 — 62 hosts', hosts: 62, subnets: '4 × /26' },
  { block: '192.168.1.0/27', desc: 'Eighth /24 — 30 hosts (switch VLANs)', hosts: 30, subnets: '8 × /27' },
  { block: '192.168.1.0/30', desc: 'Point-to-point WAN link — 2 hosts', hosts: 2, subnets: '64 × /30' },
  { block: '192.168.1.0/31', desc: 'RFC 3021 P2P — 2 hosts, no broadcast', hosts: 2, subnets: 'No broadcast' },
]

export default function IPAddressing() {
  return (
    <LearnLayout
      title="IP Addressing"
      description="IPv4 address structure, CIDR notation, private vs public ranges, subnetting math, special addresses, and how every packet finds its destination."
      section="Networking Fundamentals"
      readTime="27 min"
      updatedAt="May 2026"
    >

      {/* ── PART 1 ── */}
      <Part n="01" title="Why IP Addressing Exists" />

      <P>
        Ethernet MAC addresses solve a local problem: identifying devices on the same network segment. But MAC addresses are flat — they carry no topological information. There is no way to look at a MAC address and determine which continent, country, city, or building the device is in. If the internet used only MAC addresses for routing, every router in the world would need a table entry for every device on earth — billions of entries, updated continuously. This is the <Hl>scalability problem</Hl> that IP addressing solves.
      </P>
      <P>
        <Hl>IP (Internet Protocol) addresses</Hl> are <Hl>hierarchical and topological</Hl>: they encode both the network a device belongs to and the device&apos;s identity within that network. This means a router in Tokyo only needs to know how to reach each <em>network prefix</em> (e.g., &quot;all 192.168.1.x addresses are over there&quot;) rather than every individual device. The internet&apos;s global routing table currently has ~900,000 prefixes — manageable — rather than 5 billion device entries — not manageable. This aggregation property is the entire reason IP addressing works at internet scale.
      </P>

      <HR />

      {/* ── PART 2 ── */}
      <Part n="02" title="IPv4 Address Structure" />

      <P>
        An IPv4 address is a 32-bit number, conventionally written as four decimal octets separated by dots: <code style={{ fontFamily: 'var(--font-mono)', background: 'var(--surface)', padding: '2px 6px', borderRadius: 4, fontSize: 13 }}>192.168.1.1</code>. Each octet represents 8 bits (0–255). The total address space is 2³² = 4,294,967,296 addresses — which seemed vast in 1981 but was exhausted by 2011 due to the explosive growth of the internet and inefficient early allocation.
      </P>

      <H>The Two Parts of Every IP Address</H>
      <P>
        Every IPv4 address consists of two parts: the <Hl>network portion</Hl> (identifies which network the device is on) and the <Hl>host portion</Hl> (identifies the specific device within that network). A <Hl>subnet mask</Hl> or <Hl>prefix length</Hl> determines where the boundary falls. For the address 192.168.1.50/24: the first 24 bits (192.168.1) identify the network, and the last 8 bits (50) identify the host. All devices with addresses in 192.168.1.0/24 are on the same network and can communicate directly without a router.
      </P>

      <div style={{ overflowX: 'auto', margin: '12px 0 28px' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px', minWidth: 540 }}>
          <div style={{ marginBottom: 12 }}>
            <span style={{ color: 'var(--muted)', marginRight: 12 }}>Address:</span>
            <span style={{ color: '#3b82f6' }}>11000000.10101000.00000001</span>
            <span style={{ color: 'var(--border)' }}>.</span>
            <span style={{ color: '#ef4444' }}>00110010</span>
            <span style={{ color: 'var(--muted)', marginLeft: 16 }}>(192.168.1.50)</span>
          </div>
          <div style={{ marginBottom: 12 }}>
            <span style={{ color: 'var(--muted)', marginRight: 12 }}>Mask /24:</span>
            <span style={{ color: '#3b82f6' }}>11111111.11111111.11111111</span>
            <span style={{ color: 'var(--border)' }}>.</span>
            <span style={{ color: '#ef4444' }}>00000000</span>
            <span style={{ color: 'var(--muted)', marginLeft: 16 }}>(255.255.255.0)</span>
          </div>
          <div style={{ display: 'flex', gap: 24, marginTop: 8, padding: '8px 0', borderTop: '1px solid var(--border)' }}>
            <span><span style={{ color: '#3b82f6' }}>■</span> Network bits (24) → identifies the /24 subnet</span>
            <span><span style={{ color: '#ef4444' }}>■</span> Host bits (8) → identifies the specific device</span>
          </div>
        </div>
      </div>

      <H>CIDR Notation</H>
      <P>
        <Hl>CIDR (Classless Inter-Domain Routing)</Hl> notation, defined in RFC 4632, expresses the prefix length as a number after a slash: 192.168.1.0/24. This replaced the original classful system (Classes A, B, and C) which wasted enormous amounts of address space by forcing every network into three fixed sizes (8-bit, 16-bit, or 24-bit host portions). CIDR allows any prefix length from /0 to /32, enabling precise allocation of exactly the number of addresses needed.
      </P>

      <div style={{ overflowX: 'auto', margin: '12px 0 24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 600 }}>
          <thead>
            <tr style={{ background: `${N}12` }}>
              {['Prefix', 'Subnet Mask', 'Addresses', 'Usable Hosts', 'Common Use'].map(h => (
                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: 11, color: N, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', border: '1px solid var(--border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['/8', '255.0.0.0', '16,777,216', '16,777,214', 'Large enterprise, ISP block'],
              ['/16', '255.255.0.0', '65,536', '65,534', 'Campus, data center'],
              ['/20', '255.255.240.0', '4,096', '4,094', 'Large office, AWS default VPC subnet'],
              ['/22', '255.255.252.0', '1,024', '1,022', 'Medium office / floor'],
              ['/24', '255.255.255.0', '256', '254', 'Typical LAN segment'],
              ['/25', '255.255.255.128', '128', '126', 'Half /24 — two halves of a floor'],
              ['/26', '255.255.255.192', '64', '62', 'Department segment'],
              ['/27', '255.255.255.224', '32', '30', 'Small team / IoT zone'],
              ['/28', '255.255.255.240', '16', '14', 'Small management segment'],
              ['/29', '255.255.255.248', '8', '6', 'Very small segment'],
              ['/30', '255.255.255.252', '4', '2', 'Point-to-point WAN link'],
              ['/31', '255.255.255.254', '2', '2', 'P2P RFC 3021 (no broadcast)'],
              ['/32', '255.255.255.255', '1', '1', 'Host route, loopback'],
            ].map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? 'var(--surface)' : 'var(--background)' }}>
                {row.map((cell, j) => (
                  <td key={j} style={{ padding: '9px 14px', border: '1px solid var(--border)', fontFamily: j === 0 ? 'var(--font-mono)' : undefined, fontWeight: j === 0 ? 700 : 400, color: j === 0 ? N : 'var(--text)' }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <HR />

      {/* ── PART 3 ── */}
      <Part n="03" title="Interactive: IP Address Calculator" />

      <IPCalc />

      <HR />

      {/* ── PART 4 ── */}
      <Part n="04" title="Special and Reserved IP Address Ranges" />

      <P>
        Not all IP addresses route to devices on the internet. Large portions of the address space are reserved for specific purposes — using a reserved address range as if it were public routable space causes hard-to-diagnose connectivity failures.
      </P>

      <div style={{ overflowX: 'auto', margin: '12px 0 24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 700 }}>
          <thead>
            <tr style={{ background: `${N}12` }}>
              {['Range', 'Name', 'RFC', 'Description'].map(h => (
                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: 11, color: N, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', border: '1px solid var(--border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['10.0.0.0/8', 'RFC 1918 Private', '1918', 'Largest private block: 16.7M addresses. Common in large enterprises, cloud provider VPCs, and home/office LANs.'],
              ['172.16.0.0/12', 'RFC 1918 Private', '1918', '1M addresses (172.16.x.x through 172.31.x.x). Less commonly used but standard in corporate networks and Docker default bridge.'],
              ['192.168.0.0/16', 'RFC 1918 Private', '1918', '65K addresses. Default in consumer routers (192.168.0.x, 192.168.1.x). The most immediately recognizable private range.'],
              ['127.0.0.0/8', 'Loopback', '1122', 'localhost — any packet sent to 127.x.x.x is delivered locally without leaving the host. 127.0.0.1 is the canonical loopback address.'],
              ['169.254.0.0/16', 'Link-Local (APIPA)', '3927', 'Automatic Private IP Addressing — assigned by OS when DHCP fails. A 169.254.x.x address means DHCP is broken.'],
              ['100.64.0.0/10', 'Shared Address Space', '6598', 'Reserved for ISP NAT infrastructure (Carrier-Grade NAT). Not routable on the public internet or most private networks.'],
              ['0.0.0.0/8', 'This network', '1122', '0.0.0.0 = &quot;any&quot; or &quot;unspecified&quot;. Used as a default route (0.0.0.0/0) or in DHCP before an address is assigned.'],
              ['240.0.0.0/4', 'Reserved', '1112', 'Originally &quot;Class E&quot; — reserved for future use, never deployed. Not routable anywhere.'],
              ['224.0.0.0/4', 'Multicast', '3171', '224.0.0.0–239.255.255.255. Used by routing protocols (224.0.0.5=OSPF, 224.0.0.9=RIP), mDNS (224.0.0.251), and multicast streaming.'],
              ['255.255.255.255/32', 'Limited Broadcast', '919', 'Broadcast to all devices on the local segment. Routers do not forward this — it cannot cross a router boundary.'],
            ].map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? 'var(--surface)' : 'var(--background)' }}>
                <td style={{ padding: '9px 14px', border: '1px solid var(--border)', fontFamily: 'var(--font-mono)', fontWeight: 700, color: N, whiteSpace: 'nowrap' }}>{row[0]}</td>
                <td style={{ padding: '9px 14px', border: '1px solid var(--border)', fontWeight: 600, color: 'var(--text)' }}>{row[1]}</td>
                <td style={{ padding: '9px 14px', border: '1px solid var(--border)', fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>RFC {row[2]}</td>
                <td style={{ padding: '9px 14px', border: '1px solid var(--border)', color: 'var(--text)', lineHeight: 1.5 }} dangerouslySetInnerHTML={{ __html: row[3] }} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Err title="Using public IP ranges internally">
        Using real public IP addresses (e.g., 8.8.8.8/24) as internal network addresses causes internet connectivity failures: packets destined for Google&apos;s 8.8.8.8 (DNS) will be routed internally and never reach Google. This happened in real enterprise environments where an IT admin &quot;borrowed&quot; a public range that they thought would never appear internally. Always use RFC 1918 private ranges for internal addressing, or the 100.64.0.0/10 shared space for ISP infrastructure.
      </Err>

      <HR />

      {/* ── PART 5 ── */}
      <Part n="05" title="Subnetting: Dividing Networks" />

      <P>
        <Hl>Subnetting</Hl> is the process of dividing a larger IP address block into smaller sub-networks. You start with a network block like 192.168.1.0/24 (256 addresses) and split it to create 192.168.1.0/25 (128 addresses) and 192.168.1.128/25 (128 addresses). Each subnet requires one address for the network identifier and one for the broadcast address — the usable host count is always <code style={{ fontFamily: 'var(--font-mono)', background: 'var(--surface)', padding: '2px 5px', borderRadius: 3, fontSize: 12 }}>2ⁿ − 2</code> where n is the number of host bits.
      </P>

      <H>The Subnetting Formula</H>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10, margin: '16px 0 24px' }}>
        {[
          { formula: '2^n', name: 'Subnets created', desc: 'n = bits borrowed from host portion. Borrowing 2 bits from a /24 creates 2² = 4 subnets.' },
          { formula: '2^h − 2', name: 'Usable hosts/subnet', desc: 'h = host bits remaining. A /26 has 6 host bits: 2⁶ − 2 = 62 hosts.' },
          { formula: '256 − mask_octet', name: 'Block size', desc: 'For /26: mask octet = 192, block = 256−192 = 64. Subnets are: .0, .64, .128, .192' },
        ].map(item => (
          <div key={item.formula} style={{ background: 'var(--surface)', border: `1px solid ${N}30`, borderRadius: 10, padding: '16px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 900, color: N, marginBottom: 6 }}>{item.formula}</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>{item.name}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>{item.desc}</div>
          </div>
        ))}
      </div>

      <H>Worked Example: Subnet 192.168.10.0/24 for 4 departments</H>
      <P>
        Requirements: 4 departments needing 50 hosts, 50 hosts, 25 hosts, and 10 hosts respectively. Start with 192.168.10.0/24.
      </P>

      <div style={{ overflowX: 'auto', margin: '12px 0 24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 640 }}>
          <thead>
            <tr style={{ background: `${N}12` }}>
              {['Department', 'Hosts needed', 'Min prefix', 'Subnet assigned', 'Usable range', 'Hosts available'].map(h => (
                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: 11, color: N, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', border: '1px solid var(--border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Engineering', '50', '/26 (62 hosts)', '192.168.10.0/26', '192.168.10.1–62', '62'],
              ['Sales', '50', '/26 (62 hosts)', '192.168.10.64/26', '192.168.10.65–126', '62'],
              ['HR', '25', '/27 (30 hosts)', '192.168.10.128/27', '192.168.10.129–158', '30'],
              ['IT Mgmt', '10', '/28 (14 hosts)', '192.168.10.160/28', '192.168.10.161–174', '14'],
            ].map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? 'var(--surface)' : 'var(--background)' }}>
                {row.map((cell, j) => (
                  <td key={j} style={{ padding: '9px 14px', border: '1px solid var(--border)', fontFamily: j >= 3 ? 'var(--font-mono)' : undefined, fontWeight: j === 0 ? 700 : 400, color: j === 3 ? N : 'var(--text)' }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <P>
        Remaining address space 192.168.10.176/28 through 192.168.10.255 is available for future growth. This is <Hl>VLSM (Variable Length Subnet Masking)</Hl> — different subnets have different prefix lengths based on actual needs, rather than all subnets being the same size (which wastes addresses).
      </P>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 10, margin: '16px 0 24px' }}>
        {CIDR_EXAMPLES.map(ex => (
          <div key={ex.block} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 14px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: N, marginBottom: 4 }}>{ex.block}</div>
            <div style={{ fontSize: 12, color: 'var(--text)', marginBottom: 4 }}>{ex.desc}</div>
            <div style={{ fontSize: 11, color: 'var(--muted)' }}>Can be split into: {ex.subnets}</div>
          </div>
        ))}
      </div>

      <ProTip>
        The fastest subnetting mental shortcut: memorize block sizes for common prefixes. /24 = 256 addresses (block 256), /25 = 128 (block 128), /26 = 64 (block 64), /27 = 32 (block 32), /28 = 16 (block 16), /29 = 8 (block 8), /30 = 4 (block 4). Each successive /1 halves the block. Then: subnet boundaries are multiples of the block size. A /26 has blocks at .0, .64, .128, .192. A /27 has blocks at .0, .32, .64, .96, .128, .160, .192, .224.
      </ProTip>

      <HR />

      {/* ── PART 6 ── */}
      <Part n="06" title="Public vs Private Addressing and NAT" />

      <P>
        The internet uses <Hl>public IP addresses</Hl> — globally unique addresses assigned by IANA and regional registries (ARIN, RIPE, APNIC) that are routable on the public internet. <Hl>Private IP addresses</Hl> (RFC 1918) are not routable on the public internet — routers on the internet drop packets with private source or destination addresses. This means private addresses can be reused in thousands of different organizations without conflict.
      </P>
      <P>
        The mechanism that makes private addressing work for internet access is <Hl>NAT (Network Address Translation)</Hl>. A NAT device (typically a router or firewall) translates private source addresses to a public IP address when traffic exits to the internet, and maintains a translation table to reverse the mapping when responses arrive. The most common form is <Hl>PAT (Port Address Translation)</Hl>, also called &quot;NAT overload&quot; — multiple private addresses share a single public IP, distinguished by different source port numbers. Your home router and most enterprise firewalls use PAT: thousands of internal devices share one (or a pool of) public IPs.
      </P>

      <H>NAT Translation Table Example</H>
      <div style={{ overflowX: 'auto', margin: '12px 0 24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 640 }}>
          <thead>
            <tr style={{ background: `${N}12` }}>
              {['Inside Local', 'Inside Global', 'Outside Global', 'Protocol'].map(h => (
                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: 11, color: N, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', border: '1px solid var(--border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['192.168.1.10:52431', '203.0.113.5:52431', '93.184.216.34:443', 'TCP (HTTPS)'],
              ['192.168.1.11:49201', '203.0.113.5:49201', '8.8.8.8:53', 'UDP (DNS)'],
              ['192.168.1.10:52432', '203.0.113.5:52432', '172.217.22.3:443', 'TCP (HTTPS)'],
              ['192.168.1.50:61111', '203.0.113.5:61111', '13.107.42.14:443', 'TCP (Teams)'],
            ].map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? 'var(--surface)' : 'var(--background)' }}>
                {row.map((cell, j) => (
                  <td key={j} style={{ padding: '9px 14px', border: '1px solid var(--border)', fontFamily: 'var(--font-mono)', fontSize: 12, color: j === 1 ? N : 'var(--text)' }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <P>
        The NAT device rewrites the source IP from 192.168.1.10 to 203.0.113.5 (the public IP) in outbound packets and rewrites the destination back to 192.168.1.10 in inbound reply packets, using the port number to identify which internal host the reply belongs to. The outside server (93.184.216.34) only sees the public IP 203.0.113.5 — it has no knowledge of the private address behind it.
      </P>

      <Err title="NAT providing meaningful security">
        NAT is not a firewall. PAT&apos;s translation table does prevent unsolicited inbound connections from reaching internal hosts (because there&apos;s no pre-existing translation entry), but this is a side effect of the address translation, not a security mechanism. A stateful firewall provides actual security through explicit allow/deny rules and connection tracking. Devices behind NAT are still fully reachable via established outbound connections, vulnerable to malicious content in HTTP/HTTPS responses, and exposed to any application that sets up a return path (P2P, STUN/ICE for WebRTC). &quot;NAT for security&quot; is security theater; deploy a proper stateful firewall.
      </Err>

      <HR />

      {/* ── PART 7 ── */}
      <Part n="07" title="The Address Exhaustion Problem and IPv6" />

      <P>
        IANA allocated the last IPv4 /8 blocks to regional registries in 2011. APNIC (Asia-Pacific) ran out of free space in 2011, ARIN (Americas) in 2015, RIPE (Europe) in 2019. IPv4 addresses are now only available via purchase on the secondary market at ~$50/address. The long-term solution is <Hl>IPv6</Hl> — a 128-bit address space with 2¹²⁸ = 340 undecillion addresses (3.4 × 10³⁸). That is enough to assign multiple addresses to every atom on the surface of the earth.
      </P>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, margin: '16px 0 28px' }}>
        {[
          {
            name: 'IPv4',
            bits: '32 bits',
            space: '~4.3 billion (4.3 × 10⁹)',
            notation: '192.168.1.1 (dotted decimal)',
            header: '20 bytes minimum, variable with options',
            broadcast: 'Yes — limited and directed broadcast',
            nat: 'Required at scale',
            config: 'DHCP or manual',
            status: 'Exhausted since 2019',
          },
          {
            name: 'IPv6',
            bits: '128 bits',
            space: '340 undecillion (3.4 × 10³⁸)',
            notation: '2001:db8::1 (colon-hex)',
            header: '40 bytes fixed, no options (extension headers)',
            broadcast: 'No — replaced by multicast and anycast',
            nat: 'Not needed — every device gets a global address',
            config: 'SLAAC (auto) or DHCPv6',
            status: 'Active deployment (~40% of internet traffic)',
          },
        ].map(item => (
          <div key={item.name} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '18px 20px' }}>
            <div style={{ fontSize: 15, fontWeight: 900, color: 'var(--text)', marginBottom: 14, paddingBottom: 10, borderBottom: '1px solid var(--border)' }}>{item.name}</div>
            {[
              ['Address size', item.bits],
              ['Address space', item.space],
              ['Notation', item.notation],
              ['Header size', item.header],
              ['Broadcast', item.broadcast],
              ['NAT', item.nat],
              ['Status', item.status],
            ].map(([label, value]) => (
              <div key={label as string} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid var(--border)', fontSize: 12, gap: 8 }}>
                <span style={{ color: 'var(--muted)', flexShrink: 0 }}>{label}</span>
                <span style={{ color: 'var(--text)', fontWeight: 600, textAlign: 'right' }}>{value}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <ProTip>
        Dual-stack deployment is the current industry standard for IPv6 migration: every device and network interface has both an IPv4 and IPv6 address. Client devices prefer IPv6 when both are available (RFC 6724 default address selection rules, &quot;Happy Eyeballs&quot; RFC 6555 for browsers). Cloud providers (AWS, GCP, Azure) now default to dual-stack VPCs. Google reports ~45% of its traffic is IPv6 as of 2025.
      </ProTip>

      <HR />

      {/* ── PART 8 ── */}
      <Part n="08" title="Day in the Life — Google SRE: IP Address Conflict Causes VM Connectivity Failure" />

      <P>
        <strong>Company:</strong> Google Cloud · <strong>Role:</strong> Site Reliability Engineer (Networking) · <strong>Location:</strong> Remote (GCP NOC) · <strong>Date:</strong> Thursday, November 14, 2024
      </P>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', margin: '20px 0 28px' }}>
        <p style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)', margin: '0 0 12px' }}>INCIDENT: Customer VMs in us-central1 reporting intermittent connection drops to internal services</p>

        <TimeBlock time="14:32 UTC" label="Customer ticket escalated — VM packet loss to database tier">
          A Google Cloud customer escalates a Severity-1 ticket: their production application in us-central1 VMs intermittently cannot reach their Cloud SQL database. The pattern is unusual — connections succeed for 30–60 seconds then drop, then recover, then drop again. The application tier (VMs in subnet 10.128.0.0/20) needs to reach the database tier (Cloud SQL proxy at 10.128.5.10). Ping shows alternating success and failure, not consistent loss.
        </TimeBlock>

        <TimeBlock time="14:41 UTC" label="Initial hypothesis: SRE checks VPC flow logs">
          The on-call SRE pulls VPC flow logs for the affected VMs. The logs show that TCP flows are being established successfully but then RST (reset) packets appear from the 10.128.5.10 destination. This rules out a routing problem (the packets are reaching the destination) and points toward an identity or connection issue — the remote end is actively resetting the connection, suggesting it is receiving packets it did not expect.
        </TimeBlock>

        <TimeBlock time="14:47 UTC" label="Root cause discovered — duplicate IP address">
          The SRE notices that VPC flow logs show two different source MAC addresses for packets arriving at 10.128.5.10 from IP 10.128.5.10 itself — packets are originating from 10.128.5.10 but with a MAC address that does not belong to the Cloud SQL proxy instance. A second VM has been misconfigured with a static IP of 10.128.5.10, conflicting with the Cloud SQL proxy. Google Cloud typically prevents this via DHCP reservation and API enforcement, but this customer was using a manual network configuration script that bypassed the API. The conflicting VM was a new database replica that was assigned the wrong static IP during provisioning.
        </TimeBlock>

        <TimeBlock time="14:52 UTC" label="ARP conflict dynamics explained">
          Both VMs are sending ARP replies claiming ownership of 10.128.5.10. Other hosts in the subnet are receiving conflicting ARP entries and flipping between both MACs — whichever sent the most recent gratuitous ARP &quot;wins&quot; for 300 seconds (the ARP cache timeout). When the application server&apos;s ARP cache points to the replica&apos;s MAC, TCP connections hit the wrong VM and get RST. When it points to the Cloud SQL proxy, connections work. The 30–60 second pattern matches the interleaving of gratuitous ARPs from both VMs, which each send them approximately every 60 seconds.
        </TimeBlock>

        <TimeBlock time="14:58 UTC" label="Resolution — reconfigure replica to correct IP">
          The customer is guided to change the replica VM&apos;s static IP to the correct reserved address (10.128.5.11, which was always the intended address — a typo had substituted 10 for 11). After the configuration change, the replica sends a gratuitous ARP for 10.128.5.11 and stops claiming 10.128.5.10. The ARP caches across the subnet converge to the correct mapping within 60 seconds. Connectivity to Cloud SQL is restored. Total customer impact: approximately 20 minutes of intermittent failures. Postmortem action: Cloud&apos;s provisioning API should validate static IPs against existing reservations even in manual configuration workflows; the oversight is that the validation was skipped when the customer used a configuration file rather than the web console.
        </TimeBlock>
      </div>

      <Err title="Not understanding how ARP causes IP conflicts">
        IP address conflicts cause intermittent, mysterious connectivity failures rather than clean failures. When two devices share an IP, both respond to ARP queries with different MACs, and other hosts&apos; ARP caches flip between the two based on whichever ARP reply arrived most recently. The result is random-seeming connectivity — connections to the IP work sometimes and fail other times based on which MAC is currently cached. The diagnostic is: check ARP tables on devices experiencing the issue (<code style={{ fontFamily: 'var(--font-mono)', background: 'var(--surface)', padding: '2px 5px', borderRadius: 3, fontSize: 12 }}>arp -a</code>) and look for the same IP with multiple MAC addresses appearing in the output over time.
      </Err>

      <HR />

      {/* ── PART 9 ── */}
      <Part n="09" title="Interview Prep — 8 Questions With Complete Answers" />

      <IQ q="What is the difference between a network address, a host address, and a broadcast address?">
        <p style={{ margin: '0 0 14px' }}>For any subnet, three addresses have special meaning. The <strong>network address</strong> (also called the subnet address) has all host bits set to 0 — it identifies the subnet itself, not any device. For 192.168.1.0/24: network address = 192.168.1.0. You cannot assign this to a device. The <strong>broadcast address</strong> has all host bits set to 1 — packets sent to this address are delivered to all devices in the subnet. For 192.168.1.0/24: broadcast = 192.168.1.255. Also cannot be assigned to a device. <strong>Host addresses</strong> are everything in between: 192.168.1.1 through 192.168.1.254 for a /24.</p>
        <p style={{ margin: 0 }}>This is why a /24 provides 254 usable hosts (256 addresses minus 2), a /25 provides 126 (128 minus 2), and so on. For point-to-point links, /31 (RFC 3021) eliminates the broadcast address — both addresses are host addresses — giving 2 usable hosts with no wasted addresses. A /30 wastes 2 addresses (network + broadcast) on a link with only 2 devices. In IPv6, there are no broadcast addresses — multicast and anycast replace broadcast entirely.</p>
      </IQ>

      <IQ q="What is CIDR and why did it replace classful addressing?">
        <p style={{ margin: '0 0 14px' }}>The original IPv4 addressing used three &quot;classes&quot;: Class A (first octet 0–127, /8 prefix = 16.7M hosts), Class B (128–191, /16 = 65K hosts), and Class C (192–223, /24 = 254 hosts). Every organization was assigned one of these fixed-size blocks. The problem: a company needing 300 hosts was assigned a Class B (65,534 hosts), wasting 65,234 addresses. A company needing 300 hosts could not get a Class C (254 max) but did not need a Class B. This caused catastrophic address waste and contributed directly to IPv4 exhaustion.</p>
        <p style={{ margin: '0 0 14px' }}>CIDR (RFC 4632, 1993) introduced variable-length prefix notation and classless routing. Instead of fixed /8, /16, or /24 boundaries, any prefix length (/0 through /32) could be used. A company needing 300 hosts gets a /23 (510 hosts) instead of a /16. ISPs could aggregate many small blocks into a single routing table advertisement (route summarization). The internet routing table was consuming 80,000 entries by 1993 and growing; CIDR stopped the growth and reduced the table size.</p>
        <p style={{ margin: 0 }}>The practical outcome: all modern network addressing uses CIDR notation. Classful addressing is only relevant for understanding RFC 1918 private ranges (which were defined in the classful era and have classful boundaries) and legacy documentation.</p>
      </IQ>

      <IQ q="Explain RFC 1918 private addressing. Why can't you use private addresses on the public internet?">
        <p style={{ margin: '0 0 14px' }}>RFC 1918 defines three address ranges as private (non-routable): 10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16. These addresses are not assigned to any organization — any network can use them internally, and thousands of organizations do, reusing the same ranges simultaneously without conflict.</p>
        <p style={{ margin: '0 0 14px' }}>They cannot be used on the public internet because they are not globally unique. If 50 companies all use 192.168.1.1 internally (they do), routers on the internet would have no way to distinguish which 192.168.1.1 a packet is destined for. Internet routers simply drop packets with private source or destination addresses — they are configured to filter RFC 1918 space at their ingress and egress interfaces.</p>
        <p style={{ margin: 0 }}>The mechanism that allows private addresses to access the internet is NAT. A firewall at the network boundary translates private source addresses to the organization&apos;s public IP when traffic exits, and reverses the translation for replies. From the internet&apos;s perspective, all traffic comes from the public IP, not the private address. NAT is the reason a home with 20 devices can share one ISP-assigned public IP address.</p>
      </IQ>

      <IQ q="How do you subnet 192.168.5.0/24 into subnets that can each support 30 hosts?">
        <p style={{ margin: '0 0 14px' }}>To support 30 hosts per subnet, you need at least 32 addresses per subnet (30 hosts + 1 network + 1 broadcast). 2⁵ = 32, so you need 5 host bits. Prefix length = 32 − 5 = /27. A /27 provides 2⁵ − 2 = 30 usable hosts exactly.</p>
        <p style={{ margin: '0 0 14px' }}>Borrowing 3 bits from the host portion of a /24 creates 2³ = 8 subnets. The block size for a /27 is 256 − 224 = 32. Subnets:</p>
        <ul style={{ margin: '0 0 14px', paddingLeft: 24, lineHeight: 2 }}>
          <li>192.168.5.0/27 → .1–.30 (usable), .31 broadcast</li>
          <li>192.168.5.32/27 → .33–.62, .63 broadcast</li>
          <li>192.168.5.64/27 → .65–.94, .95 broadcast</li>
          <li>192.168.5.96/27 → .97–.126, .127 broadcast</li>
          <li>192.168.5.128/27 → .129–.158, .159 broadcast</li>
          <li>192.168.5.160/27 → .161–.190, .191 broadcast</li>
          <li>192.168.5.192/27 → .193–.222, .223 broadcast</li>
          <li>192.168.5.224/27 → .225–.254, .255 broadcast</li>
        </ul>
        <p style={{ margin: 0 }}>Result: 8 subnets × 30 usable hosts = 240 hosts maximum from the original /24 (with 16 addresses consumed as network and broadcast identifiers).</p>
      </IQ>

      <IQ q="What is the difference between a /30 and a /31 subnet? When would you use each?">
        <p style={{ margin: '0 0 14px' }}>A /30 has 4 addresses: 1 network, 2 usable hosts, 1 broadcast. Example: 10.0.0.0/30 → network 10.0.0.0, hosts 10.0.0.1 and 10.0.0.2, broadcast 10.0.0.3. This is the traditional choice for point-to-point WAN links (e.g., a serial link between a router and an ISP hand-off). It wastes 2 addresses per link — on a network with thousands of WAN links, that adds up.</p>
        <p style={{ margin: '0 0 14px' }}>A /31 (RFC 3021) has 2 addresses: both are host addresses, no network or broadcast designator. Example: 10.0.0.0/31 → hosts 10.0.0.0 and 10.0.0.1. This is valid because on a point-to-point link there are exactly two devices; there is no need for a broadcast address (broadcast on a P2P link would reach only one other device, so just unicast to it directly). RFC 3021 was controversial in 1992 but is now universally supported on modern routers and switches.</p>
        <p style={{ margin: 0 }}>Use /30 for older equipment that may not support /31, or when the extra 2-address waste doesn&apos;t matter. Use /31 for modern P2P links in address-constrained environments. ISPs routinely use /31 for router interconnects to conserve address space.</p>
      </IQ>

      <IQ q="What is ARP and what security risks does it present?">
        <p style={{ margin: '0 0 14px' }}>ARP (Address Resolution Protocol, RFC 826) maps IPv4 addresses to MAC addresses. When a device wants to send to 192.168.1.1 but only knows the IP, it broadcasts an ARP request: &quot;Who has 192.168.1.1? Tell 192.168.1.50.&quot; The device owning 192.168.1.1 responds with its MAC address. The requesting device caches the mapping for 300 seconds (default ARP timeout).</p>
        <p style={{ margin: '0 0 14px' }}>ARP has no authentication. Any device can send an ARP reply claiming to own any IP address, and most devices will update their ARP cache with the new mapping. A <strong>gratuitous ARP</strong> is an unsolicited ARP reply — a device can broadcast &quot;I now have IP X with MAC Y&quot; to update all caches in the subnet, used legitimately when a device moves or changes IPs. Attackers exploit this with ARP poisoning (ARP spoofing): continuously send gratuitous ARPs claiming to be the default gateway, poisoning all devices&apos; caches to send traffic to the attacker instead.</p>
        <p style={{ margin: 0 }}>Defenses: (1) Dynamic ARP Inspection (DAI) on switches — validates ARP packets against the DHCP snooping binding table, dropping ARPs with invalid IP-MAC mappings; (2) Static ARP entries for critical hosts (default gateway) — these don&apos;t expire and can&apos;t be overwritten by gratuitous ARPs (manual management overhead); (3) Private VLANs that prevent devices in the same VLAN from communicating directly at Layer 2 (isolated ports). In IPv6, ARP is replaced by NDP (Neighbor Discovery Protocol), which uses ICMPv6 and has optional cryptographic protection via SEND (Secure Neighbor Discovery).</p>
      </IQ>

      <IQ q="What is VLSM and why is it important?">
        <p style={{ margin: '0 0 14px' }}>VLSM (Variable Length Subnet Masking) allows different subnets within the same address space to have different prefix lengths — rather than requiring all subnets to be the same size. Before VLSM, a network with three segments needing 100 hosts, 50 hosts, and 2 hosts would need three identical /25 subnets (128 addresses each), wasting 76 + 76 + 126 = 278 addresses on the two smaller segments.</p>
        <p style={{ margin: '0 0 14px' }}>With VLSM: allocate /25 for the 100-host segment (126 hosts), /26 for the 50-host segment (62 hosts), and /30 for the 2-host P2P link. This uses addresses efficiently and leaves the remaining space available for future growth.</p>
        <p style={{ margin: 0 }}>VLSM requires a routing protocol that carries the prefix length in its routing updates — classless routing protocols (OSPF, EIGRP, RIP v2, BGP) support this. Classful protocols (RIP v1) assumed all subnets of a major network used the same prefix length — they could not support VLSM. This is one reason RIP v1 became obsolete. All modern networks use VLSM as standard practice.</p>
      </IQ>

      <IQ q="You see a device with IP address 169.254.48.22. What does this tell you?">
        <p style={{ margin: '0 0 14px' }}>169.254.0.0/16 is the APIPA (Automatic Private IP Addressing) range, defined in RFC 3927. A device self-assigns an address in this range when it attempts DHCP and receives no response. The device sends DHCP discover broadcasts for 60–120 seconds (depending on OS implementation); if no DHCP offer arrives, it assigns itself a random 169.254.x.x address using ARP probing to verify uniqueness on the segment.</p>
        <p style={{ margin: '0 0 14px' }}>Seeing a 169.254.x.x address immediately tells you DHCP has failed. The device cannot communicate with anything outside the local segment (169.254.0.0/16 is not routed), so it effectively has no internet or network access beyond devices also using APIPA addresses on the same segment.</p>
        <p style={{ margin: 0 }}>Diagnosis: check whether the DHCP server is up and reachable from that port, verify the switch port is in the correct VLAN (wrong VLAN = no path to DHCP server), check for DHCP pool exhaustion (all addresses allocated), and verify the DHCP relay agent is configured correctly if the DHCP server is on a different subnet. APIPA addresses are also used by macOS and Linux in the &quot;link-local&quot; context — valid for device-to-device communication without any infrastructure (e.g., two laptops directly connected).</p>
      </IQ>

      <HR />

      {/* ── PART 10 ── */}
      <Part n="10" title="Common Misconceptions" />

      <Err title="Confusing subnet mask and wildcard mask">
        Subnet masks and wildcard masks are inverses of each other but used in completely different contexts. A subnet mask of 255.255.255.0 (/24) means &quot;the first 24 bits identify the network.&quot; A wildcard mask of 0.0.0.255 is used in Cisco ACLs and OSPF network statements — it means &quot;match any value in these bit positions.&quot; Wildcard mask = bitwise NOT of subnet mask: 255.255.255.0 → wildcard 0.0.0.255. They look similar but work oppositely: in a subnet mask, 1s = network bits; in a wildcard mask, 0s = must-match bits, 1s = don&apos;t-care bits.
      </Err>

      <Err title="Thinking all devices on the same IP network can always communicate">
        Two devices with IPs in the same subnet can communicate directly at Layer 2 only if they are in the same Layer 2 broadcast domain (VLAN). If they are in different VLANs but have IPs in the same subnet, their traffic must go through a router to cross the VLAN boundary — which may or may not be configured. In cloud environments (AWS VPCs, GCP VPCs), the same-subnet rule applies within a VPC subnet, but security groups and network ACLs can block traffic between hosts in the same subnet at Layer 4 regardless of Layer 3 topology. Never assume &quot;same subnet = reachable.&quot;
      </Err>

      <Err title="The /32 host route is unusual or invalid">
        A /32 route is perfectly valid and extremely common. It represents exactly one host (&apos;255.255.255.255 mask). Loopback interfaces are always /32. BGP advertises individual server addresses as /32s from anycast nodes. Static host routes (/32) are used to override routing decisions for specific IPs. OSPF and other protocols create /32 routes for router loopback addresses. In cloud networking, VMs are often reached via /32 host routes in the VPC routing fabric. The /32 is not unusual — it is a regular routing construct with well-defined semantics.
      </Err>

      <HR />

      <KeyTakeaways items={[
        'IPv4 addresses are 32-bit numbers written as four decimal octets (0–255). The prefix length (/0–/32) defines where the network portion ends and the host portion begins.',
        'Network address = all host bits 0 (not assignable). Broadcast address = all host bits 1 (not assignable). Usable hosts = 2^(host bits) − 2.',
        'CIDR replaced classful A/B/C addressing, enabling variable-length subnets and route aggregation that keeps the internet routing table manageable at ~900K prefixes.',
        'RFC 1918 private ranges (10/8, 172.16/12, 192.168/16) are reusable across organizations and not routable on the public internet. NAT/PAT translates them for internet access.',
        'Special ranges: 127.0.0.0/8 = loopback, 169.254.0.0/16 = APIPA (DHCP failed), 224.0.0.0/4 = multicast, 100.64.0.0/10 = carrier NAT. Using wrong ranges causes silent failures.',
        '/30 = 4 addresses, 2 usable hosts (network + broadcast). /31 (RFC 3021) = 2 host addresses, no broadcast — preferred for P2P links on modern equipment.',
        'VLSM allows different subnets to have different prefix lengths, matching allocation size to actual need. Required by all modern routing protocols (OSPF, EIGRP, BGP).',
        'ARP maps IPv4 to MAC addresses with no authentication. ARP poisoning is mitigated by Dynamic ARP Inspection (DAI) and DHCP snooping on switches.',
        'IPv4 exhaustion is real — IANA exhausted the free pool in 2011. IPv6 (128-bit, 3.4×10³⁸ addresses) is the long-term solution; dual-stack deployment is current best practice.',
        'A 169.254.x.x address always means DHCP failed. Diagnose DHCP server availability, VLAN assignment, DHCP relay configuration, and IP pool exhaustion.',
      ]} />

    </LearnLayout>
  )
}
