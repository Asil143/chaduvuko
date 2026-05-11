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

const natEntries = [
  { private: '192.168.1.10:51234', public: '203.0.113.1:50001', dst: '142.250.80.46:443', proto: 'TCP' },
  { private: '192.168.1.11:44302', public: '203.0.113.1:50002', dst: '142.250.80.46:443', proto: 'TCP' },
  { private: '192.168.1.12:62100', public: '203.0.113.1:50003', dst: '8.8.8.8:53', proto: 'UDP' },
  { private: '192.168.1.10:51300', public: '203.0.113.1:50004', dst: '151.101.1.140:80', proto: 'TCP' },
]

function NATSim() {
  const [selected, setSelected] = useState<number | null>(null)
  const entry = selected !== null ? natEntries[selected] : null

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: N, fontFamily: 'var(--font-mono)', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '.1em' }}>NAT Translation Table</p>
      <p style={{ fontSize: 13, color: 'var(--muted)', margin: '0 0 16px' }}>Public IP: 203.0.113.1 — NAT router translates all private → public. Click a row to trace the packet flow.</p>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Private (inside)', 'NAT (outside)', 'Destination', 'Proto'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--muted)', fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', borderBottom: '1px solid var(--border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {natEntries.map((e, i) => (
              <tr key={i} onClick={() => setSelected(selected === i ? null : i)} style={{ background: selected === i ? `${N}08` : 'transparent', cursor: 'pointer', borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '10px 12px', fontFamily: 'var(--font-mono)', fontSize: 12, color: '#3b82f6' }}>{e.private}</td>
                <td style={{ padding: '10px 12px', fontFamily: 'var(--font-mono)', fontSize: 12, color: N }}>{e.public}</td>
                <td style={{ padding: '10px 12px', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)' }}>{e.dst}</td>
                <td style={{ padding: '10px 12px', fontSize: 12, color: 'var(--text)' }}>{e.proto}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {entry && (
        <div style={{ marginTop: 16, background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 8, padding: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: N, marginBottom: 10 }}>Packet Flow Trace</div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', fontSize: 12, fontFamily: 'var(--font-mono)' }}>
            <span style={{ background: '#3b82f620', border: '1px solid #3b82f640', padding: '4px 8px', borderRadius: 4, color: '#3b82f6' }}>{entry.private}</span>
            <span style={{ color: 'var(--muted)' }}>→ NAT router rewrites src →</span>
            <span style={{ background: `${N}15`, border: `1px solid ${N}30`, padding: '4px 8px', borderRadius: 4, color: N }}>{entry.public}</span>
            <span style={{ color: 'var(--muted)' }}>→ internet →</span>
            <span style={{ background: '#8b5cf620', border: '1px solid #8b5cf640', padding: '4px 8px', borderRadius: 4, color: '#8b5cf6' }}>{entry.dst}</span>
          </div>
          <div style={{ marginTop: 10, fontSize: 12, color: 'var(--muted)' }}>
            Return path: {entry.dst} → {entry.public} → NAT router looks up {entry.public} → rewrites dst to {entry.private} and delivers to internal host.
          </div>
        </div>
      )}
    </div>
  )
}

function DHCPSim() {
  const [step, setStep] = useState(0)

  const steps = [
    { from: 'Client', to: 'Broadcast', msg: 'DHCPDISCOVER', detail: 'Client sends broadcast to 255.255.255.255, src IP=0.0.0.0. "I need an IP address!"' },
    { from: 'DHCP Server', to: 'Client MAC', msg: 'DHCPOFFER', detail: 'Server offers: IP=192.168.1.50, mask=/24, gateway=192.168.1.1, DNS=8.8.8.8, lease=86400s.' },
    { from: 'Client', to: 'Broadcast', msg: 'DHCPREQUEST', detail: 'Client broadcasts "I accept the offer from server 192.168.1.253." Broadcast tells other servers not to reserve their offered addresses.' },
    { from: 'DHCP Server', to: 'Client', msg: 'DHCPACK', detail: 'Server confirms: 192.168.1.50 is yours for 86400 seconds. Client configures its interface and begins using the IP.' },
  ]

  const colors = [N, '#3b82f6', N, '#3b82f6']

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: N, fontFamily: 'var(--font-mono)', margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '.1em' }}>DHCP DORA Handshake</p>

      <div style={{ marginBottom: 16 }}>
        {steps.map((s, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 10, opacity: i <= step ? 1 : 0.3, transition: 'opacity .3s' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: i <= step ? `${colors[i]}20` : 'var(--bg)', border: `2px solid ${i <= step ? colors[i] : 'var(--border)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: colors[i], flexShrink: 0 }}>{i + 1}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: colors[i], fontWeight: 700 }}>{s.msg}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>{s.from} → {s.to}</div>
              {i === step && <div style={{ fontSize: 12, color: 'var(--text)', marginTop: 4, background: `${colors[i]}08`, border: `1px solid ${colors[i]}20`, borderRadius: 6, padding: '6px 10px' }}>{s.detail}</div>}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0} style={{ background: 'transparent', color: 'var(--muted)', border: '1px solid var(--border)', borderRadius: 6, padding: '7px 16px', fontSize: 13, cursor: step === 0 ? 'default' : 'pointer', opacity: step === 0 ? 0.4 : 1 }}>← Back</button>
        <button onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))} disabled={step === steps.length - 1} style={{ background: N, color: '#000', border: 'none', borderRadius: 6, padding: '7px 16px', fontSize: 13, fontWeight: 700, cursor: step === steps.length - 1 ? 'default' : 'pointer', opacity: step === steps.length - 1 ? 0.5 : 1 }}>Next →</button>
        <button onClick={() => setStep(0)} style={{ background: 'transparent', color: 'var(--muted)', border: '1px solid var(--border)', borderRadius: 6, padding: '7px 16px', fontSize: 13, cursor: 'pointer' }}>Reset</button>
      </div>
    </div>
  )
}

export default function NATAndDHCPModule() {
  return (
    <LearnLayout
      title="NAT and DHCP"
      description="NAT stretches IPv4 by hiding many private addresses behind one public IP. DHCP automates address assignment. Together, they power nearly every network you interact with daily."
      section="Networking Fundamentals"
      readTime="20 min"
      updatedAt="May 2026"
    >
      <Part n="01" title="NAT: Making 4 Billion Addresses Last Decades" />
      <P>
        IPv4 has roughly 4.3 billion addresses. With 8 billion people and tens of billions of internet-connected devices, this should have been catastrophic. The reason the internet has kept working is <Hl>NAT — Network Address Translation</Hl>, defined in RFC 3022, which allows many devices with private (non-routable) IP addresses to share a single public IP address.
      </P>
      <P>
        The private address ranges — 10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16 (RFC 1918) — are not routable on the public internet. Every home router, every corporate network, and every cloud VPC uses these ranges internally. When a private-address host initiates a connection to the internet, a NAT device at the network boundary rewrites the packet's source address (and typically source port) to a public IP.
      </P>

      <H>How NAT Works: Port Address Translation (PAT)</H>
      <P>
        The most common NAT variant is <Hl>PAT (Port Address Translation)</Hl>, also called NAPT or overloading — this is what your home router does. When 192.168.1.10:51234 sends a packet to 8.8.8.8:53, the NAT router rewrites the source to 203.0.113.1:50001 and records this mapping in the NAT translation table. The return packet arrives at 203.0.113.1:50001, the router looks up the mapping, rewrites the destination to 192.168.1.10:51234, and delivers it. Multiple internal hosts can share one public IP because the source port distinguishes their sessions.
      </P>
      <P>
        A single public IP can theoretically support ~65,535 concurrent NAT sessions (one per port), though practical limits are lower due to port range restrictions and memory. In practice, a home router supports hundreds of concurrent sessions comfortably; enterprise NAT devices support millions.
      </P>

      <NATSim />

      <H>Static NAT and Port Forwarding</H>
      <P>
        <Hl>Static NAT</Hl> maps one private IP to one public IP permanently — used for servers that need to be reachable from the internet. <Hl>Port forwarding</Hl> is a specific static NAT mapping: incoming traffic on public_IP:port X is forwarded to private_IP:port Y. Used for hosting game servers, web servers, or SSH access behind a NAT device.
      </P>

      <Err title="Expecting NAT to provide security">
        NAT provides obscurity — external hosts can't initiate connections to private addresses directly. But this is not a security boundary. Any malware on an internal host can initiate outbound connections freely. A firewall with stateful inspection is the actual security control. NAT's security benefit is incidental, not designed.
      </Err>

      <HR />
      <Part n="02" title="DHCP: Automatic Address Assignment" />

      <P>
        Before DHCP, network administrators had to manually configure every device's IP address, subnet mask, gateway, and DNS server. With hundreds or thousands of devices, this was unsustainable. <Hl>DHCP (Dynamic Host Configuration Protocol)</Hl>, defined in RFC 2131 (1997), automates this using a four-message exchange called DORA: Discover, Offer, Request, Acknowledge.
      </P>

      <DHCPSim />

      <H>The DORA Exchange</H>
      <P>
        <Hl>DHCPDISCOVER</Hl>: A new client with no IP address broadcasts to 255.255.255.255 with source IP 0.0.0.0. The broadcast reaches all DHCP servers on the segment. <Hl>DHCPOFFER</Hl>: Each DHCP server that receives the Discover responds with an offer: an available IP address, lease duration, subnet mask, default gateway, and DNS servers. The server temporarily reserves the offered address. <Hl>DHCPREQUEST</Hl>: The client broadcasts which offer it accepts (including the server identifier in the message). Other servers release their reserved addresses. <Hl>DHCPACK</Hl>: The chosen server confirms the binding. The client configures its interface.
      </P>

      <H>DHCP Leases and Renewal</H>
      <P>
        DHCP assigns addresses with a <Hl>lease time</Hl> — typically 24 hours to 8 days for enterprise networks. At 50% of lease time elapsed, the client sends a DHCPREQUEST directly to the server to renew. At 87.5% elapsed, if no renewal response has been received, the client broadcasts DHCPREQUEST to find any available server. At 100% elapsed, the client releases the address and starts DORA again.
      </P>
      <P>
        Short leases (1 hour) work for high-density WiFi environments where devices constantly join/leave. Long leases (7 days) work for stable workstations where you want consistent address assignment. The trade-off: short leases consume more DHCP server resources and traffic; long leases delay address pool recovery after devices leave.
      </P>

      <H>DHCP Relay and DHCP Snooping</H>
      <P>
        DHCP broadcasts don't cross router boundaries. In multi-subnet networks, a <Hl>DHCP relay agent</Hl> (typically the SVI or router interface on each subnet) forwards DHCP broadcasts to the DHCP server as unicast packets, including the relay's IP address so the server knows which subnet to assign from. Most DHCP servers support multiple address pools selected by the relay agent's IP.
      </P>
      <P>
        <Hl>DHCP Snooping</Hl> is a switch security feature that intercepts DHCP messages and only allows responses from trusted ports (ports connected to DHCP servers). This blocks rogue DHCP servers — a common attack where a malicious host sends DHCPOFFER responses with itself as the gateway, performing a MITM attack. DHCP Snooping also builds the binding table used by DAI (Dynamic ARP Inspection).
      </P>

      <ProTip>
        On Linux/Mac, <code style={{ fontSize: 12, background: `${N}15`, color: N, padding: '2px 5px', borderRadius: 4 }}>dhclient -r eth0</code> releases the current lease, and <code style={{ fontSize: 12, background: `${N}15`, color: N, padding: '2px 5px', borderRadius: 4 }}>dhclient eth0</code> re-requests. On Windows: <code style={{ fontSize: 12, background: `${N}15`, color: N, padding: '2px 5px', borderRadius: 4 }}>ipconfig /release && ipconfig /renew</code>. The DHCP server logs are invaluable for IP conflict investigations — every assignment and release is recorded with MAC address, hostname, and timestamp.
      </ProTip>

      <HR />
      <Part n="03" title="A Day in the Life: DHCP Exhaustion" />

      <TimeBlock time="8:30 AM" label="Help desk tickets start flooding in: 'can't connect to network'">
        Dozens of users report their laptops show "Limited Connectivity" or 169.254.x.x (APIPA) addresses — DHCP failed and the OS self-assigned a link-local address. Affects one building floor only.
      </TimeBlock>
      <TimeBlock time="8:45 AM" label="Check DHCP server — pool exhausted">
        Connect to the DHCP server. Pool for 192.168.10.0/24 shows 250/254 leases active — only 4 addresses free. Lease duration is 8 days. The pool ran dry when the floor added 30 contractors this week. Current active leases include hundreds of stale entries from laptops that were taken home but their leases haven't expired.
      </TimeBlock>
      <TimeBlock time="8:55 AM" label="Emergency: reduce lease time and purge stale leases">
        Change lease time from 8 days to 4 hours — stale leases will expire faster. Manually identify and delete leases for devices not seen in 48+ hours (check last-seen timestamps). Free up ~60 addresses. Users start getting IPs within minutes as the DHCP server assigns from the newly freed pool.
      </TimeBlock>
      <TimeBlock time="10:00 AM" label="Long-term fix">
        Resize the DHCP pool by adding a secondary address range to the VLAN (192.168.11.0/24). Implement DHCP failover between two servers for redundancy. Tune lease time to 12 hours for mobile-heavy subnets. Set pool utilization alerts at 80% so we get warned before exhaustion.
      </TimeBlock>

      <HR />
      <Part n="04" title="Interview Questions" />

      <IQ q="Explain PAT (Port Address Translation) and how multiple hosts share one public IP.">
        PAT (also called NAPT or NAT overloading) maps multiple private IP:port combinations to a single public IP with different source ports. When 192.168.1.10:51234 sends to 8.8.8.8:53, the NAT router rewrites src to 203.0.113.1:50001 and stores the mapping. When 192.168.1.11:44302 also sends to 8.8.8.8:53, it maps to 203.0.113.1:50002. Return packets hit 203.0.113.1 and the router looks up the destination port (50001 or 50002) to determine which internal host to deliver to. The source port acts as the session identifier distinguishing multiple hosts behind one public IP.
      </IQ>

      <IQ q="Walk through the DHCP DORA exchange.">
        Discover: The client with no IP address broadcasts a DHCPDISCOVER to 255.255.255.255 (src=0.0.0.0). Offer: DHCP servers respond with DHCPOFFER unicast (or broadcast to 255.255.255.255) containing an available IP, lease time, gateway, and DNS. Request: The client broadcasts DHCPREQUEST naming the chosen server — this informs all servers which offer was accepted so others release their reserved addresses. Acknowledge: The chosen server sends DHCPACK confirming the binding. The client configures its interface, starts an ARP probe for IP conflict detection (optional), and begins using the address.
      </IQ>

      <IQ q="What is a rogue DHCP server attack and how does DHCP Snooping prevent it?">
        A rogue DHCP server attack: an attacker runs a DHCP server on an internal network and responds to DHCPDISCOVER messages with DHCPOFFER packets that specify the attacker's host as the default gateway (and sometimes DNS). Clients accept the offer (first-come first-served) and route all traffic through the attacker, enabling a MitM attack without any ARP poisoning. DHCP Snooping mitigates this by configuring switch ports connected to DHCP servers as trusted and all other ports as untrusted. The switch intercepts DHCP messages on untrusted ports and drops any DHCPOFFER or DHCPACK packets — only the trusted server can send responses. Clients can still send DHCPDISCOVER (broadcast) and receive responses only from the legitimate server.
      </IQ>

      <HR />
      <Part n="05" title="Key Terminology" />
      <Term t="NAT">Network Address Translation — rewrites packet headers to map private IPs to public IPs at network boundaries.</Term>
      <Term t="PAT / NAPT">Port Address Translation — NAT overloading that maps many private IP:port to one public IP with different ports.</Term>
      <Term t="DORA">Discover → Offer → Request → Acknowledge — the four-message DHCP address assignment sequence.</Term>
      <Term t="Lease">A DHCP address assignment valid for a fixed duration. Must be renewed or released before expiry.</Term>
      <Term t="DHCP Relay">A router/SVI feature that forwards DHCP broadcasts across subnets as unicast to the DHCP server.</Term>
      <Term t="DHCP Snooping">Switch feature blocking DHCP responses from untrusted ports, preventing rogue DHCP server attacks.</Term>
      <Term t="APIPA">Automatic Private IP Addressing (169.254.x.x) — self-assigned when DHCP fails; indicates DHCP is unreachable.</Term>

      <KeyTakeaways items={[
        'PAT (NAT overloading) allows thousands of private hosts to share one public IP by using unique source ports as session identifiers.',
        'NAT is not a security boundary — it obscures internal hosts but provides no access control. A firewall is the actual security mechanism.',
        'DHCP DORA: Discover (broadcast) → Offer (server proposes IP) → Request (client accepts, broadcast) → Acknowledge (confirmed).',
        'Lease time balances address pool efficiency: short leases for mobile environments, longer leases for stable infrastructure.',
        'DHCP relay agents forward broadcasts across subnets so one DHCP server can serve multiple VLANs.',
        'DHCP Snooping blocks rogue DHCP servers by only allowing responses from designated trusted ports.',
      ]} />
    </LearnLayout>
  )
}
