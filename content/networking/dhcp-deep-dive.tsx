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
const Hl = ({ children }: { children: React.ReactNode }) => <strong style={{ color: N }}>{children}</strong>
const HR = () => <div style={{ borderTop: '1px solid var(--border)', margin: '48px 0' }} />
const ProTip = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: `${N}08`, border: `1px solid ${N}20`, borderRadius: 10, padding: '16px 20px', margin: '24px 0' }}>
    <p style={{ fontSize: 11, fontWeight: 700, color: N, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 8px' }}>Pro Tip</p>
    <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.85, margin: 0 }}>{children}</p>
  </div>
)
const IQ = ({ q, children }: { q: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: 40 }}>
    <div style={{ background: `${N}10`, border: `1px solid ${N}25`, borderRadius: '8px 8px 0 0', padding: '14px 18px', fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>Q: {q}</div>
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: 'none', borderRadius: '0 0 8px 8px', padding: '18px', fontSize: 14, color: 'var(--text)', lineHeight: 1.9 }}>{children}</div>
  </div>
)
const Term = ({ t, children }: { t: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', gap: 12, marginBottom: 16, alignItems: 'flex-start' }}>
    <code style={{ fontSize: 12, background: `${N}15`, color: N, padding: '3px 8px', borderRadius: 5, flexShrink: 0, marginTop: 2 }}>{t}</code>
    <span style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>{children}</span>
  </div>
)

const dhcpOptions = [
  { code: 1, name: 'Subnet Mask', example: '255.255.255.0' },
  { code: 3, name: 'Default Gateway (Router)', example: '192.168.1.1' },
  { code: 6, name: 'DNS Servers', example: '8.8.8.8, 8.8.4.4' },
  { code: 12, name: 'Hostname', example: 'workstation-01' },
  { code: 15, name: 'Domain Name', example: 'corp.example.com' },
  { code: 28, name: 'Broadcast Address', example: '192.168.1.255' },
  { code: 42, name: 'NTP Servers', example: '192.168.1.10' },
  { code: 43, name: 'Vendor Specific', example: 'Cisco WLC IP for AP provisioning' },
  { code: 51, name: 'Lease Time (seconds)', example: '86400 (24 hours)' },
  { code: 66, name: 'TFTP Server Name', example: '192.168.1.20 (for PXE boot)' },
  { code: 67, name: 'Bootfile Name', example: 'pxelinux.0 (PXE boot filename)' },
  { code: 82, name: 'Agent Information (Relay)', example: 'Switch port where request came from' },
  { code: 119, name: 'Domain Search List', example: 'corp.example.com, example.com' },
  { code: 121, name: 'Classless Static Routes', example: '10.0.0.0/8 via 192.168.1.254' },
]

function DHCPOptionsTable() {
  const [search, setSearch] = useState('')
  const filtered = dhcpOptions.filter(o => o.code.toString().includes(search) || o.name.toLowerCase().includes(search.toLowerCase()))
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: N, fontFamily: 'var(--font-mono)', margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '.1em' }}>Common DHCP Options</p>
      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search option code or name…" style={{ width: '100%', boxSizing: 'border-box', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 6, padding: '8px 12px', color: 'var(--text)', fontSize: 13, marginBottom: 16 }} />
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr>{['Code', 'Option Name', 'Example Value'].map(h => <th key={h} style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--muted)', fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', borderBottom: '1px solid var(--border)' }}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {filtered.map(o => (
            <tr key={o.code} style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '8px 12px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: N }}>{o.code}</td>
              <td style={{ padding: '8px 12px', color: 'var(--text)', fontWeight: 600 }}>{o.name}</td>
              <td style={{ padding: '8px 12px', color: 'var(--muted)', fontSize: 12 }}>{o.example}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function DHCPDeepDiveModule() {
  return (
    <LearnLayout
      title="DHCP Deep Dive"
      description="DHCP does far more than assign IP addresses. Options, relay agents, DHCP failover, reservations, and snooping make it one of the most feature-rich and attack-prone protocols in your network."
      section="Networking Fundamentals"
      readTime="16 min"
      updatedAt="May 2026"
    >
      <Part n="01" title="Beyond the Basics: DHCP Options" />
      <P>The DORA handshake (covered in the NAT and DHCP module) assigns an IP address. But DHCP's real power is in its <Hl>options</Hl> — up to 254 option codes that configure nearly every aspect of a host's network stack. Option 3 provides the default gateway. Option 6 provides DNS servers. Option 15 provides the domain name. Option 66/67 enable PXE (Preboot Execution Environment) for diskless workstations and OS deployment.</P>

      <DHCPOptionsTable />

      <HR />
      <Part n="02" title="DHCP Reservations and Static Assignments" />
      <H>MAC-Based Reservations</H>
      <P>Servers, printers, and network infrastructure typically need consistent IP addresses (for firewall rules, DNS records, monitoring configs). Rather than manually configuring static IPs on each device, <Hl>DHCP reservations</Hl> bind a specific IP to a MAC address on the DHCP server. The device still goes through DORA, but the server always offers the same IP. Benefits: centralized management, the IP is still tracked in the DHCP database with hostname and timestamp, and changing the IP only requires updating the reservation.</P>

      <H>DHCP Failover</H>
      <P>A single DHCP server is a single point of failure. DHCP failover (RFC 3074, supported by Windows Server, ISC DHCP, Kea) synchronizes the lease database between two servers. In <Hl>hot standby</Hl> mode: the primary handles all requests; the standby takes over automatically if the primary fails. In <Hl>load balancing</Hl> mode: both servers handle requests simultaneously, each responsible for a portion of the address pool. When one fails, the other handles the full range after a recovery timer.</P>

      <HR />
      <Part n="03" title="DHCP Relay, Option 82, and Security" />
      <H>Option 82: Relay Agent Information</H>
      <P>When a DHCP relay agent forwards a client's request to the DHCP server, it inserts <Hl>Option 82 (Relay Agent Information)</Hl> into the DHCP packet. This sub-option identifies which circuit (switch port, AP, etc.) the request came from. The DHCP server can use this information to assign addresses from a specific pool (clients from switch port 1/10 get addresses in VLAN 10's range), implement per-circuit lease limits, and enable more precise audit logging.</P>

      <H>DHCP Snooping Review</H>
      <P>As covered in the NAT and DHCP module, DHCP Snooping prevents rogue DHCP servers. It also builds the binding table used by DAI (Dynamic ARP Inspection) and IP Source Guard. <Hl>IP Source Guard</Hl> extends snooping further: it configures per-port ACLs that only allow traffic from the IP address the DHCP server assigned to that port — preventing IP spoofing at the switch level.</P>

      <ProTip>
        On ISC DHCP or Kea, configure <code style={{ fontSize: 12, background: `${N}15`, color: N, padding: '2px 5px', borderRadius: 4 }}>log-facility local7;</code> to send DHCP logs to syslog. Every address assignment and release is logged with MAC, hostname, and IP — invaluable for investigating IP conflicts, tracing devices, and compliance audits. Enable DDNS (Dynamic DNS) integration to automatically update DNS A records when DHCP assigns an address.
      </ProTip>

      <HR />
      <Part n="04" title="Interview Questions" />
      <IQ q="What is DHCP Option 82 and how is it used?">
        Option 82 (Relay Agent Information) is inserted by the DHCP relay agent into DHCP requests forwarded to the DHCP server. It contains sub-options identifying the agent circuit ID (e.g., the switch VLAN, port, or AP BSSID that originated the request) and remote ID (the relay agent's identifier). The DHCP server can use this information to: assign addresses from the correct pool for each VLAN, implement per-circuit policies (maximum leases per port), detect and block unauthorized devices connecting via specific ports, and provide detailed audit trails including physical port information in DHCP logs.
      </IQ>
      <IQ q="How does DHCP failover work?">
        DHCP failover synchronizes the lease database between two servers (primary and secondary). Both servers share knowledge of all issued leases, pending offers, and available addresses. In hot standby mode: the primary handles all requests; the secondary monitors the primary via a heartbeat; if the primary becomes unreachable, the secondary waits for a partner-down-delay then takes over the full address pool. In load balancing mode: the primary and secondary each handle a percentage of clients (e.g., 50/50) simultaneously — the split is hash-based on the client MAC address. Failover prevents duplicate address assignments and maintains service during maintenance.
      </IQ>

      <HR />
      <Part n="05" title="Key Terminology" />
      <Term t="DHCP option">Numbered configuration data beyond the IP address: gateway (3), DNS (6), hostname (12), lease time (51), PXE (66/67).</Term>
      <Term t="DHCP reservation">MAC-to-IP binding on the server ensuring a specific device always receives the same address.</Term>
      <Term t="DHCP failover">Synchronized lease database between two servers for high availability and optional load balancing.</Term>
      <Term t="Option 82">Relay Agent Information — circuit/port metadata inserted by relay agents for per-circuit DHCP policies.</Term>
      <Term t="IP Source Guard">Switch feature using DHCP snooping binding table to block traffic from IPs not DHCP-assigned to that port.</Term>

      <KeyTakeaways items={[
        'DHCP options (1–254) configure default gateway, DNS, NTP, domain, PXE boot servers, and more beyond just the IP address.',
        'DHCP reservations bind specific IPs to MAC addresses — centralized static assignment without configuring hosts directly.',
        'DHCP failover synchronizes lease databases between two servers — hot standby or load-balanced modes.',
        'Option 82 lets relay agents tag requests with switch port/VLAN info, enabling per-circuit policies and detailed auditing.',
        'IP Source Guard uses the DHCP snooping binding table to enforce that only DHCP-assigned IPs can send traffic from each port.',
      ]} />
    </LearnLayout>
  )
}
