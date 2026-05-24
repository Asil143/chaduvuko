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

/* ── interactive components ────────────────────────────────────────── */

const COMPRESS_EXAMPLES = [
  { full: '2001:0db8:0000:0000:0000:0000:0000:0001', compressed: '2001:db8::1', note: 'Leading zeros removed; four consecutive zero groups collapsed to ::' },
  { full: 'fe80:0000:0000:0000:0200:5eff:fe00:5301', compressed: 'fe80::200:5e ff:fe00:5301', note: 'Link-local address. Leading zeros removed; longest run of zeros collapsed' },
  { full: '2001:0db8:00ab:00cd:0000:0000:00ef:0001', compressed: '2001:db8:ab:cd::ef:1', note: 'Multiple groups simplified. :: replaces the zero-filled middle groups.' },
  { full: '0000:0000:0000:0000:0000:0000:0000:0001', compressed: '::1', note: 'Loopback address. All 128 bits except the last are 0 — maximum compression.' },
  { full: '2001:0db8:0001:0002:0003:0004:0005:0006', compressed: '2001:db8:1:2:3:4:5:6', note: 'No consecutive zero groups — just remove leading zeros per group.' },
]

function IPv6CompressTool() {
  const [selected, setSelected] = useState<number | null>(null)

  const ex = selected !== null ? COMPRESS_EXAMPLES[selected] : null

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: G, fontFamily: 'var(--font-mono)', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '.1em' }}>Interactive — IPv6 Address Compression</p>
      <p style={{ fontSize: 12, color: 'var(--muted)', margin: '0 0 20px' }}>Click an example to see full vs. compressed notation and the rules applied.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
        {COMPRESS_EXAMPLES.map((e, i) => (
          <div key={i} onClick={() => setSelected(selected === i ? null : i)}
            style={{ padding: '10px 14px', background: selected === i ? `${G}12` : 'var(--bg)', border: `2px solid ${selected === i ? G : 'var(--border)'}`, borderRadius: 8, cursor: 'pointer', transition: 'all .15s' }}>
            <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 4 }}>Full: {e.full}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: G, fontFamily: 'var(--font-mono)' }}>Compressed: {e.compressed}</div>
          </div>
        ))}
      </div>

      {ex && (
        <div style={{ background: `${G}10`, border: `1px solid ${G}30`, borderRadius: 8, padding: 14 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: G, margin: '0 0 6px' }}>Compression rule applied:</p>
          <p style={{ fontSize: 13, color: 'var(--text)', margin: 0 }}>{ex.note}</p>
        </div>
      )}

      <div style={{ marginTop: 16, padding: '12px 16px', background: 'var(--bg)', borderRadius: 8, border: '1px solid var(--border)', fontSize: 12, color: 'var(--muted)' }}>
        <strong style={{ color: 'var(--text)' }}>Rules:</strong>
        {' '}(1) Remove leading zeros in each 16-bit group.
        {' '}(2) Replace the longest consecutive run of all-zero groups with :: (only once per address).
        {' '}(3) If two equal-length runs exist, collapse the first.
      </div>
    </div>
  )
}

const ADDR_TYPES = [
  { type: 'Global Unicast', prefix: '2000::/3', example: '2001:db8::/32', color: G, desc: 'Globally routable addresses (public internet). Equivalent to public IPv4 addresses. Starts with 001 in the first 3 bits.' },
  { type: 'Link-Local', prefix: 'fe80::/10', example: 'fe80::1', color: '#3b82f6', desc: 'Automatically generated on every IPv6 interface. Not routed beyond the local segment. Required for NDP (Neighbor Discovery Protocol). Never appears in routing tables.' },
  { type: 'Unique Local', prefix: 'fc00::/7', example: 'fd00::/8', color: '#8b5cf6', desc: 'Private addressing (IPv6 equivalent of RFC 1918). fd00::/8 requires random 40-bit global ID for uniqueness. Not routed on the public internet.' },
  { type: 'Loopback', prefix: '::1/128', example: '::1', color: '#f59e0b', desc: 'IPv6 loopback — equivalent to 127.0.0.1. A single address (not a range). Traffic to ::1 never leaves the host.' },
  { type: 'Unspecified', prefix: '::/128', example: '::', color: '#6b7280', desc: 'All zeros. Used as source address in DHCPv6 solicit (before address assigned). Never used as a destination.' },
  { type: 'Multicast', prefix: 'ff00::/8', example: 'ff02::1', color: '#ef4444', desc: 'Multicast groups. IPv6 has NO broadcast — multicast replaces it entirely. ff02::1 = all nodes, ff02::2 = all routers, ff02::1:ff00:0/104 = solicited-node multicast.' },
  { type: 'IPv4-Mapped', prefix: '::ffff:0:0/96', example: '::ffff:192.168.1.1', color: '#f97316', desc: 'Represents IPv4 addresses in IPv6 format. Used by dual-stack sockets when an IPv4 connection is received. Not routed on the network.' },
]

function IPv6AddressTypes() {
  const [selected, setSelected] = useState<string | null>(null)
  const t = ADDR_TYPES.find(a => a.type === selected)

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: G, fontFamily: 'var(--font-mono)', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '.1em' }}>Interactive — IPv6 Address Types</p>
      <p style={{ fontSize: 12, color: 'var(--muted)', margin: '0 0 20px' }}>Click an address type to see its prefix, example, and use case.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
        {ADDR_TYPES.map(a => (
          <div key={a.type} onClick={() => setSelected(selected === a.type ? null : a.type)}
            style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '10px 14px', background: selected === a.type ? `${a.color}12` : 'var(--bg)', border: `2px solid ${selected === a.type ? a.color : 'var(--border)'}`, borderRadius: 8, cursor: 'pointer', transition: 'all .15s' }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: a.color, flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: selected === a.type ? a.color : 'var(--text)' }}>{a.type}</span>
            </div>
            <code style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>{a.prefix}</code>
          </div>
        ))}
      </div>

      {t && (
        <div style={{ background: `${t.color}10`, border: `1px solid ${t.color}30`, borderRadius: 8, padding: 14 }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 8 }}>
            <div>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 2 }}>Prefix</div>
              <code style={{ fontSize: 13, fontWeight: 700, color: t.color }}>{t.prefix}</code>
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 2 }}>Example</div>
              <code style={{ fontSize: 13, fontWeight: 700, color: t.color }}>{t.example}</code>
            </div>
          </div>
          <p style={{ fontSize: 13, color: 'var(--text)', margin: 0 }}>{t.desc}</p>
        </div>
      )}
    </div>
  )
}

