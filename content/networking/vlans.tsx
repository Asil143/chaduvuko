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

const vlanDefs = [
  { id: 10, name: 'ENGINEERING', color: '#3b82f6', hosts: ['eng-ws-01', 'eng-ws-02', 'build-server'], subnet: '10.10.10.0/24' },
  { id: 20, name: 'SALES', color: '#f59e0b', hosts: ['sales-laptop-01', 'sales-laptop-02', 'crm-terminal'], subnet: '10.10.20.0/24' },
  { id: 30, name: 'SERVERS', color: '#8b5cf6', hosts: ['web-01', 'db-primary', 'db-replica'], subnet: '10.10.30.0/24' },
  { id: 99, name: 'MGMT', color: '#ef4444', hosts: ['sw-mgmt', 'ap-mgmt', 'oob-console'], subnet: '10.10.99.0/24' },
]

function VLANSim() {
  const [selected, setSelected] = useState<number | null>(null)
  const [srcVlan, setSrcVlan] = useState(10)
  const [dstVlan, setDstVlan] = useState(30)
  const [showFrame, setShowFrame] = useState(false)

  const s = vlanDefs.find(v => v.id === srcVlan)!
  const d = vlanDefs.find(v => v.id === dstVlan)!
  const sameVlan = srcVlan === dstVlan

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: N, fontFamily: 'var(--font-mono)', margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '.1em' }}>VLAN Segmentation Explorer</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 24 }}>
        {vlanDefs.map(v => (
          <div
            key={v.id}
            onClick={() => setSelected(selected === v.id ? null : v.id)}
            style={{ background: selected === v.id ? `${v.color}15` : 'var(--bg)', border: `2px solid ${selected === v.id ? v.color : 'var(--border)'}`, borderRadius: 10, padding: 14, cursor: 'pointer', transition: 'all .15s' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <code style={{ fontSize: 12, background: `${v.color}20`, color: v.color, padding: '2px 8px', borderRadius: 4, fontWeight: 700 }}>VLAN {v.id}</code>
              <span style={{ fontSize: 11, color: 'var(--muted)' }}>{v.subnet}</span>
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>{v.name}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {v.hosts.map(h => (
                <span key={h} style={{ fontSize: 11, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 4, padding: '2px 6px', color: 'var(--muted)' }}>{h}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ borderTop: '1px solid var(--border)', paddingTop: 20 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>Traffic path simulator</p>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', marginBottom: 16 }}>
          <select value={srcVlan} onChange={e => { setSrcVlan(Number(e.target.value)); setShowFrame(false) }} style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 6, padding: '6px 10px', color: 'var(--text)', fontSize: 13 }}>
            {vlanDefs.map(v => <option key={v.id} value={v.id}>VLAN {v.id} — {v.name}</option>)}
          </select>
          <span style={{ fontSize: 14, color: 'var(--muted)' }}>→</span>
          <select value={dstVlan} onChange={e => { setDstVlan(Number(e.target.value)); setShowFrame(false) }} style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 6, padding: '6px 10px', color: 'var(--text)', fontSize: 13 }}>
            {vlanDefs.map(v => <option key={v.id} value={v.id}>VLAN {v.id} — {v.name}</option>)}
          </select>
          <button onClick={() => setShowFrame(true)} style={{ background: N, color: '#000', border: 'none', borderRadius: 6, padding: '7px 16px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Analyze</button>
        </div>
        {showFrame && (
          <div style={{ background: sameVlan ? `${N}08` : '#f59e0b08', border: `1px solid ${sameVlan ? N : '#f59e0b'}25`, borderRadius: 8, padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: sameVlan ? N : '#f59e0b', marginBottom: 8 }}>
              {sameVlan ? '✓ Same VLAN — direct Layer 2 switching' : '⚡ Different VLANs — requires Layer 3 routing'}
            </div>
            {sameVlan ? (
              <div style={{ fontSize: 13, color: 'var(--muted)' }}>
                Frames stay within VLAN {srcVlan}. The switch forwards using its MAC table. No router involved. Broadcast traffic is contained to the {s.subnet} segment only.
              </div>
            ) : (
              <div style={{ fontSize: 13, color: 'var(--muted)' }}>
                Traffic from {s.subnet} to {d.subnet} must pass through a Layer 3 device (router or SVI on an L3 switch). A firewall policy can inspect or block this traffic. A flat network without VLANs would allow {s.name} to reach {d.name} directly.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default function VLANsModule() {
  return (
    <LearnLayout
      title="VLANs — Network Segmentation"
      description="Virtual LANs let you carve one physical switch fabric into multiple isolated broadcast domains. The foundation of every secure, scalable enterprise network."
      section="Networking Fundamentals"
      readTime="20 min"
      updatedAt="May 2026"
    >
      <Part n="01" title="Why Flat Networks Don't Scale" />
      <P>
        In the early days of Ethernet, every device on a network shared the same broadcast domain. Every ARP request, every DHCP discover, every NetBIOS name resolution hit every single device. With 20 computers this was tolerable. With 1,000 computers, the broadcast storm made the network functionally unusable. And worse — every device on the same flat network could directly reach every other device, creating massive security exposure.
      </P>
      <P>
        The traditional solution was to buy more routers and physically segment the network. Finance gets one router, Engineering gets another, Servers get a third. This worked but was expensive, inflexible, and required physical rewiring when departments moved. Enter <Hl>VLANs — Virtual Local Area Networks</Hl>, defined in IEEE 802.1Q in 1998.
      </P>
      <P>
        A VLAN creates a <Hl>logical broadcast domain</Hl> that is independent of the physical topology. You can have hosts in the same room belong to different VLANs (isolated from each other), or hosts in different buildings belong to the same VLAN. One physical switch can carry dozens of VLANs simultaneously. The only way to cross VLAN boundaries is through a Layer 3 device — usually a router or a Layer 3 switch — which means you can enforce firewall policies at every inter-segment crossing.
      </P>

      <VLANSim />

      <HR />
      <Part n="02" title="802.1Q Tagging: How Frames Know Their VLAN" />

      <H>Access vs. Trunk Ports</H>
      <P>
        Switch ports operate in two fundamental modes. An <Hl>access port</Hl> belongs to exactly one VLAN. Frames arriving on an access port are untagged — the end device (PC, printer, server) has no knowledge of VLANs. The switch silently assigns all frames entering this port to the configured VLAN and strips VLAN information when forwarding out to the end device.
      </P>
      <P>
        A <Hl>trunk port</Hl> carries traffic from <em>multiple</em> VLANs simultaneously. Trunk ports are used to interconnect switches, connect to routers for inter-VLAN routing, and connect to virtualization hosts that run VMs in different VLANs. Frames on trunk ports carry an 802.1Q tag identifying which VLAN they belong to.
      </P>

      <H>The 802.1Q Tag</H>
      <P>
        The 802.1Q standard inserts a <Hl>4-byte tag</Hl> into the Ethernet frame header, right after the source MAC address and before the EtherType field. The tag contains: a 2-byte TPID (0x8100); a 3-bit Priority Code Point (PCP) for QoS; a 1-bit Drop Eligible Indicator (DEI); and a 12-bit <Hl>VLAN ID (VID)</Hl> ranging from 0 to 4095.
      </P>
      <P>
        The 12-bit VID allows 4,096 unique VLANs. In practice VLANs 0 and 4095 are reserved, leaving 4,094 usable. VLAN 1 is the default/native VLAN on Cisco equipment. Best practice: avoid using VLAN 1 for any actual traffic and configure a non-default native VLAN on trunk links.
      </P>

      <H>The Native VLAN</H>
      <P>
        On a trunk port, one VLAN is designated the <Hl>native VLAN</Hl>. Frames from the native VLAN are sent <em>untagged</em> across the trunk (for backward compatibility). Untagged frames received on a trunk port are assigned to the native VLAN. If the native VLAN differs between two ends of a trunk link, frames will be misassigned. Always ensure native VLAN matches on both ends.
      </P>

      <Err title="VLAN hopping via double-tagging">
        If an attacker on the native VLAN sends a frame with two 802.1Q tags (outer = native VLAN, inner = target VLAN), the first switch strips the outer tag and forwards natively; the second switch sees the inner tag and delivers it to the victim VLAN. Prevention: change native VLAN to an unused ID like VLAN 999, never assign hosts to it, and use <code style={{ fontSize: 13 }}>vlan dot1q tag native</code> to tag the native VLAN explicitly.
      </Err>

      <HR />
      <Part n="03" title="Inter-VLAN Routing" />

      <H>Router-on-a-Stick</H>
      <P>
        The classic method uses a single router interface connected to a trunk port. The router creates logical sub-interfaces, each tagged for a different VLAN with the gateway IP for that VLAN. All inter-VLAN traffic exits to the router and returns via the same trunk — creating a bottleneck.
      </P>

      <H>Layer 3 Switches and SVIs</H>
      <P>
        Modern enterprise networks use <Hl>Layer 3 switches</Hl> for inter-VLAN routing. A <Hl>Switched Virtual Interface (SVI)</Hl> is a logical Layer 3 interface for each VLAN, acting as the default gateway. Routing between SVIs happens in hardware ASICs at line rate — far faster than router-on-a-stick and without the single-uplink bottleneck.
      </P>
      <P>
        A typical distribution switch: VLANs 10, 20, 30, 99 exist on the fabric; SVIs with IPs 10.10.10.1/24, 10.10.20.1/24, 10.10.30.1/24, 10.10.99.1/24; IP routing enabled globally; a firewall enforcing inter-VLAN security policy on the uplink.
      </P>

      <ProTip>
        Layer 3 switches route between VLANs using the FIB (Forwarding Information Base) loaded from the routing table. After the first packet in a flow is software-processed, subsequent packets take a hardware fast path (CEF on Cisco). Latency drops from ~50µs (software) to ~1µs (ASIC).
      </ProTip>

      <HR />
      <Part n="04" title="VTP, Private VLANs, and QinQ" />

      <H>VLAN Trunking Protocol (VTP)</H>
      <P>
        Cisco's proprietary <Hl>VTP</Hl> synchronizes VLAN databases across all switches in a domain. A VTP Server holds the authoritative database; Client switches receive updates automatically. The danger: a switch with a higher VTP revision number plugged into the network can wipe the VLAN database of every other switch, simultaneously dropping all VLANs.
      </P>
      <P>
        Most experienced engineers set all switches to VTP Transparent mode (propagates VTP frames without acting on them) or use VTP version 3. The convenience rarely justifies the risk.
      </P>

      <H>Private VLANs (PVLANs)</H>
      <P>
        <Hl>Private VLANs</Hl> add isolation within a VLAN. Used in hosting environments where customers share a VLAN but must be isolated from each other. Isolated ports can only reach the promiscuous (gateway) port; community ports can reach each other and the gateway but not isolated ports. Web server VLANs often use this: servers share one subnet but cannot reach each other directly.
      </P>

      <H>QinQ (802.1ad)</H>
      <P>
        <Hl>QinQ</Hl> stacks two 802.1Q tags: the outer S-Tag (service VLAN) and inner C-Tag (customer VLAN). Service providers use QinQ to carry customer VLANs over a provider backbone — 4094 × 4094 ≈ 16 million unique combinations, eliminating VLAN ID conflicts between customers.
      </P>

      <HR />
      <Part n="05" title="A Day in the Life: Security Audit" />

      <TimeBlock time="9:00 AM" label="CISO requests PCI DSS VLAN segmentation evidence">
        POS systems must be isolated from the corporate network. You audit switch configs across 12 locations.
      </TimeBlock>
      <TimeBlock time="9:45 AM" label="Discovery: POS terminals on corporate VLAN 10">
        Three stores have POS registers on VLAN 10 instead of VLAN 50. Added 18 months ago during a switch refresh, the ports were configured with the wrong VLAN. POS systems can currently reach corporate file shares — a critical PCI DSS violation.
      </TimeBlock>
      <TimeBlock time="10:30 AM" label="Emergency remediation">
        Create VLAN 50 on all affected switches. Reconfigure access ports from VLAN 10 to VLAN 50. Assign VLAN 50 a separate SVI with firewall policy allowing only payment processor IPs outbound. Update trunk allowed-VLANs lists. Verify: corporate laptop can no longer ping POS registers.
      </TimeBlock>
      <TimeBlock time="2:00 PM" label="Process hardening">
        Deploy VLAN compliance monitoring via SNMP — alert on unauthorized VLAN port changes. Add VLAN validation step to the network provisioning runbook. Provide documented evidence to auditors.
      </TimeBlock>

      <HR />
      <Part n="06" title="Interview Questions" />

      <IQ q="What's the difference between an access port and a trunk port?">
        An access port belongs to a single VLAN and carries untagged frames — end devices connect here with no VLAN awareness. A trunk port carries multiple VLANs simultaneously with 802.1Q tags in each frame. The 12-bit VLAN ID field (0–4095) in the tag tells the receiving device which VLAN a frame belongs to. Switch-to-switch links, router uplinks, and hypervisor uplinks use trunk ports.
      </IQ>

      <IQ q="Explain VLAN hopping and how to prevent it.">
        VLAN hopping exploits native VLAN behavior. In double-tagging: an attacker on the native VLAN sends a frame with two 802.1Q tags (outer = native VLAN, inner = victim VLAN). The first switch strips the outer tag; the second switch sees the inner tag and delivers it to the victim VLAN. Prevention: (1) change native VLAN to unused ID (999); (2) never put hosts on the native VLAN; (3) tag the native VLAN explicitly on trunk ports; (4) use <code style={{ fontSize: 12 }}>switchport mode access</code> on all end-host ports to disable automatic trunking.
      </IQ>

      <IQ q="How does inter-VLAN routing work with a Layer 3 switch?">
        A Layer 3 switch creates an SVI (Switched Virtual Interface) for each VLAN — a logical IP interface acting as the default gateway. When a host sends traffic to a different subnet, it forwards to its SVI's MAC address. The L3 switch routes via the FIB to the destination VLAN's SVI and forwards the re-framed packet. This happens in hardware ASICs at near-line-rate — much faster than router-on-a-stick.
      </IQ>

      <HR />
      <Part n="07" title="Key Terminology" />
      <Term t="VLAN">Virtual LAN — a logical broadcast domain on switch software, independent of physical topology. Defined by IEEE 802.1Q.</Term>
      <Term t="802.1Q tag">4-byte tag in Ethernet frame: TPID (0x8100) + PCP + DEI + 12-bit VLAN ID. Present on trunk port frames.</Term>
      <Term t="Access port">Switch port carrying a single VLAN with untagged frames. End hosts connect here.</Term>
      <Term t="Trunk port">Switch port carrying multiple VLANs with tagged frames. Used for switch-to-switch and switch-to-router links.</Term>
      <Term t="Native VLAN">The VLAN whose frames are sent untagged on a trunk. Must match on both ends of a trunk link.</Term>
      <Term t="SVI">Switched Virtual Interface — a logical Layer 3 gateway interface on a Layer 3 switch, one per VLAN.</Term>
      <Term t="PVLAN">Private VLAN — host isolation within a VLAN. Isolated ports can only reach the promiscuous (gateway) port.</Term>

      <KeyTakeaways items={[
        'VLANs create logical broadcast domains on shared switch infrastructure, reducing broadcast traffic and enabling security segmentation.',
        '802.1Q inserts a 4-byte tag with a 12-bit VLAN ID; access ports strip/add tags invisibly; trunk ports pass tagged frames.',
        'The native VLAN is sent untagged on trunk ports — mismatched native VLANs between switches cause traffic misassignment.',
        'Inter-VLAN traffic requires a Layer 3 device; Layer 3 switch SVIs route between VLANs in hardware at line rate.',
        'VLAN hopping via double-tagging attacks the native VLAN — mitigate by assigning an unused VLAN ID as native.',
        'Avoid VTP Server mode in production — a higher-revision switch can accidentally wipe all VLANs across your domain.',
      ]} />
    </LearnLayout>
  )
}
