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

// ─── interactive component 1: Attack Category Explorer ───────────────────────
type NetworkAttack = {
  id: string
  name: string
  category: 'reconnaissance' | 'spoofing' | 'mitm' | 'dos' | 'exploitation' | 'lateral'
  layer: string
  mechanism: string
  detection: string
  mitigation: string
  severity: 'Critical' | 'High' | 'Medium' | 'Low'
  realWorld: string
  color: string
}
const NETWORK_ATTACKS: NetworkAttack[] = [
  {
    id: 'port-scan',
    name: 'Port Scanning',
    category: 'reconnaissance',
    layer: 'Transport (L4)',
    mechanism: 'Attacker sends TCP SYN or UDP packets to enumerate open ports. SYN scan (half-open): SYN sent, RST received = closed, SYN-ACK = open. XMAS scan: FIN+PSH+URG set; closed ports reply RST, open ports silent (per RFC 793).',
    detection: 'IDS rules on sequential port access from same source. Honeypot ports (any connection = alert). High connection rate from single IP.',
    mitigation: 'Firewall drop-all default policy. Return firewall rejects (versus drops) only for explicitly permitted ports. Fail2ban to block rapid scanners.',
    severity: 'Low',
    realWorld: 'Nmap is used in nearly every penetration test. Port scanning alone is not an attack — it is intelligence gathering. The value: knowing which services are exposed before choosing an exploit.',
    color: '#3b82f6',
  },
  {
    id: 'arp-spoof',
    name: 'ARP Spoofing / Poisoning',
    category: 'spoofing',
    layer: 'Data Link (L2)',
    mechanism: 'ARP has no authentication. Attacker broadcasts gratuitous ARP replies claiming their MAC is the gateway\'s IP. Victim updates ARP cache. All victim traffic now flows through attacker (MITM) or to /dev/null (DoS). Works within a broadcast domain.',
    detection: 'Dynamic ARP Inspection (DAI) on managed switches. ARP cache monitoring tools (arpwatch). Duplicate IP alerts.',
    mitigation: 'Enable Dynamic ARP Inspection (DAI) on switches with DHCP snooping binding table. Static ARP entries for critical hosts. 802.1X port authentication.',
    severity: 'High',
    realWorld: 'ARP spoofing is the foundation of most LAN-based MITM attacks. Tools: arpspoof, ettercap, bettercap. Combined with SSL stripping to intercept HTTPS credentials.',
    color: '#ef4444',
  },
  {
    id: 'dns-spoof',
    name: 'DNS Cache Poisoning',
    category: 'spoofing',
    layer: 'Application (L7)',
    mechanism: 'Attacker races to send a forged DNS response before the real response arrives. The Kaminsky attack (2008) exploited the small entropy of DNS transaction IDs (16-bit) and source ports. By flooding a recursive resolver with forged responses, attacker injects a malicious NS record for an entire domain.',
    detection: 'Monitor for sudden DNS record changes. DNSSEC validation failures. Multiple conflicting responses for same query.',
    mitigation: 'DNSSEC: cryptographic chain of trust from root to zone. DNS over HTTPS/TLS (DoH/DoT) prevents injection on path. Randomize source port + transaction ID (Kaminsky patch).',
    severity: 'Critical',
    realWorld: 'Dan Kaminsky disclosed this in 2008 to CERT; coordinated patch released in 4 months. Before patching, most resolvers could be poisoned in under 10 seconds.',
    color: '#ef4444',
  },
  {
    id: 'syn-flood',
    name: 'SYN Flood (TCP DoS)',
    category: 'dos',
    layer: 'Transport (L4)',
    mechanism: 'Attacker sends millions of TCP SYN packets with spoofed source IPs. Server allocates state for each half-open connection (SYN-RECEIVED). The SYN backlog fills. Legitimate connections are rejected with RST or silently dropped. The forged IPs never complete the handshake.',
    detection: 'High rate of SYN packets. Large number of half-open connections in netstat. Backlog queue full errors in kernel logs.',
    mitigation: 'SYN cookies: no state allocated until SYN-ACK is acknowledged. Rate limiting SYN packets per IP. Upstream scrubbing services for volumetric attacks.',
    severity: 'High',
    realWorld: 'SYN flood was one of the first DDoS techniques (1996). SYN cookies (Stevens 1994, deployed widely ~1998) largely solved it at the kernel level. Still used as a component of multi-vector DDoS.',
    color: '#f59e0b',
  },
  {
    id: 'ssl-strip',
    name: 'SSL Stripping',
    category: 'mitm',
    layer: 'Application (L7)',
    mechanism: 'After ARP spoofing, attacker sits between client and server. When client requests HTTP, attacker fetches HTTPS from server but serves HTTP to client. Client sees HTTP (no lock icon). All plaintext flows through attacker. The site may redirect HTTP→HTTPS but the attacker intercepts that redirect.',
    detection: 'HSTS (HTTP Strict Transport Security) prevents downgrade. Client-side: missing HTTPS, missing lock icon.',
    mitigation: 'HSTS with long max-age. HSTS Preload (browser hardcoded list). Certificate Transparency. Network-level: prevent ARP spoofing with DAI.',
    severity: 'Critical',
    realWorld: 'Moxie Marlinspike presented sslstrip at Black Hat 2009. Devastated HTTP→HTTPS redirect-dependent sites. HSTS was standardized partly in response.',
    color: '#ef4444',
  },
  {
    id: 'bgp-hijack',
    name: 'BGP Route Hijacking',
    category: 'exploitation',
    layer: 'Network (L3)',
    mechanism: 'BGP has no authentication by default. Malicious AS announces a more specific prefix (/24 vs /16) than the legitimate owner. Internet routers prefer more-specific routes. Traffic for that prefix is redirected to the attacker. Attacker can read, modify, or drop traffic before forwarding to the legitimate destination.',
    detection: 'BGP route monitoring services (RIPE Stat, BGPmon). RouteViews. Alert on unexpected origin ASN for own prefixes.',
    mitigation: 'RPKI (Resource Public Key Infrastructure): cryptographically signed Route Origin Authorizations (ROAs). BGPsec: signed AS path. IRR filtering. Peer filters.',
    severity: 'Critical',
    realWorld: 'Pakistan Telecom hijacked YouTube\'s /24 prefixes in 2008, taking YouTube offline globally for 2 hours. Multiple nation-state BGP hijacks documented annually.',
    color: '#ef4444',
  },
  {
    id: 'lateral',
    name: 'Network Lateral Movement',
    category: 'lateral',
    layer: 'Multiple',
    mechanism: 'After initial compromise, attacker maps the internal network (ping sweeps, port scans), finds accessible systems via SMB, SSH, RDP, WMI. Extracts credentials (mimikatz, pass-the-hash). Uses compromised credentials to authenticate to other systems without detection in normal authentication logs.',
    detection: 'Unusual internal port scans. New SSH/RDP sessions at odd hours. Pass-the-hash detection in SIEM. Honeypots/honeytokens on internal network.',
    mitigation: 'Network segmentation. Privileged access workstations. Credential tiering. JIT (just-in-time) access. East-west traffic inspection (NGFW/IDPS). Zero Trust architecture.',
    severity: 'Critical',
    realWorld: 'NotPetya (2017) used EternalBlue + Mimikatz to move laterally across networks with no internet exposure, encrypting every Windows machine. $10B+ estimated damage.',
    color: '#8b5cf6',
  },
]
const ATK_CATS = ['all', 'reconnaissance', 'spoofing', 'mitm', 'dos', 'exploitation', 'lateral'] as const
type AtkCat = typeof ATK_CATS[number]
const ATK_CAT_COLOR: Record<AtkCat, string> = { all: '#6366f1', reconnaissance: '#3b82f6', spoofing: '#ef4444', mitm: '#f97316', dos: '#f59e0b', exploitation: '#8b5cf6', lateral: '#10b981' }