type NdpStep = { step: string; msg: string; color: string; detail: string }

const NDP_STEPS: NdpStep[] = [
  { step: '1. SLAAC',       msg: 'Router Advertisement received (prefix: 2001:db8::/64)', color: G,        detail: 'Router periodically sends RA (Router Advertisement) to ff02::1 (all nodes). RA contains: network prefix, prefix length, flags (M/O bits), default gateway, MTU. If M=0, O=0: SLAAC is used for address configuration.' },
  { step: '2. Generate',    msg: 'EUI-64 address generated from MAC address',              color: '#3b82f6', detail: 'SLAAC generates a 64-bit Interface ID from the MAC address using EUI-64: insert FF:FE in the middle of the 48-bit MAC, flip the 7th bit (Universal/Local bit). MAC AA:BB:CC:DD:EE:FF → EUI-64: A8:BB:CC:FF:FE:DD:EE:FF. Full address: 2001:db8::a8bb:ccff:fedd:eeff/64.' },
  { step: '3. DAD',         msg: 'Duplicate Address Detection (NS to solicited-node)',    color: '#f59e0b', detail: 'Before using the address, the host performs DAD (Duplicate Address Detection): sends a Neighbor Solicitation to the solicited-node multicast address (ff02::1:ff+last 24 bits of address). If any host responds, there is a conflict and the address cannot be used.' },
  { step: '4. Tentative',   msg: 'Waiting 1 second for DAD conflict response',            color: '#f59e0b', detail: 'The address is in "tentative" state during DAD. The host cannot use it for communication yet, but listens for Neighbor Advertisements that would indicate a conflict. RFC 4862 requires waiting at least 1 second.' },
  { step: '5. Assigned',    msg: 'No conflict — address assigned and active',              color: G,        detail: 'DAD succeeded — no other host responded to the NS. The address is now in "preferred" state and fully usable. The host also has a link-local address (fe80::) generated the same way but from the fe80::/10 prefix, always assigned regardless of RA reception.' },
]

function NdpSlaacSimulator() {
  const [step, setStep] = useState(0)

  const current = NDP_STEPS[step]

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: G, fontFamily: 'var(--font-mono)', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '.1em' }}>Interactive — NDP and SLAAC Simulator</p>
      <p style={{ fontSize: 12, color: 'var(--muted)', margin: '0 0 20px' }}>Step through how an IPv6 host automatically configures its address using SLAAC and NDP.</p>

      <div style={{ display: 'flex', gap: 4, marginBottom: 20, flexWrap: 'wrap' }}>
        {NDP_STEPS.map((s, i) => (
          <button key={i} onClick={() => setStep(i)}
            style={{ background: step === i ? s.color : `${s.color}15`, color: step === i ? '#fff' : s.color, border: `1px solid ${s.color}40`, borderRadius: 8, padding: '6px 12px', fontSize: 11, fontWeight: 700, cursor: 'pointer', transition: 'all .15s' }}>
            {s.step}
          </button>
        ))}
      </div>

      <div style={{ background: `${current.color}10`, border: `1px solid ${current.color}30`, borderRadius: 10, padding: 16 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: current.color, margin: '0 0 8px' }}>{current.step}: {current.msg}</p>
        <p style={{ fontSize: 13, color: 'var(--text)', margin: 0, lineHeight: 1.9 }}>{current.detail}</p>
      </div>

      <div style={{ marginTop: 16, background: '#0a0a0a', borderRadius: 8, padding: 14 }}>
        <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 4, fontFamily: 'var(--font-mono)' }}># tcpdump during SLAAC on Linux</div>
        <div style={{ fontSize: 12, color: '#e5e7eb', fontFamily: 'var(--font-mono)', lineHeight: 1.7 }}>
          <div style={{ color: step === 0 ? G : '#6b7280' }}>Router Advertisement from fe80::1 → ff02::1 (all nodes)</div>
          <div style={{ color: step === 2 || step === 3 ? '#f59e0b' : '#6b7280' }}>Neighbor Solicitation: who has 2001:db8::a8bb:ccff:fedd:eeff? (DAD)</div>
          <div style={{ color: step === 4 ? G : '#6b7280' }}>[1 second silence — no conflict detected]</div>
          <div style={{ color: step === 4 ? G : '#6b7280' }}>Address 2001:db8::a8bb:ccff:fedd:eeff/64 now PREFERRED</div>
        </div>
      </div>
    </div>
  )
}

/* ── main module ───────────────────────────────────────────────────── */

