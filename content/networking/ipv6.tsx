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

const Term = ({ t, children }: { t: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', gap: 12, marginBottom: 16, alignItems: 'flex-start' }}>
    <code style={{ fontSize: 12, background: `${N}15`, color: N, padding: '3px 8px', borderRadius: 5, flexShrink: 0, marginTop: 2 }}>{t}</code>
    <span style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>{children}</span>
  </div>
)

function IPv6Compressor() {
  const [input, setInput] = useState('2001:0db8:0000:0000:0001:0000:0000:0001')
  const [result, setResult] = useState<{ compressed: string; expanded: string; type: string } | null>(null)

  function compress(addr: string) {
    const parts = addr.split(':')
    if (parts.length !== 8) return null
    const normalized = parts.map(p => p.replace(/^0+/, '') || '0')
    let bestStart = -1, bestLen = 0, curStart = -1, curLen = 0
    for (let i = 0; i <= 8; i++) {
      if (i < 8 && normalized[i] === '0') {
        if (curStart === -1) { curStart = i; curLen = 1 } else curLen++
      } else {
        if (curLen > bestLen) { bestStart = curStart; bestLen = curLen }
        curStart = -1; curLen = 0
      }
    }
    let compressed: string[]
    if (bestStart !== -1 && bestLen > 1) {
      const before = normalized.slice(0, bestStart)
      const after = normalized.slice(bestStart + bestLen)
      compressed = [...before, '', ...after]
      if (compressed[0] === '') compressed.unshift('')
      if (compressed[compressed.length - 1] === '') compressed.push('')
    } else {
      compressed = normalized
    }
    const compressedStr = compressed.join(':')

    const expanded = parts.map(p => p.padStart(4, '0')).join(':')

    let type = 'Global Unicast'
    if (addr.startsWith('::1')) type = 'Loopback'
    else if (addr.toLowerCase().startsWith('fe80')) type = 'Link-local'
    else if (addr.toLowerCase().startsWith('fc') || addr.toLowerCase().startsWith('fd')) type = 'Unique Local (ULA)'
    else if (addr.toLowerCase().startsWith('ff')) type = 'Multicast'
    else if (addr === '::') type = 'Unspecified'
    else if (addr.toLowerCase().startsWith('2001:0db8') || addr.toLowerCase().startsWith('2001:db8')) type = 'Documentation (RFC 3849)'
    else if (addr.toLowerCase().startsWith('2002')) type = '6to4 Transition'
    else if (addr.toLowerCase().startsWith('2001:')) type = 'Global Unicast (incl. Teredo if 2001::/32)'

    return { compressed: compressedStr, expanded, type }
  }

  function analyze() {
    const r = compress(input.trim())
    setResult(r)
  }

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: N, fontFamily: 'var(--font-mono)', margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '.1em' }}>IPv6 Address Analyzer</p>
      <div style={{ display: 'flex', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="2001:0db8:0000:0000:0001:0000:0000:0001"
          style={{ flex: 1, minWidth: 280, background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 6, padding: '8px 12px', color: 'var(--text)', fontSize: 13, fontFamily: 'var(--font-mono)' }}
        />
        <button onClick={analyze} style={{ background: N, color: '#000', border: 'none', borderRadius: 6, padding: '8px 18px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Analyze</button>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
        {['2001:0db8:0000:0000:0001:0000:0000:0001', 'fe80:0000:0000:0000:0202:b3ff:fe1e:8329', 'fc00:0000:0000:0001:0000:0000:0000:0001', 'ff02:0000:0000:0000:0000:0000:0000:0001', '0000:0000:0000:0000:0000:0000:0000:0001'].map(ex => (
          <button key={ex} onClick={() => setInput(ex)} style={{ fontSize: 11, background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 4, padding: '4px 8px', color: 'var(--muted)', cursor: 'pointer', fontFamily: 'var(--font-mono)' }}>{ex.slice(0, 16)}…</button>
        ))}
      </div>
      {result && (
        <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 8, padding: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '8px 16px', fontSize: 13 }}>
            <span style={{ color: 'var(--muted)' }}>Expanded:</span>
            <code style={{ color: 'var(--text)', fontFamily: 'var(--font-mono)' }}>{result.expanded}</code>
            <span style={{ color: 'var(--muted)' }}>Compressed:</span>
            <code style={{ color: N, fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{result.compressed}</code>
            <span style={{ color: 'var(--muted)' }}>Type:</span>
            <span style={{ color: 'var(--text)', fontWeight: 700 }}>{result.type}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default function IPv6Module() {
  return (
    <LearnLayout
      title="IPv6 — The 128-bit Internet"
      description="IPv4 ran out in 2011. IPv6 with its 340 undecillion addresses has been deploying for over a decade. Understand addressing, transition mechanisms, and why the migration is still incomplete."
      section="Networking Fundamentals"
      readTime="22 min"
      updatedAt="May 2026"
    >
      <Part n="01" title="Why IPv4 Ran Out" />
      <P>
        IPv4 uses 32-bit addresses — yielding 2³² = approximately 4.3 billion unique addresses. When IPv4 was designed in 1981, 4.3 billion seemed like an astronomical number. By 2011, IANA (the Internet Assigned Numbers Authority) allocated the last IPv4 blocks to regional registries. APNIC (Asia-Pacific) ran out the same year. ARIN (North America) reached exhaustion in 2015. Today, organizations acquiring IPv4 addresses buy them on a secondary market, paying $40–$60 per address.
      </P>
      <P>
        The interim solution has been <Hl>NAT (Network Address Translation)</Hl> — hiding many private addresses behind a single public IP. But NAT breaks the end-to-end principle of the internet: applications that require direct peer connections (VoIP, gaming, IoT) struggle with NAT traversal. The permanent solution is <Hl>IPv6</Hl>, defined in RFC 2460 (1998, updated by RFC 8200 in 2017), with its 128-bit addresses providing 2¹²⁸ ≈ 340 undecillion unique addresses — enough to assign billions of addresses to every atom on Earth's surface.
      </P>

      <H>Adoption Status</H>
      <P>
        As of 2026, IPv6 adoption is around 45% of internet traffic globally (measured by Google). Mobile carriers (T-Mobile, Verizon, AT&T) are predominantly IPv6-native. Major cloud providers support dual-stack. But a significant fraction of enterprise networks, ISPs, and legacy infrastructure still runs IPv4 only — hence the continued need for transition mechanisms.
      </P>

      <HR />
      <Part n="02" title="IPv6 Address Format" />

      <P>
        An IPv6 address is <Hl>128 bits</Hl> written as <Hl>8 groups of 4 hexadecimal digits</Hl>, separated by colons: <code style={{ fontSize: 13, background: `${N}15`, color: N, padding: '2px 6px', borderRadius: 4 }}>2001:0db8:85a3:0000:0000:8a2e:0370:7334</code>
      </P>
      <P>
        Two compression rules exist. <Hl>Rule 1:</Hl> Leading zeros within each group can be omitted: <code style={{ fontSize: 13 }}>0db8</code> → <code style={{ fontSize: 13 }}>db8</code>, <code style={{ fontSize: 13 }}>0000</code> → <code style={{ fontSize: 13 }}>0</code>. <Hl>Rule 2:</Hl> One consecutive sequence of all-zero groups can be replaced with <code style={{ fontSize: 13 }}>::</code> — the double-colon. This can only appear once in an address (otherwise it's ambiguous). Result: <code style={{ fontSize: 13, background: `${N}15`, color: N, padding: '2px 6px', borderRadius: 4 }}>2001:db8:85a3::8a2e:370:7334</code>
      </P>
      <P>
        A subnet in IPv6 uses CIDR notation like IPv4: <code style={{ fontSize: 13, background: `${N}15`, color: N, padding: '2px 6px', borderRadius: 4 }}>2001:db8::/32</code> is a documentation prefix. <code style={{ fontSize: 13 }}>2001:db8:85a3::/48</code> is a typical site prefix allocated to an organization. <code style={{ fontSize: 13 }}>2001:db8:85a3:1::/64</code> is a single subnet — and in IPv6, <Hl>/64 is the standard subnet size</Hl> for all point-to-point and LAN subnets (except loopbacks).
      </P>

      <IPv6Compressor />

      <HR />
      <Part n="03" title="Address Types" />

      <H>Global Unicast (GUA)</H>
      <P>
        <Hl>Global Unicast Addresses</Hl> start with the prefix 2000::/3 (first 3 bits are 001). These are the public, globally routable addresses equivalent to public IPv4. IANA assigns /23 or larger blocks to RIRs, which assign /32s to ISPs, which assign /48s to organizations, which assign /64s to subnets. The current GUA range primarily starts with <code style={{ fontSize: 13 }}>2001:</code> through <code style={{ fontSize: 13 }}>3fff:</code>.
      </P>

      <H>Link-Local Addresses (fe80::/10)</H>
      <P>
        <Hl>Link-local addresses</Hl> (fe80::1 through fe89::ffff…) are automatically configured on every IPv6-enabled interface. They are non-routable — only valid on a single link (subnet). Link-local addresses enable <Hl>Neighbor Discovery Protocol (NDP)</Hl> — IPv6's replacement for ARP — to work without any manual configuration or DHCP. When you enable IPv6 on an interface, the device immediately has a link-local address derived from its MAC using EUI-64 or random generation.
      </P>

      <H>Unique Local Addresses (fc00::/7)</H>
      <P>
        <Hl>Unique Local Addresses (ULA)</Hl> (fc00::/7, practically fd00::/8) are the IPv6 equivalent of RFC 1918 private space (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16). They're routable within an organization but not on the public internet. The recommended practice: randomly generate a 40-bit global ID to make the prefix unique: <code style={{ fontSize: 13 }}>fdXX:XXXX:XXXX::/48</code>. Unlike RFC 1918, ULA addresses are designed to be globally unique (despite not being globally routable) to avoid address collisions when merging networks.
      </P>

      <H>Multicast (ff00::/8)</H>
      <P>
        IPv6 has no broadcast — <Hl>multicast</Hl> replaces it. ff02::1 is all-nodes on the local link. ff02::2 is all-routers on the local link. ff02::1:2 is all DHCP agents. Solicited-Node Multicast addresses (ff02::1:ff00:0/104) are used by NDP for address resolution — the IPv6 equivalent of ARP. Each host joins its own solicited-node multicast group derived from its address, making neighbor resolution more efficient than IPv4's broadcast ARP.
      </P>

      <H>Special Addresses</H>
      <P>
        <code style={{ fontSize: 13, background: `${N}15`, color: N, padding: '2px 6px', borderRadius: 4 }}>:: (all zeros)</code> — Unspecified address (equivalent to 0.0.0.0 in IPv4; used during DAD before an address is confirmed). <code style={{ fontSize: 13, background: `${N}15`, color: N, padding: '2px 6px', borderRadius: 4 }}>:::1</code> — Loopback (equivalent to 127.0.0.1). <code style={{ fontSize: 13, background: `${N}15`, color: N, padding: '2px 6px', borderRadius: 4 }}>2001:db8::/32</code> — Documentation addresses (like 192.0.2.0/24 in IPv4; used in examples and RFCs, never routed).
      </P>

      <HR />
      <Part n="04" title="NDP: Neighbor Discovery Protocol" />

      <P>
        IPv6 eliminates ARP and replaces it with <Hl>NDP (Neighbor Discovery Protocol)</Hl>, defined in RFC 4861. NDP runs over ICMPv6 and handles neighbor resolution, router discovery, address autoconfiguration, duplicate address detection, and more. Key NDP message types:
      </P>
      <P>
        <Hl>Neighbor Solicitation (NS)</Hl> / <Hl>Neighbor Advertisement (NA)</Hl>: The IPv6 equivalents of ARP Request/Reply. Instead of broadcasting to all hosts, NS is sent to the solicited-node multicast group — a group derived from the last 24 bits of the target address. Only the target host listens to that multicast group, making resolution far more efficient than ARP broadcast on large networks.
      </P>
      <P>
        <Hl>Router Solicitation (RS)</Hl> / <Hl>Router Advertisement (RA)</Hl>: A host sends RS to ff02::2 (all-routers) to request network configuration. Routers respond with RA messages announcing prefix(es), default gateway information, and flags for address configuration. SLAAC relies on RA messages.
      </P>

      <H>SLAAC: Stateless Address Autoconfiguration</H>
      <P>
        <Hl>SLAAC (Stateless Address Autoconfiguration)</Hl>, defined in RFC 4862, allows IPv6 hosts to configure themselves without DHCP. The process: (1) The host generates a link-local address from its MAC (EUI-64) or randomly; (2) Performs Duplicate Address Detection (DAD) via NDP; (3) Sends RS to discover routers; (4) Receives RA containing the /64 prefix for the network; (5) Appends a 64-bit Interface ID (EUI-64 from MAC or random) to the /64 prefix to form its global unicast address; (6) Performs DAD on the new address. No DHCP server needed.
      </P>
      <P>
        The RA message's M flag (Managed Configuration) and O flag (Other Configuration) control whether clients should also use DHCPv6: M=0, O=0 means SLAAC only; M=1 means use DHCPv6 for addresses; O=1 means use DHCPv6 for other options (DNS, NTP) but SLAAC for addresses.
      </P>

      <Err title="Expecting IPv6 to work exactly like IPv4 DHCP">
        Unlike IPv4 where DHCP is almost universal, IPv6's default configuration mechanism is SLAAC — the host configures itself from router advertisements. Many enterprise networks use DHCPv6 anyway (for better address tracking and DNS integration), but you must also send correct RA messages because clients use RA for the default gateway — DHCPv6 does not distribute gateway information (unlike DHCPv4). Forgetting RA means hosts get an address but no default route.
      </Err>

      <HR />
      <Part n="05" title="IPv6 Header and Transition Mechanisms" />

      <H>The Simplified IPv6 Header</H>
      <P>
        Despite having 4× larger addresses, the IPv6 fixed header is only 40 bytes (IPv4 is 20 bytes without options). IPv6 removed fragmentation fields (routers don't fragment; only end hosts do, using Path MTU Discovery), the checksum (handled by upper layers), and the header length field (fixed). <Hl>Extension headers</Hl> chain optional information after the fixed header: Hop-by-Hop Options, Routing Header, Fragment Header, Authentication Header, Encapsulating Security Payload, Destination Options. This chaining is elegant but has created security issues in some implementations.
      </P>

      <H>Dual-Stack</H>
      <P>
        The most common transition mechanism: devices run both IPv4 and IPv6 simultaneously. Applications prefer IPv6 when available (via Happy Eyeballs algorithm — RFC 6555 — which races IPv4 and IPv6 connections and uses whichever responds first). Dual-stack requires maintaining both IPv4 and IPv6 routing tables, firewall rules, and DNS records (A for IPv4, AAAA for IPv6).
      </P>

      <H>6to4 and Teredo</H>
      <P>
        Legacy transition mechanisms that tunnel IPv6 over IPv4. <Hl>6to4</Hl> (RFC 3056) encapsulates IPv6 packets in IPv4 (protocol 41), using the 2002::/16 prefix with the IPv4 address embedded. <Hl>Teredo</Hl> tunnels IPv6 over IPv4 UDP for NAT traversal. Both are largely deprecated — used when an ISP's infrastructure doesn't support native IPv6 yet.
      </P>

      <ProTip>
        To quickly test IPv6 connectivity: <code style={{ fontSize: 12, background: `${N}15`, color: N, padding: '2px 5px', borderRadius: 4 }}>ping6 ::1</code> (loopback), <code style={{ fontSize: 12, background: `${N}15`, color: N, padding: '2px 5px', borderRadius: 4 }}>ping6 fe80::1%eth0</code> (link-local; must specify interface), <code style={{ fontSize: 12, background: `${N}15`, color: N, padding: '2px 5px', borderRadius: 4 }}>ip -6 route show</code> (IPv6 routing table on Linux). Note the % interface zone ID required for link-local pings — fe80::1 is ambiguous without specifying which interface's link-local segment.
      </ProTip>

      <HR />
      <Part n="06" title="A Day in the Life: IPv6 Migration Project" />

      <TimeBlock time="9:00 AM" label="Sprint planning: migrate web frontend to dual-stack">
        Your ISP has assigned your company a /48 prefix (2001:db8:acad::/48). You need to allocate /64 subnets for each VLAN, configure dual-stack on the edge router, and update DNS with AAAA records. IPv4 must continue working throughout.
      </TimeBlock>
      <TimeBlock time="10:30 AM" label="Subnet allocation">
        Plan: 2001:db8:acad:0010::/64 → VLAN 10 (Engineering), 2001:db8:acad:0020::/64 → VLAN 20 (Sales), 2001:db8:acad:0030::/64 → VLAN 30 (Servers). Each /64 provides 2⁶⁴ ≈ 18 quintillion addresses — no more subnetting within a /64.
      </TimeBlock>
      <TimeBlock time="11:45 AM" label="Configure edge router and enable RA">
        Configure SVIs with IPv6 addresses and enable <code style={{ fontSize: 12 }}>ipv6 nd ra interval 30</code> for Router Advertisements. Enable <code style={{ fontSize: 12 }}>ipv6 nd managed-config-flag</code> for DHCPv6 in the server VLAN (for IPAM tracking). Test: laptops receive IPv6 addresses via SLAAC within 30 seconds.
      </TimeBlock>
      <TimeBlock time="2:00 PM" label="DNS update and application testing">
        Add AAAA records for web-01: <code style={{ fontSize: 12 }}>web.example.com. AAAA 2001:db8:acad:30::10</code>. Test with curl --ipv6. Happy Eyeballs: the browser uses IPv6 when available, falls back to IPv4 automatically. Monitor error rates — no increase. IPv6 migration for the frontend tier complete.
      </TimeBlock>

      <HR />
      <Part n="07" title="Interview Questions" />

      <IQ q="How many IPv6 addresses exist and why does that matter practically?">
        2¹²⁸ ≈ 3.4 × 10³⁸ addresses. To put this in perspective: you could assign a /48 prefix (with 2⁸⁰ addresses) to every person on Earth and still have most of the space unused. Practically, this eliminates NAT for public connectivity — every device can have a globally unique routable address. It also means generous subnetting: the standard IPv6 subnet size is /64, giving 2⁶⁴ ≈ 18 quintillion host addresses per subnet — so there's no reason to subnet smaller than /64 on a LAN.
      </IQ>

      <IQ q="Explain how SLAAC works and what information it still needs from a router.">
        SLAAC (Stateless Address Autoconfiguration) allows a host to self-configure its IPv6 address without a DHCP server. The host sends a Router Solicitation to ff02::2; the router responds with a Router Advertisement containing the /64 network prefix. The host appends its 64-bit Interface ID (from MAC via EUI-64, or randomly generated per RFC 7217) to form its full 128-bit global unicast address, then performs Duplicate Address Detection. It still needs the router's link-local address from the RA for its default gateway — DHCPv6 does NOT provide gateway information. For DNS servers, DHCPv6 or RDNSS option in the RA (RFC 8106) is used.
      </IQ>

      <IQ q="What replaced ARP in IPv6, and how is it more efficient?">
        NDP (Neighbor Discovery Protocol) replaced ARP. For address resolution, NDP uses Neighbor Solicitation sent to the Solicited-Node Multicast address (ff02::1:ff00:0/104) — a group specific to the last 24 bits of the target address. In a /64 subnet with 1 million hosts, only the ~256 hosts sharing the same last 24 bits of address receive the solicitation (due to multicast subscription), compared to ARP broadcast received by all 1 million hosts. This reduces noise by orders of magnitude in large subnets. NDP also handles router discovery, prefix announcement (SLAAC), and duplicate address detection — functions that required separate protocols in IPv4 (ARP, ICMP Router Discovery, DHCP).
      </IQ>

      <HR />
      <Part n="08" title="Key Terminology" />
      <Term t="GUA">Global Unicast Address — publicly routable IPv6, starts with 2000::/3. Equivalent to public IPv4.</Term>
      <Term t="Link-local">fe80::/10 — automatically configured on every interface, non-routable outside the local link. Used by NDP.</Term>
      <Term t="ULA">Unique Local Address (fc00::/7) — private IPv6 space, not globally routed. Use fd00::/8 in practice.</Term>
      <Term t="NDP">Neighbor Discovery Protocol — ICMPv6-based; replaces ARP, provides router discovery and SLAAC.</Term>
      <Term t="SLAAC">Stateless Address Autoconfiguration — host self-configures IPv6 from router advertisements without DHCP.</Term>
      <Term t="DAD">Duplicate Address Detection — NDP mechanism to verify an address is unique before using it.</Term>
      <Term t="EUI-64">Method to derive a 64-bit Interface ID from a 48-bit MAC by inserting FF:FE in the middle and flipping bit 6.</Term>

      <KeyTakeaways items={[
        'IPv6 provides 2¹²⁸ addresses — 340 undecillion — solving IPv4 exhaustion without NAT.',
        'IPv6 addresses are 128-bit written as 8 hex groups; :: compresses consecutive zero groups (used once per address).',
        'Link-local addresses (fe80::/10) are auto-assigned to every interface and enable NDP to work without configuration.',
        'SLAAC lets hosts self-configure from Router Advertisements — no DHCP required, but RA is always needed for the gateway.',
        'NDP replaces ARP using solicited-node multicast instead of broadcast — far more efficient at scale.',
        'Dual-stack (running IPv4 and IPv6 simultaneously) is the dominant transition strategy; Happy Eyeballs prefers IPv6.',
      ]} />
    </LearnLayout>
  )
}