function AttackCategoryExplorer() {
  const [cat, setCat] = useState<AtkCat>('all')
  const [active, setActive] = useState<string | null>('syn-flood')
  const visible = cat === 'all' ? NETWORK_ATTACKS : NETWORK_ATTACKS.filter(a => a.category === cat)
  const sel = active ? NETWORK_ATTACKS.find(a => a.id === active) : null

  return (
    <div style={{ background: '#f8fafc', border: '2px solid #6366f1', borderRadius: '14px', padding: '1.5rem', margin: '1.5rem 0' }}>
      <h3 style={{ fontWeight: 800, color: '#6366f1', marginBottom: '0.25rem' }}>Network Attack Explorer</h3>
      <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.25rem' }}>Filter by category, click an attack to see how it works and how to defend against it.</p>
      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        {ATK_CATS.map(c => (
          <button key={c} onClick={() => setCat(c)}
            style={{ padding: '0.35rem 0.8rem', borderRadius: '7px', border: `2px solid ${ATK_CAT_COLOR[c]}`, background: cat === c ? ATK_CAT_COLOR[c] : '#fff', color: cat === c ? '#fff' : ATK_CAT_COLOR[c], fontWeight: 700, cursor: 'pointer', fontSize: '0.8rem', textTransform: 'capitalize' }}>
            {c}
          </button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: '0.5rem', marginBottom: '1rem' }}>
        {visible.map(a => (
          <div key={a.id}
            onClick={() => setActive(active === a.id ? null : a.id)}
            style={{ cursor: 'pointer', borderRadius: '8px', border: `2px solid ${active === a.id ? a.color : '#e2e8f0'}`, background: active === a.id ? '#f0f4ff' : '#fff', padding: '0.55rem 0.85rem' }}>
            <div style={{ fontWeight: 700, color: a.color, fontSize: '0.88rem', marginBottom: '0.2rem' }}>{a.name}</div>
            <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{a.layer}</div>
            <span style={{ background: a.severity === 'Critical' ? '#fef2f2' : a.severity === 'High' ? '#fff7ed' : '#fefce8', color: a.severity === 'Critical' ? '#dc2626' : a.severity === 'High' ? '#ea580c' : '#ca8a04', borderRadius: '4px', padding: '0.1rem 0.4rem', fontSize: '0.75rem', fontWeight: 700 }}>{a.severity}</span>
          </div>
        ))}
      </div>
      {sel && (
        <div style={{ background: '#fff', borderRadius: '10px', border: `2px solid ${sel.color}`, padding: '1.1rem 1.25rem' }}>
          <div style={{ fontWeight: 800, color: sel.color, fontSize: '1.05rem', marginBottom: '0.5rem' }}>{sel.name}</div>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.65rem', flexWrap: 'wrap' }}>
            <span style={{ background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '5px', padding: '0.15rem 0.55rem', fontSize: '0.82rem', color: '#334155' }}>Layer: {sel.layer}</span>
            <span style={{ background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '5px', padding: '0.15rem 0.55rem', fontSize: '0.82rem', color: '#334155', textTransform: 'capitalize' }}>Category: {sel.category}</span>
          </div>
          {[['Mechanism', sel.mechanism], ['Detection', sel.detection], ['Mitigation', sel.mitigation], ['Real-World Example', sel.realWorld]].map(([label, text]) => (
            <div key={label as string} style={{ marginBottom: '0.65rem' }}>
              <div style={{ fontWeight: 700, color: '#475569', fontSize: '0.82rem', marginBottom: '0.2rem' }}>{label as string}</div>
              <div style={{ color: '#334155', lineHeight: 1.7, fontSize: '0.92rem' }}>{text as string}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── interactive component 2: TCP/IP Stack Attack Surface ────────────────────
type LayerAttacks = {
  layer: string
  number: number
  protocols: string[]
  attacks: { name: string; brief: string }[]
  color: string
}
const LAYER_ATTACKS: LayerAttacks[] = [
  { layer: 'Application', number: 7, protocols: ['HTTP', 'DNS', 'SMTP', 'TLS'], attacks: [{ name: 'SQL Injection', brief: 'Malicious SQL in input fields executes on database' }, { name: 'XSS', brief: 'Injected scripts run in victim\'s browser session' }, { name: 'DNS Cache Poisoning', brief: 'Forged DNS responses redirect traffic' }, { name: 'SSL Stripping', brief: 'Downgrades HTTPS to HTTP in MITM position' }], color: '#8b5cf6' },
  { layer: 'Transport', number: 4, protocols: ['TCP', 'UDP', 'TLS handshake'], attacks: [{ name: 'SYN Flood', brief: 'Half-open connections exhaust server backlog' }, { name: 'UDP Flood', brief: 'Amplified UDP traffic overwhelms bandwidth' }, { name: 'TCP Session Hijacking', brief: 'Inject packets into established TCP stream with correct seq nums' }, { name: 'Port Scanning', brief: 'Enumerate open services as reconnaissance' }], color: '#3b82f6' },
  { layer: 'Network', number: 3, protocols: ['IP', 'ICMP', 'BGP', 'OSPF'], attacks: [{ name: 'IP Spoofing', brief: 'Forge source IP to bypass ACLs or enable amplification' }, { name: 'ICMP Redirect', brief: 'Trick host into using attacker as next-hop' }, { name: 'BGP Hijacking', brief: 'Announce more-specific prefix to redirect internet traffic' }, { name: 'Smurf Attack', brief: 'Ping broadcast with spoofed victim IP; all hosts reply to victim' }], color: '#10b981' },
  { layer: 'Data Link', number: 2, protocols: ['ARP', 'Ethernet', '802.1Q', 'STP'], attacks: [{ name: 'ARP Spoofing', brief: 'Poison ARP cache to become MITM on local segment' }, { name: 'VLAN Hopping', brief: 'Double-tag 802.1Q frames to access VLANs across trunk' }, { name: 'MAC Flooding', brief: 'Fill CAM table; switch broadcasts all frames (like hub)' }, { name: 'STP Attack', brief: 'Claim to be root bridge via BPDU; control forwarding topology' }], color: '#f59e0b' },
  { layer: 'Physical', number: 1, protocols: ['Ethernet PHY', 'Wi-Fi 802.11', 'Fiber'], attacks: [{ name: 'Jamming', brief: 'Radio interference disrupts wireless communication' }, { name: 'Rogue AP', brief: 'Evil twin access point captures Wi-Fi clients' }, { name: 'Wiretapping', brief: 'Physical tap on cable to capture traffic' }, { name: 'Cable cutting', brief: 'Physical severing of network links' }], color: '#64748b' },
]

function TcpIpAttackSurface() {
  const [active, setActive] = useState<number>(4)
  const l = LAYER_ATTACKS.find(x => x.number === active)!

  return (
    <div style={{ background: '#f8fafc', border: '2px solid #10b981', borderRadius: '14px', padding: '1.5rem', margin: '1.5rem 0' }}>
      <h3 style={{ fontWeight: 800, color: '#10b981', marginBottom: '0.25rem' }}>TCP/IP Stack Attack Surface</h3>
      <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.25rem' }}>Select a layer to see which attacks target it.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.25rem' }}>
        {[...LAYER_ATTACKS].reverse().map(la => (
          <div key={la.number}
            onClick={() => setActive(la.number)}
            style={{ cursor: 'pointer', borderRadius: '9px', border: `2px solid ${active === la.number ? la.color : '#e2e8f0'}`, background: active === la.number ? '#f0f4ff' : '#fff', padding: '0.6rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', transition: 'all 0.12s' }}>
            <span style={{ background: la.color, color: '#fff', borderRadius: '6px', padding: '0.2rem 0.6rem', fontWeight: 800, fontSize: '0.82rem', minWidth: '30px', textAlign: 'center' }}>L{la.number}</span>
            <span style={{ fontWeight: 700, color: '#1e293b', flex: 1 }}>{la.layer}</span>
            <span style={{ fontSize: '0.82rem', color: '#64748b' }}>{la.protocols.join(', ')}</span>
          </div>
        ))}
      </div>
      <div style={{ background: '#fff', borderRadius: '10px', border: `2px solid ${l.color}`, padding: '1rem 1.25rem' }}>
        <div style={{ fontWeight: 800, color: l.color, marginBottom: '0.75rem' }}>Layer {l.number} — {l.layer} Attacks</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
          {l.attacks.map(a => (
            <div key={a.name} style={{ background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', padding: '0.65rem 0.9rem' }}>
              <div style={{ fontWeight: 700, color: '#1e293b', fontSize: '0.9rem', marginBottom: '0.2rem' }}>{a.name}</div>
              <div style={{ color: '#64748b', fontSize: '0.83rem', lineHeight: 1.6 }}>{a.brief}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── interactive component 3: MITM Attack Chain ──────────────────────────────
type MitmStep = {
  id: number
  phase: string
  action: string
  tools: string[]
  defense: string
  color: string
}
const MITM_STEPS: MitmStep[] = [
  { id: 1, phase: 'Network Access', action: 'Attacker connects to the same network segment as the target. Could be Wi-Fi (rogue AP or legitimate network), LAN (physical or compromised host on subnet).', tools: ['Physical access', 'Rogue AP (hostapd)', 'Previously compromised host'], defense: '802.1X port authentication. WPA3-Enterprise for Wi-Fi. Network segmentation.', color: '#64748b' },
  { id: 2, phase: 'ARP Spoofing', action: 'Attacker sends gratuitous ARP replies to victim: "I am the gateway (IP 192.168.1.1)." And to gateway: "I am the victim (IP 192.168.1.50)." Both update their ARP caches. Traffic flows attacker→gateway and vice versa.', tools: ['arpspoof', 'ettercap', 'bettercap'], defense: 'Dynamic ARP Inspection (DAI). Static ARP entries. ARP monitoring (arpwatch).', color: '#ef4444' },
  { id: 3, phase: 'IP Forwarding', action: 'Attacker enables IP forwarding (sysctl net.ipv4.ip_forward=1) to relay traffic between victim and gateway. Without this, the MITM becomes a DoS — traffic is consumed but not forwarded.', tools: ['sysctl ip_forward', 'iptables FORWARD rules'], defense: 'Encrypted traffic (TLS) is visible as ciphertext only. Detect forwarding hosts via TTL anomalies.', color: '#f59e0b' },
  { id: 4, phase: 'Traffic Interception', action: 'Attacker captures all traffic flowing through with tcpdump/Wireshark. HTTP traffic is readable immediately. HTTPS traffic is encrypted — attacker sees ciphertext, TLS SNI, and metadata (IP, ports, sizes) but not content.', tools: ['Wireshark', 'tcpdump', 'mitmproxy'], defense: 'HTTPS everywhere. Certificate pinning. HSTS preload.', color: '#f97316' },
  { id: 5, phase: 'SSL Stripping (HTTP only)', action: 'For sites reachable via HTTP, attacker intercepts HTTP 301/302 redirects to HTTPS, serves HTTP to the client while speaking HTTPS to the server. Victim sees no padlock. Credentials entered over HTTP are captured in plaintext.', tools: ['sslstrip', 'bettercap ssl-strip'], defense: 'HSTS (max-age=31536000). HSTS Preload list. HTTP-only endpoints should not exist.', color: '#8b5cf6' },
  { id: 6, phase: 'TLS Interception (proxy cert)', action: 'For HTTPS, attacker presents a forged certificate signed by their own CA. If victim\'s browser doesn\'t trust attacker CA, certificate error. If attacker installs their CA (corporate proxy, MDM) or the user clicks through the warning — all HTTPS traffic is decrypted.', tools: ['mitmproxy', 'Burp Suite', 'corporate DLP proxies'], defense: 'Certificate pinning. Certificate Transparency. HPKP (deprecated). Browser warnings must not be ignored.', color: '#6366f1' },
]

function MitmAttackChain() {
  const [active, setActive] = useState<number>(2)
  const step = MITM_STEPS.find(s => s.id === active)!

  return (
    <div style={{ background: '#f8fafc', border: '2px solid #8b5cf6', borderRadius: '14px', padding: '1.5rem', margin: '1.5rem 0' }}>
      <h3 style={{ fontWeight: 800, color: '#8b5cf6', marginBottom: '0.25rem' }}>MITM Attack Chain</h3>
      <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.25rem' }}>Click each phase to understand the technique and the defense.</p>
      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        {MITM_STEPS.map(s => (
          <button key={s.id} onClick={() => setActive(s.id)}
            style={{ padding: '0.4rem 0.85rem', borderRadius: '8px', border: `2px solid ${s.color}`, background: active === s.id ? s.color : '#fff', color: active === s.id ? '#fff' : s.color, fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem' }}>
            {s.id}. {s.phase}
          </button>
        ))}
      </div>
      <div style={{ background: '#fff', borderRadius: '10px', border: `2px solid ${step.color}`, padding: '1.1rem 1.25rem' }}>
        <div style={{ fontWeight: 800, color: step.color, fontSize: '1.05rem', marginBottom: '0.5rem' }}>Phase {step.id}: {step.phase}</div>
        <div style={{ color: '#334155', lineHeight: 1.75, marginBottom: '0.75rem' }}>{step.action}</div>
        <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <div style={{ fontWeight: 700, color: '#475569', fontSize: '0.82rem', marginBottom: '0.35rem' }}>TOOLS</div>
            <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
              {step.tools.map((t, i) => (
                <span key={i} style={{ background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '5px', padding: '0.15rem 0.55rem', fontSize: '0.83rem', color: '#334155', fontFamily: 'monospace' }}>{t}</span>
              ))}
            </div>
          </div>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <div style={{ fontWeight: 700, color: '#475569', fontSize: '0.82rem', marginBottom: '0.35rem' }}>DEFENSE</div>
            <div style={{ color: '#334155', lineHeight: 1.65, fontSize: '0.9rem' }}>{step.defense}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── main export ─────────────────────────────────────────────────────────────
export default function NetworkAttacksPage() {
  return (
    <LearnLayout
      title="Network Attacks"
      description="From ARP spoofing to BGP hijacking, from SYN floods to SSL stripping: how attacks exploit protocol design, and what defenders can do about it."
      section="Networking Fundamentals — Module 33"
      readTime="30–42 min"
      updatedAt="May 2026"
    >
      {/* ── Chapter 1 ─────────────────────────────────────────── */}
      <Chapter n={1} title="The Attacker's Advantage: Protocols Built on Trust" />
      <StoryBox>
        1988. Cornell graduate student Robert Morris launches the first major internet worm. It exploits sendmail, fingerd, and rsh — all protocols that trusted each other by hostname. No authentication, no authorization, just a hostname check. The worm infects 6,000 machines — 10% of the internet. Morris is convicted under the Computer Fraud and Abuse Act. The lesson the internet took 30 years to learn: trust must be earned, not assumed.
      </StoryBox>
      <Para>
        Most networking protocols were designed in an era when the internet was a small, trusted research network. The foundational assumptions — that routers won't lie, that DNS responses are honest, that ARP is reliable, that source IPs are authentic — were reasonable in 1981 but catastrophically wrong in 2026.
      </Para>
      <Para>
        Network attacks exploit the gap between protocol design assumptions and deployment reality. Understanding these attacks is not about learning to cause harm — it is about understanding why security controls work, where they fail, and how to build systems that survive hostile environments.
      </Para>
      <Warn>
        This module covers attack techniques for defensive and educational purposes. Understanding how attacks work is essential for designing effective defenses, conducting authorized penetration tests, and passing security certifications (CISSP, CEH, OSCP). Do not use this knowledge to attack systems you do not own or do not have explicit written permission to test.
      </Warn>
      <WowBox>
        The original TCP specification (RFC 793, 1981) contains no mention of security. IP (RFC 791) was designed to route packets to their destination, not to verify they came from where they claim. ARP (RFC 826, 1982) explicitly states it has no authentication mechanism. These were not oversights — they were deliberate tradeoffs for simplicity in a trusted environment. The problem is that the environment changed.
      </WowBox>

      <Divider />
      {/* ── Chapter 2 ─────────────────────────────────────────── */}
      <Chapter n={2} title="Reconnaissance: Know Your Target" />
      <StoryBox>
        Sun Tzu wrote: "Know your enemy and know yourself; in a hundred battles you will never be defeated." Every real attack begins with reconnaissance — gathering information about the target network, its services, its topology, and its vulnerabilities. Defenders who understand reconnaissance techniques can detect them in progress and reduce information leakage.
      </StoryBox>
      <H2>Port Scanning</H2>
      <Para>
        Port scanning determines which TCP/UDP ports are open on a host. Each open port reveals a running service — each service has a version, each version has known vulnerabilities. Nmap is the canonical tool:
      </Para>
      <CodeBlock>{`# TCP SYN scan (half-open, stealthy — no full connection)
nmap -sS -p 1-65535 192.168.1.0/24

# Version detection (-sV) + OS fingerprinting (-O)
nmap -sV -O 192.168.1.1

# Aggressive scan (all detection, scripts, traceroute)
nmap -A 192.168.1.1

# UDP scan (slower, requires root)
nmap -sU -p 53,123,161,500 192.168.1.1

# Timing: -T0 (paranoid, slow) to -T5 (insane, noisy)
nmap -T2 -sS 10.0.0.0/24   # quieter scan

# Detect scan with IDS: Suricata rule
# alert tcp any any -> $HOME_NET any (msg:"Port Scan detected"; flags:S; threshold: type both, track by_src, count 10, seconds 60; sid:1001)`}</CodeBlock>
      <H2>Network Enumeration</H2>
      <Para>
        Beyond port scanning, attackers enumerate:
      </Para>
      <Para>
        — <Accent>DNS enumeration</Accent>: zone transfers, brute-force subdomain discovery, reverse DNS for IP ranges. Tools: dig axfr, dnsenum, Subfinder.
      </Para>
      <Para>
        — <Accent>SNMP enumeration</Accent>: if SNMP community strings are guessable, the entire device configuration is exposed.
      </Para>
      <Para>
        — <Accent>Banner grabbing</Accent>: connecting to services and reading their version banners. SSH, HTTP headers, FTP 220 banners all reveal software versions.
      </Para>
      <Para>
        — <Accent>OSINT</Accent>: Shodan/Censys for internet-exposed services, Whois for domain registration, BGP routing tables for IP ownership.
      </Para>
      <H2>Defense Against Reconnaissance</H2>
      <Para>
        Reduce information leakage: suppress banner messages (no SSH version in banner, no Server: header in HTTP, no SMTP banner revealing MTA version). Block SNMP from internet. Disable DNS zone transfers. Deploy honeypot ports — any connection to a non-running service triggers an alert.
      </Para>

      <Divider />
      {/* ── Chapter 3 ─────────────────────────────────────────── */}
      <Chapter n={3} title="Layer 2 Attacks: Poisoning the Local Network" />
      <StoryBox>
        An attacker sits in a coffee shop. They connect to the Wi-Fi. Their laptop sees 30 other devices on the /24 subnet — laptops, phones, tablets. They run bettercap, start ARP spoofing the gateway, and enable HTTP interception. Within 2 minutes, a bank employee connects to an internal app via HTTP. The credentials flow through the attacker's machine in plaintext. The employee never notices a thing — they're connected to the right network; it's just that every packet takes a detour.
      </StoryBox>
      <H2>ARP Spoofing in Detail</H2>
      <Para>
        ARP (Address Resolution Protocol) maps IP addresses to MAC addresses within a broadcast domain. The protocol has no authentication — any host can claim any IP-to-MAC mapping. An attacker exploits this by sending unsolicited (gratuitous) ARP replies:
      </Para>
      <CodeBlock>{`# Gratuitous ARP: "I am 192.168.1.1, MAC is AA:BB:CC:DD:EE:FF"
# Sent to broadcast — all hosts update their ARP caches

# Attacker runs:
arpspoof -i eth0 -t 192.168.1.50 192.168.1.1  # tell victim: gateway MAC = attacker
arpspoof -i eth0 -t 192.168.1.1 192.168.1.50  # tell gateway: victim MAC = attacker

# Enable forwarding so traffic actually reaches destination
sysctl -w net.ipv4.ip_forward=1

# Now run:
wireshark -i eth0   # capture all traffic between victim and gateway`}</CodeBlock>
      <H2>MAC Flooding</H2>
      <Para>
        A switch's CAM (Content Addressable Memory) table maps MAC addresses to switch ports. If an attacker floods the switch with frames from thousands of fake MAC addresses, the CAM table fills up. The switch falls back to flooding all frames to all ports — effectively becoming a hub. The attacker receives all traffic on the segment.
      </Para>
      <Para>
        Defense: Port Security — limit the number of MAC addresses allowed per port. When exceeded, the port can shut down (err-disable) or drop the offending frames.
      </Para>
      <H2>VLAN Hopping</H2>
      <Para>
        VLAN hopping exploits trunk ports. An attacker sends double-tagged 802.1Q frames: an outer tag for the attacker's VLAN, an inner tag for the target VLAN. The first switch removes the outer tag and forwards on the trunk. The second switch sees the inner tag and delivers to the target VLAN. Defense: never use the native VLAN (VLAN 1) for user traffic; set a dedicated unused VLAN as the native VLAN on all trunks.
      </Para>
      <H2>STP Attacks</H2>
      <Para>
        Spanning Tree Protocol (STP) prevents Layer 2 loops by electing a root bridge and blocking redundant paths. An attacker can send STP BPDUs (Bridge Protocol Data Units) claiming to be the root bridge with the best priority. If the switch accepts it, the STP topology changes — potentially redirecting all traffic through the attacker's port. Defense: BPDU Guard on access ports (drops any received BPDU; error-disables the port).
      </Para>

      <Divider />
      {/* ── Chapter 4 ─────────────────────────────────────────── */}
      <Chapter n={4} title="Layer 3 Attacks: Routing and IP-Level Manipulation" />
      <StoryBox>
        2010. China Telecom accidentally announces BGP routes for 37,000 IP prefixes belonging to US government agencies, military, and major internet services. Traffic for the Pentagon, NASDAQ, and many others was briefly routed through China. The word "accidentally" is disputed by some researchers. BGP has no mechanism to prevent this — any AS can announce any prefix, and the internet will route traffic toward it.
      </StoryBox>
      <H2>IP Source Address Spoofing</H2>
      <Para>
        IP packets carry a source address field that can be set to any value. There is no verification by default. Attackers use spoofed source IPs for:
      </Para>
      <Para>
        — <Accent>Amplification attacks</Accent>: sending requests with victim's IP as source; servers send large responses to victim.
      </Para>
      <Para>
        — <Accent>ACL bypass</Accent>: spoofing a trusted IP to pass firewall rules that allow traffic from that address.
      </Para>
      <Para>
        — <Accent>TCP blind injection</Accent>: if an attacker can predict TCP sequence numbers, they can inject packets into a TCP session without being on-path.
      </Para>
      <Para>
        <Accent>BCP 38 (Network Ingress Filtering)</Accent>: ISPs should filter packets leaving their network with source IPs that don't belong to their customers. This prevents spoofing of external IPs from inside the network. ISPs that implement BCP 38 significantly reduce amplification attacks from their networks.
      </Para>
      <H2>ICMP Redirect Attack</H2>
      <Para>
        ICMP Redirect messages tell a host to use a different gateway for a specific destination. Legitimate use: routers telling hosts about a better route on the local segment. Attacker use: send forged ICMP Redirects to a host, redirecting all traffic through the attacker's IP. Defense: disable ICMP Redirect acceptance (Linux: <Code>net.ipv4.conf.all.accept_redirects=0</Code>).
      </Para>
      <H2>BGP Route Hijacking</H2>
      <Para>
        BGP (Border Gateway Protocol) is the internet's routing protocol. It operates on trust — each AS announces the prefixes it is authoritative for, and neighboring ASes propagate these announcements. There is no cryptographic verification of whether an AS legitimately owns the prefix it announces.
      </Para>
      <Para>
        Attack: an AS announces a more-specific prefix (/24 versus the legitimate owner's /16). Internet routers prefer more-specific routes (longest prefix match), so traffic is redirected to the hijacking AS.
      </Para>
      <Para>
        <Accent>RPKI</Accent> (Resource Public Key Infrastructure): Regional Internet Registries (ARIN, RIPE, etc.) sign Route Origin Authorizations (ROAs) — cryptographic statements that "AS 65001 is authorized to originate prefix 203.0.113.0/24." Routers with RPKI validation reject route announcements that conflict with ROAs. RPKI adoption reached 60%+ of internet routing by 2024.
      </Para>
      <AttackCategoryExplorer />

      <Divider />
      {/* ── Chapter 5 ─────────────────────────────────────────── */}
      <Chapter n={5} title="Man-in-the-Middle Attacks: The Complete Chain" />
      <StoryBox>
        MITM is not a single attack — it is a capability achieved by chaining multiple techniques. The attacker must first gain a network position (ARP spoof, rogue AP, compromised router), then intercept traffic (IP forwarding), then break the security layer protecting it (SSL strip, forge certificate, decode unencrypted protocol). Understanding each link in the chain reveals where defenses can break the chain.
      </StoryBox>
      <TcpIpAttackSurface />
      <MitmAttackChain />
      <H2>MITM on Public Wi-Fi</H2>
      <Para>
        Public Wi-Fi MITM is simpler: the attacker creates an access point with the same SSID as a popular network ("Starbucks_WiFi"). Devices that auto-connect to known SSIDs will connect to the rogue AP. The attacker's AP provides internet access (routing through legitimate network or LTE) while intercepting all traffic. Defense: always verify the AP's BSSID (MAC address) matches the expected AP. Use a VPN on all public Wi-Fi.
      </Para>
      <H2>TLS and Certificate Pinning</H2>
      <Para>
        TLS prevents MITM by requiring the server to present a certificate signed by a trusted CA. An MITM attacker cannot forge a legitimate certificate unless they have compromised a CA. Certificate pinning goes further: the application hardcodes specific certificate fingerprints or public keys, rejecting any certificate not matching the pin — even valid CA-issued ones.
      </Para>
      <Para>
        Certificate pinning is used by mobile banking apps, corporate MDM systems, and high-security APIs. It defeats even corporate TLS inspection proxies (which present a CA-signed cert). The tradeoff: pinned certificates must be rotated with app updates.
      </Para>

      <Divider />
      {/* ── Chapter 6 ─────────────────────────────────────────── */}
      <Chapter n={6} title="DNS Attacks: Redirecting the Internet's Phone Book" />
      <StoryBox>
        2008. Security researcher Dan Kaminsky discovers a fundamental flaw in DNS: the 16-bit transaction ID field gives only 65,536 possible values. An attacker can flood a DNS resolver with forged responses for all 65,536 transaction IDs in under a second. If the forged response arrives before the legitimate one, the resolver caches the malicious record. Every lookup for the poisoned domain goes to the attacker's server — phishing, credential theft, and malware delivery at scale. Kaminsky coordinated a global patch with DNS vendors before disclosure. It was the largest coordinated vulnerability disclosure in internet history.
      </StoryBox>
      <H2>DNS Cache Poisoning (Kaminsky Attack)</H2>
      <Para>
        The Kaminsky attack works in three steps:
      </Para>
      <Para>
        1. Ask the target DNS resolver to resolve a random subdomain of the target domain (e.g., xyz123.bank.com). The resolver has no cached answer.
      </Para>
      <Para>
        2. Immediately flood the resolver with forged responses purporting to be from bank.com's authoritative name server. Each forged response tries a different transaction ID and source port. Because transaction IDs are only 16-bit and source ports were not randomized, 65,536 attempts suffices.
      </Para>
      <Para>
        3. One forged response matches the transaction ID. The resolver caches the attacker's glue record as the NS server for bank.com. All future lookups for bank.com resolve to the attacker's IP.
      </Para>
      <H2>DNS Hijacking</H2>
      <Para>
        DNS hijacking modifies DNS resolution at a different layer:
      </Para>
      <Para>
        — <Accent>Rogue DHCP server</Accent>: attacker's DHCP server assigns their DNS server IP to clients.
      </Para>
      <Para>
        — <Accent>Router compromise</Accent>: attacker modifies router's DNS settings to redirect DNS queries to their server.
      </Para>
      <Para>
        — <Accent>ISP DNS hijacking</Accent>: some ISPs redirect NXDOMAIN responses to their search/advertising pages.
      </Para>
      <H2>DNSSEC and DoH/DoT</H2>
      <Para>
        <Accent>DNSSEC</Accent> adds digital signatures to DNS records. The chain of trust runs from the root zone through TLD to domain. A valid DNSSEC signature proves the record was created by the zone owner and hasn't been modified. DNSSEC prevents cache poisoning but not DNS traffic interception (the responses are still observable).
      </Para>
      <Para>
        <Accent>DNS over HTTPS (DoH)</Accent> and <Accent>DNS over TLS (DoT)</Accent> encrypt DNS traffic, preventing observation and on-path modification. DoH additionally hides DNS queries from ISPs (queries go to port 443 mixed with HTTPS traffic). Cloudflare (1.1.1.1), Google (8.8.8.8), and NextDNS offer DoH/DoT resolvers.
      </Para>

      <Divider />
      {/* ── Chapter 7 ─────────────────────────────────────────── */}
      <Chapter n={7} title="Denial of Service: Volumetric, Protocol, and Application" />
      <StoryBox>
        October 2016. Mirai botnet — a network of compromised IoT devices (cameras, DVRs, routers with default credentials) — launches a 1.2 Tbps DDoS attack against Dyn DNS, a major DNS provider. Large portions of the US internet go dark: Twitter, Reddit, GitHub, Netflix, Spotify. The entire attack infrastructure was IoT devices, each sending simple UDP floods. One botnet. 1.2 terabits per second. Critical infrastructure disrupted.
      </StoryBox>
      <H2>Volumetric Attacks</H2>
      <Para>
        Volumetric attacks flood the target's network link with traffic, saturating bandwidth. The traffic doesn't need to be clever — it just needs to be more than the link can handle.
      </Para>
      <Para>
        <Accent>UDP Floods</Accent>: send large volumes of UDP packets to random ports. Target sends ICMP Port Unreachable for each. The target's CPU and uplink are overwhelmed.
      </Para>
      <Para>
        <Accent>Amplification Attacks</Accent>: exploit protocols that return large responses to small requests. The attacker spoofs the victim's IP as source. DNS (amplification factor: 50-100x), NTP monlist (100x), SSDP (30x), Memcached (50,000x). Attacker sends 1 Mbps, victim receives 100+ Mbps.
      </Para>
      <H2>Protocol Attacks</H2>
      <Para>
        Protocol attacks exploit weaknesses in protocol state machines:
      </Para>
      <Para>
        <Accent>SYN Flood</Accent>: exhausts server connection table with half-open TCP connections. Defense: SYN cookies (no state allocated until handshake completes).
      </Para>
      <Para>
        <Accent>BGP Flapping</Accent>: repeatedly withdrawing and announcing routes to cause route instability in BGP.
      </Para>
      <Para>
        <Accent>SSL/TLS Exhaustion</Accent>: initiating many TLS handshakes without completing them; asymmetric CPU cost (server does more work than client per handshake).
      </Para>
      <H2>Application Layer (L7) Attacks</H2>
      <Para>
        Layer 7 attacks look like legitimate traffic but overwhelm application resources:
      </Para>
      <Para>
        <Accent>HTTP Flood</Accent>: thousands of clients making valid HTTP GET/POST requests. Indistinguishable from legitimate traffic without rate limiting and behavioral analysis.
      </Para>
      <Para>
        <Accent>Slowloris</Accent>: open many HTTP connections, send partial headers very slowly. Server holds connections open. Most servers have a connection limit — Slowloris fills it with near-zero bandwidth.
      </Para>
      <Para>
        <Accent>XML/JSON Bombs</Accent>: send deeply nested XML ("billion laughs attack") or JSON that expands exponentially during parsing.
      </Para>
      <H2>DDoS Mitigation</H2>
      <Para>
        <Accent>Anycast scrubbing</Accent>: Cloudflare, Akamai, AWS Shield absorb attack traffic across their global networks before it reaches the customer.
      </Para>
      <Para>
        <Accent>Rate limiting</Accent>: limit requests per IP per time window at the network or CDN edge.
      </Para>
      <Para>
        <Accent>BGP blackholing</Accent>: route the victim IP to null — traffic is dropped at the ISP. The victim goes offline, but the upstream network is protected.
      </Para>
      <Para>
        <Accent>BCP 38</Accent>: ISPs that filter spoofed source IPs prevent amplification attacks from their customers.
      </Para>

      <Divider />
      {/* ── Chapter 8 ─────────────────────────────────────────── */}
      <Chapter n={8} title="TCP-Level Attacks: Session Hijacking and Blind Injection" />
      <StoryBox>
        TCP's sequence number mechanism was designed to reorder out-of-order packets, not as a security mechanism. In early TCP implementations, sequence numbers were predictable — they started at 0 or incremented by 64000 each second. An attacker who could predict the next sequence number could inject packets into an established TCP session without being on the network path. This class of attacks drove the randomization of TCP initial sequence numbers (ISNs) in the late 1990s.
      </StoryBox>
      <H2>TCP Session Hijacking</H2>
      <Para>
        In session hijacking, an on-path attacker (after ARP spoofing) observes a TCP session and injects packets with the correct sequence numbers. The attacker can inject commands, steal session cookies, or terminate connections. Modern TLS prevents content injection, but the TCP connection itself can still be terminated by injecting a RST with the right sequence number (RST injection).
      </Para>
      <H2>TCP Reset Injection</H2>
      <Para>
        TCP RST (Reset) packets terminate a connection immediately. An attacker who can observe a TCP session (even briefly) can inject a RST with the correct sequence number, abruptly terminating it. The Great Firewall of China uses TCP RST injection to terminate connections to blocked content: rather than silently dropping packets, it sends RSTs to both endpoints, causing connections to fail immediately.
      </Para>
      <H2>SYN Cookies: Defeating SYN Floods</H2>
      <Para>
        SYN cookies encode session state in the TCP Initial Sequence Number (ISN) rather than in server memory. The server hashes the 5-tuple + timestamp + secret key to generate the ISN. No connection state is stored until the SYN-ACK is acknowledged. If the ACK arrives with the right ISN, the server recreates the connection state. No backlog = no resource exhaustion.
      </Para>
      <CodeBlock>{`# Linux SYN cookies
sysctl net.ipv4.tcp_syncookies=1     # Enable SYN cookies
sysctl net.ipv4.tcp_max_syn_backlog  # SYN backlog size
sysctl net.ipv4.tcp_synack_retries   # Reduce retries under flood

# Verify SYN cookie usage:
netstat -s | grep "SYNCookies"`}</CodeBlock>

      <Divider />
      {/* ── Chapter 9 ─────────────────────────────────────────── */}
      <Chapter n={9} title="Wireless Network Attacks" />
      <StoryBox>
        WEP (Wired Equivalent Privacy) was the original Wi-Fi encryption standard, mandatory in 802.11b. By 2001, researchers had broken it completely — an attacker could recover the WEP key from a captured traffic in minutes using passive monitoring. WEP was cryptographically flawed by design: the IV (initialization vector) was only 24 bits and was reused, allowing statistical recovery of the key. WPA (2003) and WPA2 (2004) replaced WEP. In 2022, WPA3 was mandated for new Wi-Fi devices.
      </StoryBox>
      <H2>Evil Twin Attack</H2>
      <Para>
        An attacker creates a Wi-Fi network with the same SSID (network name) and higher signal strength than the legitimate AP. Devices configured to auto-connect to known SSIDs will associate with the stronger signal. The attacker provides internet connectivity (routing via LTE or the legitimate network), so victims don't notice. All plaintext traffic is captured; HTTPS is attempted to be stripped.
      </Para>
      <H2>PMKID Attack (WPA2/WPA3)</H2>
      <Para>
        The PMKID (Pairwise Master Key Identifier) is a hash derived from the PMK and BSSID, transmitted in the first EAPOL frame of the WPA2 4-way handshake. The attacker captures a single PMKID packet — without waiting for a client to authenticate. The PMKID can then be attacked offline: crack the WPA2 password with a dictionary attack. Tools: hcxdumptool + hashcat.
      </Para>
      <H2>WPA3 Dragonfly and Side-Channel Attacks</H2>
      <Para>
        WPA3 uses the Dragonfly key exchange (SAE - Simultaneous Authentication of Equals), which is resistant to offline dictionary attacks — the password is never transmitted. However, in 2019 researchers found timing side-channels and cache-based side-channels in some Dragonfly implementations (CVE-2019-9494, "Dragonblood"). These have been patched, but demonstrate that even modern protocols have implementation risks.
      </Para>

      <Divider />
      {/* ── Chapter 10 ─────────────────────────────────────────── */}
      <Chapter n={10} title="Lateral Movement and Internal Network Attacks" />
      <StoryBox>
        2017. NotPetya spreads across Maersk, the world's largest shipping company, in 7 minutes. It needed only one initially compromised host with an unpatched SMB vulnerability (EternalBlue) plus credential extraction (Mimikatz pass-the-hash). No internet exposure was required — every Windows machine on the internal network was reachable via SMB. The result: 45,000 PCs and 4,000 servers wiped. 10 days of manual intervention to restore operations. $300 million in losses.
      </StoryBox>
      <H2>Pass-the-Hash</H2>
      <Para>
        Windows NTLM authentication accepts a password hash (NTLM hash) directly — you don't need to crack the password, just capture and replay the hash. After extracting hashes from lsass.exe (local security authority) using Mimikatz, the attacker can authenticate to any system accepting NTLM with that user's hash, without ever knowing the plaintext password.
      </Para>
      <CodeBlock>{`# Pass-the-hash with impacket (authorized red team only)
python psexec.py -hashes :NTLM_HASH_HERE Administrator@192.168.1.50
# Authenticates as Administrator without knowing the password

# Defense:
# 1. Credential Guard (Windows 10+): protects lsass in a hypervisor-isolated container
# 2. Disable NTLM: force Kerberos everywhere (requires domain)
# 3. Local admin passwords unique per machine (LAPS)
# 4. Privileged Access Workstations (PAW) for admin tasks`}</CodeBlock>
      <H2>EternalBlue and SMB Exploitation</H2>
      <Para>
        EternalBlue (CVE-2017-0144) is an NSA exploit for a buffer overflow in Windows SMBv1. It allows remote code execution without authentication on Windows XP through Server 2008 R2 (unpatched). WannaCry and NotPetya both used EternalBlue to spread laterally. The patch (MS17-010) was available for 2 months before WannaCry; millions of machines were unpatched.
      </Para>
      <H2>Network Segmentation as Defense</H2>
      <Para>
        If every machine can reach every other machine on port 445 (SMB), one compromised host leads to total network compromise. Network segmentation with firewall rules between segments limits lateral movement: servers can't reach client machines, production can't reach development, external DMZ can't reach internal.
      </Para>

      <Divider />
      {/* ── Chapter 11 ─────────────────────────────────────────── */}
      <Chapter n={11} title="Defense in Depth: Building Layered Defenses" />
      <StoryBox>
        A medieval castle didn't rely on a single wall. It had a moat, an outer wall, a courtyard, an inner wall, and a keep. An attacker who breached the outer wall still faced three more defensive layers. Modern network security takes the same approach: no single control is sufficient, but multiple overlapping controls make compromise extremely difficult.
      </StoryBox>
      <H2>The Defense Layers</H2>
      <Para>
        <Accent>Perimeter</Accent>: firewall, IPS, DDoS mitigation. Reduces attack surface exposed to the internet.
      </Para>
      <Para>
        <Accent>Network</Accent>: VLAN segmentation, ACLs, DHCP snooping, DAI, port security. Limits blast radius within the network.
      </Para>
      <Para>
        <Accent>Host</Accent>: OS hardening, endpoint protection, host-based firewall, patch management. Reduces vulnerability to exploitation.
      </Para>
      <Para>
        <Accent>Application</Accent>: TLS, input validation, WAF, authentication. Protects the service itself.
      </Para>
      <Para>
        <Accent>Data</Accent>: encryption at rest, DLP, access controls. Protects data even if other layers fail.
      </Para>
      <Para>
        <Accent>Detection</Accent>: SIEM, IDS/IPS, NDR, honeypots. Identifies breaches that bypass preventive controls.
      </Para>
      <Para>
        <Accent>Response</Accent>: incident response plan, forensics capability, backup/recovery. Limits damage when breaches occur.
      </Para>
      <H2>Zero Trust Architecture</H2>
      <Para>
        Zero Trust assumes breach: no device or user is trusted by default, even on the internal network. Every access request is authenticated, authorized, and continuously verified. Network location (inside vs. outside firewall) is not a trust indicator. This model eliminates the "trusted insider" assumption that makes lateral movement so easy.
      </Para>

      <Divider />
      {/* ── Chapter 12 ─────────────────────────────────────────── */}
      <Chapter n={12} title="Intrusion Detection: Recognizing Attacks in Progress" />
      <StoryBox>
        Prevention is imperfect. Adversaries adapt. The security principle of "assume breach" drives the investment in detection: not "will they get in?" but "when they get in, how quickly will we know?" The mean time to detect a breach in 2023 was 204 days (IBM Cost of a Data Breach Report). That is 204 days of attacker-controlled access before anyone noticed.
      </StoryBox>
      <H2>Network-Based Detection</H2>
      <Para>
        <Accent>IDS/IPS</Accent>: Intrusion Detection/Prevention Systems analyze traffic for attack signatures and anomalies. Signature-based detection catches known attacks; anomaly-based detection flags deviations from normal behavior. Suricata and Snort are leading open-source IDS engines.
      </Para>
      <Para>
        <Accent>NDR</Accent> (Network Detection and Response): uses machine learning on flow data to detect C2 communication patterns, lateral movement, data exfiltration, and unusual protocol usage. Products: Darktrace, ExtraHop, Vectra.
      </Para>
      <Para>
        <Accent>Honeypots</Accent>: decoy systems with no legitimate traffic. Any connection to a honeypot is by definition suspicious. Honeytokens (fake credentials, fake API keys) in monitoring can detect credential theft even before the attacker uses them.
      </Para>
      <H2>SIEM and Log Correlation</H2>
      <Para>
        Security Information and Event Management (SIEM) aggregates logs from all systems — firewalls, IDS, endpoints, servers, applications — and correlates events across them. A single failed login is noise; 1,000 failed logins across 50 accounts in 10 minutes is a brute-force attack. SIEM detects patterns that individual devices cannot see.
      </Para>

      <Divider />
      {/* ── Chapter 13 ─────────────────────────────────────────── */}
      <Chapter n={13} title="Misconceptions About Network Attacks" />
      <Err>
        "Encryption prevents MITM attacks." — Encryption prevents eavesdropping, not MITM. SSL stripping downgrades HTTPS to HTTP before encryption is established. A forged certificate (from a compromised or rogue CA) allows TLS inspection. Encryption protects content only if the client properly verifies the server's certificate against a trusted CA and refuses to connect on failure — many applications accept invalid certificates in development mode or ignore certificate errors.
      </Err>
      <Err>
        "Firewalls prevent all network attacks." — Firewalls filter traffic based on IP, port, and sometimes protocol. They do not understand the content of allowed protocols. An attacker using port 443 (allowed HTTPS) for command-and-control is invisible to a basic firewall. SQL injection, XSS, and protocol-level attacks all pass through firewalls that permit the relevant ports. Firewalls are one layer; not the only layer.
      </Err>
      <Err>
        "Attackers need to be on the local network for ARP spoofing." — ARP is a Layer 2 protocol limited to a broadcast domain — true. But an attacker inside the same VLAN (on the same switch) is sufficient. After a single client machine is compromised via phishing, the attacker has LAN access from that machine. Network segmentation limits which VLANs attackers can reach, but does not prevent ARP attacks within a VLAN.
      </Err>
      <Err>
        "DDoS attacks are impossible to mitigate." — DDoS attacks are manageable with the right infrastructure. Anycast scrubbing networks (Cloudflare, Akamai) absorb even terabit-scale attacks across globally distributed PoPs. The architecture secret: distribute the absorption across enough surface area that no single point gets overwhelmed. 1 Tbps absorbed across 250 datacenters = 4 Gbps per datacenter.
      </Err>
      <Err>
        "BGP hijacking only affects internet routing, not internal networks." — BGP is the internet's routing protocol, so BGP hijacking affects internet-connected traffic. But internal networks also use routing protocols (OSPF, EIGRP, IS-IS) that have similar trust issues without authentication. OSPF without MD5 authentication allows any host on the segment to inject false routes into the network's routing table.
      </Err>

      <Divider />
      {/* ── Chapter 14 ─────────────────────────────────────────── */}
      <Chapter n={14} title="IQ Depth Check: Attack and Defense Mastery" />
      <IQ level="Beginner">
        <strong>What is a Man-in-the-Middle attack and what enables it on a local network?</strong><br />
        A Man-in-the-Middle (MITM) attack is when an attacker intercepts communications between two parties without either knowing. On a local network, it is typically enabled by ARP spoofing — sending fake ARP replies that cause victim devices to send their traffic to the attacker's MAC address instead of the legitimate gateway. The attacker forwards the traffic to the real gateway, making the connection appear normal while all traffic passes through them.
      </IQ>
      <IQ level="Intermediate">
        <strong>Explain SYN cookies and why they defeat SYN flood attacks.</strong><br />
        A SYN flood exhausts a server's half-open connection table by sending millions of SYN packets from spoofed IPs that never complete the handshake. SYN cookies eliminate the need for per-connection state until the handshake completes. The server encodes session information (client IP, port, server port, timestamp) into the Initial Sequence Number (ISN) of the SYN-ACK using a cryptographic hash. If the client completes the handshake (sending ACK with ISN+1), the server decodes the cookie and recreates the connection state. Spoofed IPs never respond, so no state is ever created — the SYN flood consumes only CPU cycles to verify cookies, not memory for connection state.
      </IQ>
      <IQ level="Senior">
        <strong>How does RPKI prevent BGP route hijacking, and what are its limitations?</strong><br />
        RPKI (Resource Public Key Infrastructure) allows IP address holders to create Route Origin Authorizations (ROAs) — cryptographic attestations that "AS N is authorized to originate prefix P/len with maximum prefix length L." These ROAs are signed with the IP block holder's key, validated by the RIR CA chain (IANA → Regional Internet Registries → resource holders). Routers with RPKI validation mark routes as Valid, Invalid (announced by an AS not in the ROA), or NotFound. Networks that deploy RPKI Origin Validation (ROV) reject or deprioritize Invalid routes. Limitations: (1) only validates origin AS, not the full AS path — AS path prepending attacks are not prevented; (2) only ~60-70% of internet routes have ROAs as of 2024; (3) BGPsec (full path validation) is not widely deployed due to performance overhead; (4) an attacker who can access a legitimate AS with valid ROAs can still misuse those announcements.
      </IQ>
      <IQ level="PhD">
        <strong>Describe the Kaminsky DNS cache poisoning attack mechanism and explain why source port randomization (the main patch) reduces but does not eliminate the attack surface.</strong><br />
        The Kaminsky attack exploits the fact that DNS transaction IDs are only 16 bits (65,536 values). The attacker queries the target resolver for a random subdomain (forcing a fresh lookup). Simultaneously, they flood the resolver with forged authoritative responses for all 65,536 transaction IDs, all claiming a malicious NS record for the target domain. Before the real authoritative server responds (typically 50-100ms), the attacker has a high probability of matching the transaction ID. The fix (RFC 5452) adds source port randomization: instead of sending all DNS queries from a fixed port (53), the resolver uses a random ephemeral port. This adds ~16 bits of additional entropy (65,536 possible ports × 65,536 TXIDs = ~4 billion combinations), making brute-force much harder. However, it does not eliminate the attack because: (1) NAT devices often remap source ports, eliminating port entropy; (2) some firewalls and middleboxes restrict outgoing UDP source ports; (3) the Fragmentation-based DNS poisoning (FRAG16, 2020 CVE) exploits IP fragmentation to bypass port randomization by triggering fragmented DNS responses; (4) DNS-over-UDP fundamentally lacks authentication — DNSSEC's cryptographic signatures are the only complete solution, as they make forged responses detectable regardless of transaction ID entropy.
      </IQ>

      <Divider />
      <KeyTakeaways items={[
        'Network protocols were designed with trust assumptions that fail in adversarial environments: ARP has no auth, BGP has no origin verification, IP source addresses are unverifiable by default.',
        'ARP spoofing poisons the ARP cache to redirect LAN traffic; defended by Dynamic ARP Inspection (DAI) + DHCP snooping binding table.',
        'MAC flooding fills the CAM table to make a switch act like a hub; defended by port security (max MAC per port).',
        'SYN flood exhausts the TCP backlog with half-open connections; defeated by SYN cookies (no state until handshake completes).',
        'The Kaminsky attack exploits 16-bit DNS transaction ID entropy; partial mitigation: source port randomization; complete mitigation: DNSSEC.',
        'BGP route hijacking redirects internet traffic via more-specific prefix announcements; RPKI Route Origin Validation rejects unauthorized prefix origins.',
        'MITM chain: network position (ARP/rogue AP) → IP forwarding → intercept → SSL strip or forge cert. Broken by HSTS, certificate pinning, DAI.',
        'DDoS mitigation: BCP38 (prevent spoofing), SYN cookies, rate limiting, anycast scrubbing (Cloudflare/Akamai), BGP blackholing.',
        'Lateral movement (pass-the-hash, EternalBlue): defeated by network segmentation, unique local admin passwords (LAPS), Credential Guard, disabling NTLM.',
        'Defense in depth: perimeter → network → host → application → data → detection → response; no single layer is sufficient.',
      ]} />
    </LearnLayout>
  )
}