export default function IPv6Module() {
  return (
    <LearnLayout
      title="IPv6 — The Next Generation Internet Protocol"
      description="IPv6 replaces IPv4's exhausted 32-bit address space with 128 bits — enough addresses for every atom on Earth. But it also redesigns neighbor discovery, eliminates broadcast, and enables SLAAC. The future of networking is already here."
      section="Networking Fundamentals — Module 15"
      readTime="22–30 min"
      updatedAt="May 2026"
    >
      {/* ── Chapter 1 ── */}
      <Chapter n={1} title="Why IPv6? The Exhaustion Crisis" />

      <StoryBox>
        February 3rd, 2011. At a ceremony in Miami, IANA gave out its last five /8 IPv4 blocks — one to each Regional Internet Registry. It was not a surprise: RFC 1752 had warned in 1994 that IPv4 was running out. The IETF had been working on the successor since 1992. The standard — IPv6 — was published as RFC 2460 in 1998. Yet 13 years after the standard and 17 years after the warning, the day IPv4 ran out still caught most of the internet industry flat-footed. NAT, CGNAT, and IPv4 address markets have bought time. But the only real solution — IPv6 — was ready and waiting.
      </StoryBox>

      <Para>
        IPv4 provides 2^32 = 4,294,967,296 addresses. The global internet has approximately 5 billion internet users, and each user may have dozens of devices. IoT projections suggest 75 billion connected devices by 2030. IPv4's address space was fundamentally insufficient for the internet we built.
      </Para>

      <Para>
        IPv6 was designed to solve this with <Accent>128-bit addresses</Accent> — 2^128 = 340,282,366,920,938,463,463,374,607,431,768,211,456 addresses. That's approximately 340 undecillion. Or: 340 trillion trillion trillion. Every human on Earth could have 43 quintillion addresses. Every square meter of Earth's surface could have 670 quadrillion addresses. IPv6 addresses do not run out.
      </Para>

      <WowBox>
        If you counted IPv6 addresses at one billion per second, it would take approximately 10^22 years — roughly 700 billion times the current age of the universe — to count them all. The design goal was "enough addresses that we never have to do this again." They succeeded.
      </WowBox>

      <Para>
        Beyond addressing, IPv6 redesigns several aspects of networking: eliminates broadcast (replaced by multicast), introduces SLAAC for stateless address configuration, simplifies the IP header for faster forwarding, mandates IPsec support, and improves mobility support. IPv6 is not merely a larger address space — it is a redesigned protocol.
      </Para>

      <Divider />

      {/* ── Chapter 2 ── */}
      <Chapter n={2} title="IPv6 Address Format" />

      <StoryBox>
        An IPv6 address looks like: 2001:0db8:85a3:0000:0000:8a2e:0370:7334. Eight groups of four hex digits separated by colons. 128 bits total. The first reaction most people have: "This is unreadable." The second reaction, after learning compression rules: "Oh, this is manageable." The third reaction, after working with them for a month: "I actually prefer the clarity of explicit addresses."
      </StoryBox>

      <H2>The 128-Bit Address</H2>

      <Para>
        IPv6 addresses are 128 bits written as eight 16-bit groups (called hextets or quibbles) in hexadecimal, separated by colons. Each hextet is 4 hex digits (0000 to ffff). A complete IPv6 address:
      </Para>

      <Para>
        <Code>2001:0db8:0000:0000:0000:0000:0000:0001</Code>
      </Para>

      <H2>Address Compression Rules</H2>

      <Para>
        Two compression rules make IPv6 addresses more readable:
      </Para>

      <Para>
        <Accent>Rule 1: Remove leading zeros.</Accent> Within each 16-bit group, leading zeros may be omitted. <Code>0db8</Code> becomes <Code>db8</Code>. <Code>0000</Code> becomes <Code>0</Code>.
      </Para>

      <Para>
        <Accent>Rule 2: Collapse consecutive all-zero groups with ::</Accent> A single run of one or more consecutive all-zero groups can be replaced by :: (double colon). <Code>2001:db8:0:0:0:0:0:1</Code> becomes <Code>2001:db8::1</Code>. The :: can only appear once — its position indicates how many zero groups to insert (total must equal 8 hextets).
      </Para>

      <IPv6CompressTool />

      <H2>The /64 Boundary</H2>

      <Para>
        IPv6 network prefixes end at the /64 boundary for all LAN segments. This is not arbitrary — SLAAC (Stateless Address Autoconfiguration) requires exactly 64 host bits to generate EUI-64 based interface IDs. The prefix (first 64 bits) identifies the network; the interface ID (last 64 bits) identifies the host.
      </Para>

      <Para>
        This fixed /64 boundary means every LAN segment has 2^64 ≈ 18.4 quintillion possible host addresses. Networks never run out of host addresses within a /64.
      </Para>

      <Divider />

      {/* ── Chapter 3 ── */}
      <Chapter n={3} title="IPv6 Address Types" />

      <Para>
        IPv6 has a richer address type system than IPv4, with specific address types serving specific functions. Understanding them is essential for IPv6 troubleshooting and design.
      </Para>

      <IPv6AddressTypes />

      <H2>Solicited-Node Multicast: ARP's Replacement</H2>

      <Para>
        In IPv4, ARP uses broadcast to find MAC addresses. In IPv6, there is no broadcast. Instead, each node automatically joins a <Accent>solicited-node multicast group</Accent> derived from its address: <Code>ff02::1:ff00:0/104</Code> plus the last 24 bits of the interface address. When a host needs to resolve a neighbor's MAC, it sends a Neighbor Solicitation to the solicited-node multicast address — only the target host (or hosts sharing the same last 24 bits) receives it, dramatically reducing the number of devices that must process the message compared to broadcast.
      </Para>

      <H2>Anycast in IPv6</H2>

      <Para>
        IPv6 has explicit anycast support: any global unicast address can be advertised by multiple nodes. The routing infrastructure delivers packets to the topologically closest advertiser. IPv6 also defines a specific subnet-router anycast address for every subnet (the network address with all host bits = 0) — all routers on that subnet respond to it.
      </Para>

      <Divider />

      {/* ── Chapter 4 ── */}
      <Chapter n={4} title="IPv6 Address Configuration: SLAAC, DHCPv6, and NDP" />

      <StoryBox>
        When you plug a new device into a network, something magical happens in IPv6. Within milliseconds, the device generates a link-local address, sends a Router Solicitation, receives a Router Advertisement from the gateway, uses that prefix to generate a global address, performs Duplicate Address Detection, and is fully configured — all without a DHCP server, without any manual configuration, and without any central server knowing the device exists. This is SLAAC. For the first time in networking history, a device can configure itself with a globally routable address automatically.
      </StoryBox>

      <H2>Link-Local Address: Always First</H2>

      <Para>
        The first thing any IPv6 interface does is generate a <Accent>link-local address</Accent> (prefix fe80::/10). This happens before any router communication. The link-local address uses EUI-64 (or a random stable address in modern operating systems) as the interface ID. Link-local addresses are always present on every IPv6-enabled interface — they're how the router and host initially communicate (NDP, Router Solicitations).
      </Para>

      <H2>SLAAC: Stateless Address Autoconfiguration</H2>

      <Para>
        With SLAAC (RFC 4862), a host derives its global IPv6 address from the network prefix announced by the router without any DHCP server:
      </Para>

      <Para>
        1. Router periodically broadcasts Router Advertisement (RA) to ff02::1, announcing the network prefix (e.g., 2001:db8::/64) and the A flag (autonomous configuration enabled).
      </Para>

      <Para>
        2. Host takes the /64 prefix from the RA and combines it with a 64-bit interface ID (generated from MAC via EUI-64, or using RFC 7217 stable privacy-preserving IDs, or TEMPORARY random addresses per RFC 8981).
      </Para>

      <Para>
        3. Host performs DAD (Duplicate Address Detection) — sends a Neighbor Solicitation to the solicited-node multicast address, waits 1 second. If no response: address is unique, assign it.
      </Para>

      <NdpSlaacSimulator />

      <H2>EUI-64: Interface ID from MAC</H2>

      <Para>
        The original SLAAC interface ID generation uses EUI-64: take the 48-bit MAC address (e.g., AA:BB:CC:DD:EE:FF), insert the bytes FF:FE in the middle (AA:BB:CC:FF:FE:DD:EE:FF), then flip the 7th bit (Universal/Local bit, bit 6 of the first byte): AA in binary is 10101010 → flipping bit 6 (value 2) gives 10101000 = A8. Result: A8:BB:CC:FF:FE:DD:EE:FF, written as IPv6: a8bb:ccff:fedd:eeff.
      </Para>

      <Warn title="EUI-64 privacy implications">
        EUI-64-derived addresses contain the device's MAC address, making the device trackable across networks (same interface ID regardless of network, revealing device identity and manufacturer). Modern operating systems (Windows, Linux, macOS, iOS, Android) now use privacy extensions (RFC 8981) by default — random 64-bit interface IDs that change periodically. Some stable non-EUI-64 methods (RFC 7217) generate consistent per-network IDs without embedding the MAC.
      </Warn>

      <H2>DHCPv6: Stateful Assignment</H2>

      <Para>
        <Accent>DHCPv6</Accent> provides stateful address assignment (like IPv4 DHCP). The M flag in the RA tells hosts to use DHCPv6 for address assignment; the O flag tells hosts to use DHCPv6 for other information (DNS servers, domain search) while using SLAAC for the address itself. DHCPv6 is required when the network administrator needs to track which device has which address.
      </Para>

      <Para>
        A key difference: DHCPv6 does not provide a default gateway. The default gateway is always learned from the RA (Router Advertisement), not from DHCPv6. This is a common IPv6 deployment mistake: engineers configure DHCPv6 and forget that the router must still send RAs.
      </Para>

      <Divider />

      {/* ── Chapter 5 ── */}
      <Chapter n={5} title="NDP: Neighbor Discovery Protocol" />

      <Para>
        <Accent>NDP (Neighbor Discovery Protocol, RFC 4861)</Accent> replaces IPv4's ARP, ICMP Router Discovery, and ICMP Redirect with a unified ICMPv6-based protocol. NDP is essential to IPv6 operation.
      </Para>

      <H2>NDP Message Types</H2>

      <Para>
        <Accent>Router Solicitation (RS, ICMPv6 type 133)</Accent>: sent by a host to ff02::2 (all routers) when it needs router information immediately (instead of waiting for the next periodic RA). Triggered when an interface comes up.
      </Para>

      <Para>
        <Accent>Router Advertisement (RA, ICMPv6 type 134)</Accent>: sent by routers to ff02::1 (all nodes) periodically (default 200s) and in response to RS. Contains: network prefixes, M/O flags, lifetime, MTU, default gateway (implicit — the router's link-local address as source).
      </Para>

      <Para>
        <Accent>Neighbor Solicitation (NS, ICMPv6 type 135)</Accent>: asks "who has this IPv6 address? Tell me your MAC." Sent to the solicited-node multicast address. Also used for DAD.
      </Para>

      <Para>
        <Accent>Neighbor Advertisement (NA, ICMPv6 type 136)</Accent>: responds to NS with the sender's MAC address and flags. Similar to ARP reply.
      </Para>

      <Para>
        <Accent>Redirect (ICMPv6 type 137)</Accent>: sent by a router when it knows of a better next-hop for a destination. Equivalent to ICMP Redirect in IPv4.
      </Para>

      <H2>The Neighbor Cache</H2>

      <Para>
        The <Accent>Neighbor Cache</Accent> is IPv6's equivalent of the ARP cache. It stores IPv6-to-MAC-address mappings with states: INCOMPLETE (NS sent, awaiting NA), REACHABLE (recently confirmed reachable), STALE (confirmation timeout, but not probed yet), DELAY (probing to confirm reachability), PROBE (actively sending NS to confirm). The reachability state machine is more sophisticated than IPv4 ARP, reducing unnecessary NS traffic in large subnets.
      </Para>

      <H2>SEND: Secure Neighbor Discovery</H2>

      <Para>
        NDP is vulnerable to the same spoofing attacks as ARP — a rogue host can send fake NA messages claiming another host's IP and redirect traffic to itself. <Accent>SEND (Secure Neighbor Discovery, RFC 3971)</Accent> adds cryptographic protection: Cryptographically Generated Addresses (CGAs) bind the address to a public key, and NDP messages are signed. SEND is complex to deploy and not widely implemented in practice — RA Guard and DHCPv6 Guard provide partial mitigation.
      </Para>

      <Divider />

      {/* ── Chapter 6 ── */}
      <Chapter n={6} title="The IPv6 Header" />

      <Para>
        IPv6's header is simplified compared to IPv4 — fixed at 40 bytes with fewer fields. All optional functionality is moved to extension headers.
      </Para>

      <CodeBlock>
{` 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|Version| Traffic Class |           Flow Label                  |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|         Payload Length        |  Next Header  |   Hop Limit   |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                                                               |
|                         Source Address                        |
|                          (128 bits)                           |
|                                                               |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                                                               |
|                      Destination Address                      |
|                          (128 bits)                           |
|                                                               |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+`}
      </CodeBlock>

      <H2>Key Header Differences from IPv4</H2>

      <Para>
        <Accent>No header checksum:</Accent> IPv4 required every router to verify and recompute the header checksum (TTL changes at each hop). IPv6 eliminates the header checksum — Layer 2 (Ethernet FCS) and Layer 4 (TCP/UDP) checksums provide integrity. This saves CPU cycles at every router.
      </Para>

      <Para>
        <Accent>No fragmentation fields:</Accent> IPv6 routers never fragment packets. Only the source can fragment (using the Fragment extension header). Routers drop oversized packets and send ICMPv6 "Packet Too Big" back to the source. This eliminates per-packet fragmentation processing at routers and forces correct PMTU Discovery.
      </Para>

      <Para>
        <Accent>Fixed 40-byte header:</Accent> IPv4 had a variable-length header (IHL field). IPv6's fixed-size header simplifies hardware processing — routers know exactly where the payload starts without parsing the header length.
      </Para>

      <Para>
        <Accent>Flow Label:</Accent> 20-bit field to identify packets belonging to the same flow for QoS. Allows routers to group packets for consistent treatment without examining Layer 4 headers.
      </Para>

      <Para>
        <Accent>Extension Headers:</Accent> IPv6 replaces IPv4's options with extension headers — separate headers inserted between the main header and the payload. Types include: Hop-by-Hop Options (routers must process), Routing (loose/strict source routing), Fragment, Authentication (IPsec AH), Encapsulating Security Payload (IPsec ESP), Destination Options. Extension headers form a linked list via the Next Header field.
      </Para>

      <Divider />

      {/* ── Chapter 7 ── */}
      <Chapter n={7} title="IPv6 Transition Mechanisms" />

      <StoryBox>
        The internet cannot switch from IPv4 to IPv6 overnight — 5 billion users and hundreds of millions of servers cannot all be upgraded simultaneously. The transition has been happening for decades via "dual-stack" operation — running both protocols simultaneously. But dual-stack requires IPv6 infrastructure. Where that doesn't exist, tunneling and translation mechanisms bridge the gap. The IETF has produced dozens of transition technologies — most are temporary workarounds on the path to the end state: IPv6-only networks.
      </StoryBox>

      <H2>Dual Stack</H2>

      <Para>
        <Accent>Dual stack</Accent> runs IPv4 and IPv6 simultaneously on every device and every network link. A dual-stack host has both an IPv4 address and an IPv6 address; a dual-stack router has both protocol stacks active on every interface. When a dual-stack host connects to a server, it prefers IPv6 if the server has an AAAA record (IPv6 DNS record), falling back to IPv4 if IPv6 fails.
      </Para>

      <Para>
        Dual stack is the most straightforward transition strategy but requires IPv6 support throughout the network path. It does not reduce IPv4 consumption — it runs both protocols in parallel. The goal is to eventually phase out IPv4, not to run both forever.
      </Para>

      <H2>Tunneling: 6in4, 6to4, Teredo, DS-Lite</H2>

      <Para>
        When an IPv6 island needs to cross IPv4-only infrastructure, <Accent>tunneling</Accent> encapsulates IPv6 packets inside IPv4 packets. <Accent>6in4 (RFC 4213)</Accent>: manually configured tunnel between two IPv6 routers across IPv4; reliable but requires setup at both ends. <Accent>6to4 (RFC 3056)</Accent>: automatic tunneling using the 2002::/16 prefix — embeds the IPv4 address in the IPv6 prefix, enabling automatic tunneling to any 6to4 relay. Deprecated due to reliability and security issues.
      </Para>

      <Para>
        <Accent>DS-Lite (Dual Stack Lite, RFC 6333)</Accent>: allows ISPs to give customers private IPv4 addresses while providing native IPv6. Customer's IPv4 traffic is encapsulated in IPv6 to the ISP's AFTR (Address Family Transition Router), which performs NAT44 to public IPv4. Used by ISPs that have deployed IPv6 to customers but still need to support legacy IPv4 traffic.
      </Para>

      <H2>Translation: NAT64 and DNS64</H2>

      <Para>
        <Accent>NAT64 (RFC 6146)</Accent> allows IPv6-only clients to reach IPv4-only servers. The NAT64 gateway translates IPv6 packets to IPv4 — the IPv4 destination address is embedded in a well-known /96 prefix (64:ff9b::/96). <Accent>DNS64 (RFC 6147)</Accent> works alongside NAT64: when an IPv6-only client queries DNS for a server that only has an A record (IPv4), DNS64 synthesizes an AAAA record by combining the NAT64 prefix with the IPv4 address. The client connects to the synthesized IPv6 address, which the NAT64 gateway translates to IPv4.
      </Para>

      <H2>Happy Eyeballs (RFC 8305)</H2>

      <Para>
        When a dual-stack host connects to a server with both IPv4 and IPv6, which protocol is tried first? Happy Eyeballs (RFC 8305) specifies: try IPv6 first. If IPv6 doesn't succeed within 250ms, try IPv4 simultaneously, use whichever succeeds first. This ensures users get the best of both worlds — IPv6 when available, IPv4 as fallback — without noticeable delay from IPv6 failures.
      </Para>

      <Divider />

      {/* ── Chapter 8 ── */}
      <Chapter n={8} title="IPv6 in Practice: Configuration" />

      <H2>Linux IPv6 Configuration</H2>

      <CodeBlock>
{`# Show IPv6 addresses
ip -6 addr show
ip -6 addr show eth0

# Show neighbor cache (IPv6 ARP equivalent)
ip -6 neigh show

# Show IPv6 routing table
ip -6 route show

# Ping IPv6 (use %interface for link-local)
ping6 ::1                              # loopback
ping6 fe80::1%eth0                     # link-local (specify interface)
ping6 2001:db8::1

# Traceroute IPv6
traceroute6 2606:4700:4700::1111       # Cloudflare IPv6 DNS

# Static IPv6 address
ip -6 addr add 2001:db8::10/64 dev eth0

# Check SLAAC-generated address
ip -6 addr show eth0 | grep "scope global"

# Send Router Solicitation manually
rdisc6 eth0`}
      </CodeBlock>

      <H2>Cisco IOS IPv6 Configuration</H2>

      <CodeBlock>
{`! Enable IPv6 routing
ipv6 unicast-routing

! Configure interface with global address
interface GigabitEthernet0/0
 ipv6 address 2001:db8:1::1/64
 ipv6 address fe80::1 link-local      ! explicitly set link-local
 no shutdown

! Enable SLAAC advertisements (Router Advertisement)
interface GigabitEthernet0/0
 ipv6 nd prefix 2001:db8:1::/64       ! advertise this prefix in RA
 no ipv6 nd ra suppress               ! send RAs (default on interfaces with IPv6)

! Configure OSPFv3 for IPv6 routing
ipv6 router ospf 1
 router-id 1.1.1.1
interface GigabitEthernet0/0
 ipv6 ospf 1 area 0

! Verify
show ipv6 interface brief
show ipv6 neighbors
show ipv6 route`}
      </CodeBlock>

      <H2>IPv6 DNS: AAAA Records</H2>

      <Para>
        IPv6 addresses are stored in DNS as <Accent>AAAA records</Accent> (pronounced "quad-A"). The IPv4 equivalent is an A record. A server providing both protocols has both A and AAAA records. DNS AAAA records contain the full 128-bit IPv6 address.
      </Para>

      <CodeBlock>
{`# Check if a domain has IPv6 (AAAA records)
dig google.com AAAA
dig +short google.com AAAA

# Check DNS resolver's IPv6 support
dig @2606:4700:4700::1111 google.com AAAA   # Cloudflare IPv6 DNS

# Example AAAA record in zone file
; IPv4 record
www     IN  A     93.184.216.34
; IPv6 record
www     IN  AAAA  2606:2800:220:1:248:1893:25c8:1946`}
      </CodeBlock>

      <Divider />

      {/* ── Chapter 9 ── */}
      <Chapter n={9} title="IPv6 Security Considerations" />

      <H2>No NAT — Direct Connectivity</H2>

      <Para>
        IPv6 restores the internet's end-to-end model — every device has a globally routable address. This is fundamentally more correct than NAT but requires rethinking security. In IPv4 with NAT, unsolicited inbound connections fail automatically (no NAT state). In IPv6, every device is directly reachable — firewall rules must explicitly block unwanted inbound traffic.
      </Para>

      <Para>
        The common misunderstanding: "IPv6 is less secure because there's no NAT." NAT was never a security mechanism — it was address translation. A stateful firewall on an IPv6 network provides equivalent security to NAT + firewall on IPv4, while restoring end-to-end connectivity. Most operating systems include a default "deny all inbound" stateful firewall policy for IPv6.
      </Para>

      <H2>RA Guard and DHCPv6 Guard</H2>

      <Para>
        Rogue Router Advertisements can be used to redirect host traffic through an attacker's host (rogue RA attack). <Accent>RA Guard</Accent> (RFC 6105) — implemented on managed switches — inspects ICMPv6 RA messages and drops any received on ports not configured as router-facing. Only designated "router" ports can send valid RAs. DHCPv6 Guard similarly filters DHCPv6 server messages to only those originating from trusted ports.
      </Para>

      <H2>IPv6 Extension Header Abuse</H2>

      <Para>
        IPv6 extension headers can be chained arbitrarily and processed in different ways at different nodes. Attackers have exploited extension headers to: bypass firewalls that don't process extension headers, craft Hop-by-Hop headers that force all routers to process the packet (DoS via header injection), and fragment extension headers across fragment boundaries to hide malicious content. Modern firewalls and routers are hardened against these techniques, but extension header processing remains an ongoing security research area.
      </Para>

      <Divider />

      {/* ── Chapter 10 ── */}
      <Chapter n={10} title="IPv6 Adoption and Current State" />

      <Para>
        IPv6 adoption has accelerated dramatically since 2015, driven by mobile carriers and major internet companies. As of 2024:
      </Para>

      <Para>
        <Accent>Google IPv6 adoption:</Accent> approximately 48% of users access Google over IPv6. This is a reliable metric because Google measures actual client connections.
      </Para>

      <Para>
        <Accent>Mobile-first adoption:</Accent> T-Mobile USA was ~100% IPv6 for mobile users by 2020. All major US mobile carriers are predominantly IPv6. Mobile devices default to IPv6 because carrier networks exhausted IPv4 — CGNAT was the alternative.
      </Para>

      <Para>
        <Accent>Content providers:</Accent> Cloudflare, Google, Facebook, Netflix, Amazon all support IPv6 natively. Over 30% of the Alexa top 1 million websites have IPv6 addresses.
      </Para>

      <Para>
        <Accent>Enterprise:</Accent> Enterprise IPv6 adoption lags consumer — internal networks often still IPv4-only with dual-stack at the edge. The operational complexity of migrating existing IPv4 infrastructure is significant.
      </Para>

      <WowBox>
        World IPv6 Day was June 6, 2011 — a 24-hour test where major internet companies (Google, Facebook, Yahoo, Netflix) simultaneously enabled IPv6. Traffic on IPv6 increased 4,000%. Crucially, no significant problems occurred for end users, proving IPv6 was production-ready. World IPv6 Launch Day on June 6, 2012 saw the same participants permanently enable IPv6. That day marks the real start of the IPv6 internet.
      </WowBox>

      <Divider />

      {/* ── Chapter 11 ── */}
      <Chapter n={11} title="OSPFv3 and BGP for IPv6" />

      <H2>OSPFv3</H2>

      <Para>
        <Accent>OSPFv3 (RFC 5340)</Accent> is OSPF modified for IPv6. Key differences from OSPFv2: OSPFv3 runs on link-local addresses (not global addresses), meaning a router's OSPFv3 neighbor is identified by its link-local address. Router IDs are still 32-bit values (same as IPv4 — just identifiers, not actual addresses). OSPFv3 supports address-family separation — the same OSPFv3 instance can route both IPv4 and IPv6 using address-family indicators.
      </Para>

      <H2>BGP for IPv6</H2>

      <Para>
        IPv6 BGP uses <Accent>MP-BGP (Multi-Protocol BGP, RFC 4760)</Accent> — an extension to BGP-4 that adds IPv6 address family support. A BGP session can carry both IPv4 (AFI=1, SAFI=1) and IPv6 (AFI=2, SAFI=1) prefixes over a single TCP connection. BGP sessions for IPv6 prefixes can be established over either IPv4 or IPv6 transport.
      </Para>

      <CodeBlock>
{`! Cisco IOS — BGP IPv6 configuration
router bgp 65001
 bgp router-id 10.0.0.1
 neighbor 2001:db8::2 remote-as 65002

 address-family ipv6 unicast
  neighbor 2001:db8::2 activate
  network 2001:db8:1::/48

! Verify
show bgp ipv6 unicast summary
show bgp ipv6 unicast`}
      </CodeBlock>

      <Divider />

      {/* ── Chapter 12 ── */}
      <Chapter n={12} title="IPv6 Troubleshooting" />

      <CodeBlock>
{`# Check all IPv6 addresses on all interfaces
ip -6 addr show

# Check neighbor table (ARP equivalent)
ip -6 neigh show
# States: REACHABLE, STALE, INCOMPLETE, DELAY, PROBE

# Ping (include %interface for link-local)
ping6 -c 4 2001:4860:4860::8888     # Google IPv6 DNS

# Traceroute
traceroute6 google.com

# DNS check — does host have AAAA record?
dig AAAA google.com +short

# tcpdump — capture ICMPv6 (NDP traffic)
tcpdump -i eth0 icmp6 -n

# Watch for Router Advertisements
tcpdump -i eth0 'icmp6 and ip6[40] == 134'  # type 134 = RA

# Linux — force Router Solicitation
rdisc6 eth0

# Check if IPv6 is forwarding (routing enabled)
sysctl net.ipv6.conf.all.forwarding`}
      </CodeBlock>

      <H2>Common IPv6 Issues</H2>

      <Para>
        <Accent>No global IPv6 address despite RA being sent:</Accent> Check M flag in RA (if M=1, host should use DHCPv6 for address, not SLAAC). Check that the prefix in the RA has the A (autonomous) flag set. Check DAD — if multiple hosts had the same EUI-64, one lost the DAD contest.
      </Para>

      <Para>
        <Accent>Cannot reach IPv6 default gateway:</Accent> The default gateway in IPv6 is the router's link-local address learned from the RA. If no RA is received, no default route is installed. Check <Code>ip -6 route show</Code> for a default route (:: /0).
      </Para>

      <Para>
        <Accent>DHCPv6 address assigned but no default gateway:</Accent> DHCPv6 does not provide a default gateway (unlike IPv4 DHCP). The router must still send RAs. A common misconfiguration: DHCPv6 works, but the router has <Code>ipv6 nd ra suppress</Code> configured, preventing RA transmission. Remove that command.
      </Para>

      <Para>
        <Accent>Privacy extensions creating multiple addresses:</Accent> Modern OS generates both a stable address (from MAC or RFC 7217) for incoming connections and multiple temporary addresses (rotating every few hours) for outbound connections. <Code>ip -6 addr show</Code> may show 3-5 addresses per interface. This is normal — the privacy extensions addresses are used for outbound connections to prevent tracking.
      </Para>

      <Divider />

      {/* ── Chapter 13 ── */}
      <Chapter n={13} title="Common Misconceptions" />

      <Err title="IPv6 is just IPv4 with more addresses">
        IPv6 is a redesigned protocol. Key differences: 128-bit addresses (not just bigger IPv4), no broadcast (multicast only), no header checksum (router performance improvement), no router fragmentation (source-only via extension header), NDP replaces ARP + Router Discovery + ICMP Redirect, SLAAC enables automatic address configuration without DHCP, mandatory IPsec support (though not mandatory to use), flow label for QoS, extension headers replace IPv4 options, solicited-node multicast replaces ARP broadcast. IPv6 is not a simple extension of IPv4.
      </Err>

      <Err title="IPv6 removes the need for firewalls because there is no NAT">
        The absence of NAT in IPv6 increases the need for explicit firewall rules, not decreases it. In IPv4 with NAT, unsolicited inbound connections fail passively (no NAT state). In IPv6, direct reachability means a firewall must explicitly deny unwanted inbound traffic. Modern operating systems have stateful firewalls that default to blocking inbound connections. Enterprise IPv6 deployments require the same careful firewall policy design as IPv4, with explicit rules for permitted inbound services.
      </Err>

      <Err title=":: can appear multiple times in an IPv6 address">
        The :: shorthand (collapsing consecutive zero groups) can only appear once in an IPv6 address. If it appeared twice, there would be ambiguity about how many zero groups each :: represents — the total must equal 8 hextets. An address like 2001::1::1 is invalid. The :: always collapses the largest consecutive run of all-zero groups (or the leftmost if tied).
      </Err>

      <Err title="DHCPv6 provides a default gateway">
        In IPv6, the default gateway is always provided by Router Advertisement (RA), not by DHCPv6. This is a fundamental difference from IPv4 where DHCP option 3 provides the default router. If a network uses DHCPv6 for address assignment but the router suppresses RAs, hosts get IPv6 addresses but no default route — they cannot reach other networks. Always ensure Router Advertisements are sent when using DHCPv6.
      </Err>

      <Err title="Link-local addresses are only used for NDP — not for actual traffic">
        Link-local addresses are used for far more than just NDP. OSPFv3 runs over link-local addresses (neighbors are identified by link-local, not global addresses). BGP sessions can run over link-local addresses. Router-to-router links in IPv6-only networks often use only link-local addresses with no global address on transit interfaces. On-link traffic between hosts in the same subnet can use either link-local or global addresses. Link-local is a production address type, not a diagnostic-only address.
      </Err>

      <Err title="IPv6 adoption is stalled and IPv4 will last forever">
        IPv6 adoption is not stalled — it accelerated. Google's IPv6 traffic was less than 1% in 2010; it's approximately 48% in 2024, growing steadily. All major mobile networks in the US, UK, Japan, and India predominantly use IPv6. The internet's largest content providers (Google, Facebook, Netflix, Cloudflare) fully support IPv6. Enterprise adoption lags, but the trajectory is clear. IPv4 will coexist for decades (via dual-stack and legacy NAT), but IPv6 is the present and future of the internet — not a distant theoretical standard.
      </Err>

      <Divider />

      {/* ── Chapter 14 ── */}
      <Chapter n={14} title="Interview Questions" />

      <IQ q="Why was IPv6 created and what is the fundamental difference from IPv4?" level="Beginner">
        IPv6 was created to solve IPv4's address exhaustion — the 32-bit address space (4.3 billion addresses) was insufficient for a world with billions of internet-connected devices. IANA allocated its last IPv4 blocks in 2011. IPv6 uses 128-bit addresses (2^128 ≈ 340 undecillion), providing virtually unlimited addresses. Beyond addressing: IPv6 also eliminates broadcast (replaced by multicast), removes the header checksum (faster router processing), eliminates router fragmentation, replaces ARP with NDP (Neighbor Discovery Protocol), and enables SLAAC for automatic stateless address configuration. IPv6 is a redesigned protocol, not just IPv4 with a larger address field.
      </IQ>

      <IQ q="What does :: mean in an IPv6 address, and what are the two compression rules?" level="Beginner">
        :: (double colon) represents one or more consecutive groups of all zeros (0000:0000:...) collapsed to nothing. Two compression rules: (1) Remove leading zeros in each 16-bit group (0db8 → db8, 0001 → 1, 0000 → 0). (2) Replace the longest consecutive run of all-zero groups with :: — this can appear only once per address. Example: 2001:0db8:0000:0000:0000:0000:0000:0001 → first remove leading zeros: 2001:db8:0:0:0:0:0:1 → then collapse zeros: 2001:db8::1. The :: expansion: to find how many zero groups :: represents, count existing hextets and subtract from 8. In 2001:db8::1, there are 3 explicit hextets, so :: represents 5 zero groups.
      </IQ>

      <IQ q="Explain SLAAC and how a host generates its IPv6 address automatically." level="Intermediate">
        SLAAC (Stateless Address Autoconfiguration, RFC 4862) allows a host to configure a global IPv6 address without DHCP. Process: (1) Host generates a link-local address (fe80::/10 + interface ID) immediately. (2) Host sends Router Solicitation (RS) to ff02::2 (all routers). (3) Router responds with Router Advertisement (RA) containing the network prefix (e.g., 2001:db8::/64) and flags. (4) If A flag is set in the RA prefix option, host generates the global address: prefix + EUI-64 interface ID (derived from MAC address). (5) Duplicate Address Detection (DAD): host sends Neighbor Solicitation to the solicited-node multicast address, waits 1 second. If no response, the address is unique. (6) Address enters "preferred" state and is usable. No DHCP server needed — the router's RA provides all necessary information.
      </IQ>

      <IQ q="What is the difference between DHCPv6 and SLAAC? Which provides the default gateway?" level="Intermediate">
        SLAAC is stateless — the host generates its own address from the router-provided prefix, with no server tracking the assignment. DHCPv6 is stateful — a DHCPv6 server assigns specific addresses and tracks leases. The RA's M flag tells hosts to use DHCPv6 for address assignment; O flag tells hosts to use DHCPv6 for other configuration (DNS servers, domain name) while using SLAAC for the address. Critical difference: DHCPv6 does NOT provide a default gateway. In IPv6, the default gateway is always the router's link-local address, learned from the Router Advertisement. This is a fundamental design choice. Even if DHCPv6 provides all addresses, if no RA is received, hosts have no default route.
      </IQ>

      <IQ q="How does NDP replace ARP, and what improvements does it make?" level="Senior">
        IPv4 ARP uses Layer 2 broadcast (255.255.255.255) for address resolution — every host on the subnet must receive and process every ARP request. NDP's Neighbor Solicitation uses solicited-node multicast (ff02::1:ff+last 24 bits of target address). Only hosts sharing those last 24 bits join this multicast group (typically just one host in practice). This dramatically reduces per-host interrupt load. NDP also incorporates: Router Discovery (RA/RS replace ICMP Router Discovery), Duplicate Address Detection (DAD — before using an address, verify uniqueness), Prefix Discovery (hosts learn on-link prefixes from RA), PMTU Discovery integration, and Redirect messages (better next-hop notification). The Neighbor Cache maintains liveness states (REACHABLE, STALE, PROBE, DELAY) and proactively detects reachability failures — more robust than ARP's binary present/absent model.
      </IQ>

      <IQ q="Explain the IPv6 transition mechanisms — dual stack, tunneling, and NAT64 — and when each is appropriate. What is the end goal?" level="PhD">
        IPv6 transition involves a spectrum of coexistence mechanisms, each addressing different deployment scenarios: Dual stack (IPv4 + IPv6 simultaneously on every node) is the preferred mechanism for the transition period. It requires IPv6 support everywhere but enables native IPv6 connectivity with IPv4 fallback. Content providers and end-user devices use dual stack with Happy Eyeballs (RFC 8305) — attempt IPv6 first, fall back to IPv4 after 250ms timeout if IPv6 fails. Dual stack does not reduce IPv4 dependency — it simply adds IPv6 alongside. Tunneling (6in4, 6rd, DS-Lite) encapsulates IPv6 inside IPv4 (or vice versa). 6in4: manual point-to-point tunnels between IPv6 routers across IPv4-only transit — used for enterprise islands. 6rd (Rapid Deployment): ISP-scale tunneling where customer IPv6 address embeds their IPv4 address, enabling ISPs to provide IPv6 service quickly over existing IPv4 infrastructure. DS-Lite: ISP provides customers native IPv6 but tunnels their IPv4 traffic to central AFTR for NAT44 — extends IPv4 lifetime by moving NAT to the carrier. NAT64/DNS64: pure IPv6-only clients reach IPv4-only servers via NAT64 gateway. DNS64 synthesizes AAAA records by prepending the NAT64 /96 prefix to IPv4 addresses. This enables IPv6-only networks (mobile, new deployments) to access the remaining IPv4-only internet. The end goal: IPv6-only networks with NAT64/DNS64 for legacy IPv4 access — the same model as today's ISPs using CGNAT. The trajectory: mobile networks are already predominantly IPv6-only. As IPv4 content percentages drop (already below 40% of Google traffic), NAT64/DNS64 handles diminishing IPv4 traffic. Eventually: IPv4 is deprecated, remaining IPv4-only content is translated via anycast NAT64 infrastructure, and IPv6 is the universal internet protocol.
      </IQ>

      <KeyTakeaways items={[
        'IPv6 uses 128-bit addresses (2^128 ≈ 340 undecillion) — enough for every atom on Earth to have a globally routable address, permanently solving IPv4 exhaustion.',
        'IPv6 addresses are written as 8 groups of 4 hex digits (hextets). Compression: remove leading zeros per group, collapse longest consecutive zero-group run with :: (once only).',
        'Every IPv6 interface automatically generates a link-local address (fe80::/10) — required for NDP before global address configuration.',
        'SLAAC (Stateless Address Autoconfiguration) lets hosts derive a global IPv6 address from the network prefix in Router Advertisements, without any DHCP server.',
        'DHCPv6 does NOT provide a default gateway — the gateway is always the router\'s link-local address learned from Router Advertisements.',
        'NDP (Neighbor Discovery Protocol) replaces ARP, using solicited-node multicast instead of broadcast — targeting only likely recipients rather than all hosts on the subnet.',
        'IPv6 has no router fragmentation — routers drop oversized packets and send ICMPv6 "Packet Too Big." Only the source can fragment, via the Fragment extension header.',
        'IPv6 has no header checksum — eliminated to speed router processing; Layer 2 FCS and Layer 4 checksums provide integrity.',
        'IPv6 eliminates broadcast entirely — replaced by multicast. ff02::1 = all nodes, ff02::2 = all routers, ff02::1:ff../104 = solicited-node multicast for NDP.',
        'Dual stack + Happy Eyeballs is the standard transition strategy: prefer IPv6, fall back to IPv4 within 250ms. NAT64/DNS64 enables IPv6-only networks to reach IPv4 servers.',
      ]} />
    </LearnLayout>
  )
}
