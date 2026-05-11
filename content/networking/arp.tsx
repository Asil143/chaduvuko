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

// Interactive ARP simulation
function ARPSim() {
  const hosts: Record<string, { ip: string; mac: string }> = {
    'PC-A': { ip: '192.168.1.10', mac: 'AA:BB:CC:11:22:33' },
    'PC-B': { ip: '192.168.1.20', mac: 'DD:EE:FF:44:55:66' },
    'PC-C': { ip: '192.168.1.30', mac: '11:22:33:AA:BB:CC' },
    'Gateway': { ip: '192.168.1.1', mac: 'GG:HH:II:77:88:99' },
  }

  const [src, setSrc] = useState('PC-A')
  const [dst, setDst] = useState('PC-B')
  const [step, setStep] = useState(0)
  const [arpTable, setArpTable] = useState<Record<string, string>>({})

  const steps = [
    { actor: '📡 Broadcast', msg: `ARP Request → Who has ${hosts[dst].ip}? Tell ${hosts[src].ip}`, note: `Frame: src MAC=${hosts[src].mac} dst MAC=FF:FF:FF:FF:FF:FF (broadcast). Every host on the segment receives this.` },
    { actor: `🖥 ${dst}`, msg: `ARP Reply → ${hosts[dst].ip} is at ${hosts[dst].mac}`, note: `Only the host owning ${hosts[dst].ip} replies. Reply is unicast directly to ${hosts[src].mac}.` },
    { actor: `🖥 ${src}`, msg: `Cache: ${hosts[dst].ip} → ${hosts[dst].mac} (TTL ~20 min)`, note: `${src} saves the mapping. Future frames to ${hosts[dst].ip} go directly without another ARP broadcast.` },
  ]

  function advance() {
    if (step < steps.length) {
      if (step === 2) {
        setArpTable(prev => ({ ...prev, [hosts[dst].ip]: hosts[dst].mac }))
      }
      setStep(s => s + 1)
    }
  }

  function reset() {
    setStep(0)
    setArpTable({})
  }

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: N, fontFamily: 'var(--font-mono)', margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '.1em' }}>ARP Exchange Simulator</p>

      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        {['src', 'dst'].map(role => (
          <div key={role}>
            <label style={{ fontSize: 12, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>{role === 'src' ? 'Sender' : 'Target'}</label>
            <select
              value={role === 'src' ? src : dst}
              onChange={e => { role === 'src' ? setSrc(e.target.value) : setDst(e.target.value); reset() }}
              style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 6, padding: '6px 10px', color: 'var(--text)', fontSize: 13 }}
            >
              {Object.keys(hosts).filter(h => h !== (role === 'src' ? dst : src)).map(h => (
                <option key={h} value={h}>{h} ({hosts[h].ip})</option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
        {Object.entries(hosts).map(([name, info]) => (
          <div key={name} style={{ background: name === src ? `${N}20` : name === dst ? '#3b82f620' : 'var(--bg)', border: `1px solid ${name === src ? N : name === dst ? '#3b82f6' : 'var(--border)'}`, borderRadius: 8, padding: '10px 14px', textAlign: 'center' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)' }}>{name}</div>
            <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>{info.ip}</div>
            <div style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>{info.mac}</div>
          </div>
        ))}
      </div>

      <div style={{ minHeight: 120, marginBottom: 16 }}>
        {steps.slice(0, step).map((s, i) => (
          <div key={i} style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 16px', marginBottom: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: N, marginBottom: 4 }}>{s.actor}</div>
            <div style={{ fontSize: 13, fontFamily: 'var(--font-mono)', color: 'var(--text)', marginBottom: 6 }}>{s.msg}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>{s.note}</div>
          </div>
        ))}
        {step === 0 && <div style={{ fontSize: 13, color: 'var(--muted)', textAlign: 'center', paddingTop: 40 }}>Press "Next Step" to begin ARP exchange</div>}
      </div>

      {Object.keys(arpTable).length > 0 && (
        <div style={{ background: `${N}08`, border: `1px solid ${N}20`, borderRadius: 8, padding: '12px 16px', marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: N, fontFamily: 'var(--font-mono)', marginBottom: 8 }}>ARP CACHE ({src})</div>
          {Object.entries(arpTable).map(([ip, mac]) => (
            <div key={ip} style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text)' }}>{ip.padEnd(18)} {mac}</div>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={advance} disabled={step >= steps.length} style={{ background: N, color: '#000', border: 'none', borderRadius: 6, padding: '8px 18px', fontSize: 13, fontWeight: 700, cursor: step >= steps.length ? 'default' : 'pointer', opacity: step >= steps.length ? 0.5 : 1 }}>
          {step === 0 ? 'Start ARP Request' : step < steps.length ? 'Next Step →' : 'Done'}
        </button>
        <button onClick={reset} style={{ background: 'transparent', color: 'var(--muted)', border: '1px solid var(--border)', borderRadius: 6, padding: '8px 18px', fontSize: 13, cursor: 'pointer' }}>Reset</button>
      </div>
    </div>
  )
}

export default function ARPModule() {
  return (
    <LearnLayout
      title="ARP — How IP Maps to MAC"
      description="Address Resolution Protocol bridges Layer 3 IP addresses to Layer 2 MAC addresses. Without it, your packets would never leave the local network."
      section="Networking Fundamentals"
      readTime="18 min"
      updatedAt="May 2026"
    >
      <Part n="01" title="The Two-Address Problem" />
      <P>
        Every host on an IP network has two addresses living at different layers of the stack. At <Hl>Layer 3</Hl>, it has an IP address like 192.168.1.10 — a logical, software-assigned identity that routing uses to deliver packets across the internet. At <Hl>Layer 2</Hl>, it has a MAC address like AA:BB:CC:11:22:33 — a hardware identity burned into the network interface card, used to deliver frames within a single Ethernet segment.
      </P>
      <P>
        Here is the fundamental problem: when Host A wants to send an IP packet to Host B on the same subnet, it knows B's IP address from DNS or configuration, but Ethernet frames require a destination MAC address in their header. A has no idea what MAC address belongs to that IP. <Hl>ARP — Address Resolution Protocol</Hl> is the mechanism that solves this translation problem.
      </P>
      <P>
        ARP was defined in RFC 826 in 1982 and is one of the oldest protocols still in heavy daily use. It is elegant: a simple broadcast-and-reply system that keeps a local cache to avoid repeated broadcasts. Every operating system, router, and switch participates in ARP for IPv4 networks. (IPv6 uses a successor called NDP — Neighbor Discovery Protocol — which we cover in the IPv6 module.)
      </P>

      <H>The Mental Model: A Shouted Question</H>
      <P>
        Imagine a room full of people. You know someone's name (their "IP address") but not their face (their "MAC address"). You shout: <em>"Hey, whoever is named Bob, what do you look like?"</em> Everyone hears the question, but only Bob answers, telling you his distinguishing features. You write that down so you don't have to ask again. That is precisely how ARP works — except the "room" is the broadcast domain and the "shout" is an Ethernet broadcast to FF:FF:FF:FF:FF:FF.
      </P>

      <ARPSim />

      <HR />
      <Part n="02" title="ARP Packet Format and Message Types" />

      <H>ARP Request</H>
      <P>
        An ARP request carries: sender's MAC address, sender's IP address, target's IP address, and 00:00:00:00:00:00 as the target MAC (unknown — that's what we're asking for). The Ethernet frame wraps this with destination MAC = FF:FF:FF:FF:FF:FF, which instructs every switch port on the VLAN to deliver it to every device on the segment.
      </P>
      <P>
        The request is a broadcast, which has performance implications. On a /16 subnet with 65,000 hosts, if every host ARPs simultaneously, 65,000 broadcast frames hit every single network interface. This is why network engineers avoid oversized flat Layer 2 domains and use VLANs to contain broadcast traffic.
      </P>

      <H>ARP Reply</H>
      <P>
        Only the host that owns the requested IP address sends a reply. The reply is <Hl>unicast</Hl> — sent directly to the requester's MAC address (which was included in the request). The reply contains: sender's MAC (the answer!), sender's IP, target's MAC, and target's IP. After receiving the reply, the requester caches the IP→MAC mapping, typically for 20 minutes on Linux or 2 minutes on Windows, though this varies by OS.
      </P>

      <H>Gratuitous ARP</H>
      <P>
        A <Hl>gratuitous ARP</Hl> is an ARP request where the sender and target IP are the same — a host announcing its own IP→MAC mapping to the network without being asked. This serves several purposes: detecting IP conflicts (if anyone replies to your gratuitous ARP, someone else has your IP), updating cached entries after a NIC replacement or failover, and pre-populating ARP caches of other hosts to speed up first communication.
      </P>
      <P>
        Gratuitous ARP is critical in high-availability setups. When a failover cluster switches from the primary node to the backup, the backup sends a gratuitous ARP with the virtual IP mapped to the backup's MAC, forcing all hosts to update their caches immediately. Without this, traffic would keep flowing to the dead primary for up to 20 minutes until caches expire.
      </P>

      <H>Proxy ARP</H>
      <P>
        In some architectures, a router answers ARP requests <em>on behalf of</em> hosts on another subnet. This is called <Hl>proxy ARP</Hl>. The router responds to an ARP request for 10.0.2.5 (on a different subnet) with its own MAC address, then forwards actual packets via routing. This lets devices with misconfigured default gateways still reach remote hosts, but it obscures network topology and is considered legacy. Most modern networks disable proxy ARP explicitly.
      </P>

      <Err title="ARP only works within a broadcast domain">
        ARP cannot cross router boundaries. When Host A sends a packet to Host B on a different subnet, A ARPs for its <em>default gateway</em> (the router), not for B directly. The router then ARP-resolves B's MAC on B's subnet. Each hop in a routed network does its own ARP resolution independently.
      </Err>

      <HR />
      <Part n="03" title="ARP Cache and Poisoning" />

      <H>The ARP Cache</H>
      <P>
        After resolving an address, the OS caches the IP→MAC mapping in memory. You can inspect this cache on any OS: run <code style={{ fontSize: 13, background: `${N}15`, color: N, padding: '2px 6px', borderRadius: 4 }}>arp -a</code> on Windows/Mac/Linux to see all current entries. Cache entries are marked either "dynamic" (learned via ARP) or "static" (manually configured). Dynamic entries expire after their timeout; static entries persist until manually removed.
      </P>
      <P>
        Cache entries also include a "reachability" state on modern Linux kernels: REACHABLE (recently confirmed valid), STALE (timeout elapsed but not yet discarded), DELAY (sending probe), PROBE (actively re-ARPing), and FAILED (unreachable after probes). Linux uses a Neighbor Discovery state machine for ARP management, which is why you may see entries linger in STALE state before being fully removed.
      </P>

      <H>ARP Spoofing and Poisoning</H>
      <P>
        ARP has a critical design weakness: it is <Hl>stateless and unauthenticated</Hl>. Any host on the network can send an unsolicited ARP reply claiming any IP→MAC mapping. If Host M broadcasts "192.168.1.1 is at M's MAC," all hosts will update their caches to route gateway traffic through M. This is the basis of <Hl>ARP spoofing</Hl> (also called ARP poisoning), one of the most fundamental man-in-the-middle attacks on local networks.
      </P>
      <P>
        An attacker running arpspoof or similar tools typically poisons two targets simultaneously: the victim host (claiming to be the gateway) and the gateway (claiming to be the victim). This creates a bidirectional MitM position where all traffic flows through the attacker, who can sniff, modify, or drop packets at will. The attack works on any unencrypted protocol — HTTP, FTP, Telnet, and clear-text databases are all trivially exposed.
      </P>

      <H>Defenses: DAI and Static ARP</H>
      <P>
        Enterprise switches implement <Hl>Dynamic ARP Inspection (DAI)</Hl> to mitigate ARP poisoning. DAI intercepts all ARP packets on untrusted ports and validates them against the DHCP Snooping binding table (which maps IP→MAC→port from legitimate DHCP transactions). Packets that don't match a known binding are dropped. DAI is configured per-VLAN, with uplink ports and authorized hosts marked as "trusted" to bypass inspection.
      </P>
      <P>
        For critical infrastructure (servers, gateways), administrators sometimes configure <Hl>static ARP entries</Hl> that cannot be overwritten by incoming ARP replies. This eliminates the spoofing window for specific hosts at the cost of manual maintenance when hardware changes.
      </P>

      <ProTip>
        Run <code style={{ fontSize: 12, background: `${N}15`, color: N, padding: '2px 5px', borderRadius: 4 }}>arp -d [ip]</code> to delete a specific cached entry on Linux/Mac (useful for testing after ARP changes), or <code style={{ fontSize: 12, background: `${N}15`, color: N, padding: '2px 5px', borderRadius: 4 }}>ip neigh flush all</code> on Linux to clear the entire ARP table. On Cisco switches, <code style={{ fontSize: 12, background: `${N}15`, color: N, padding: '2px 5px', borderRadius: 4 }}>show ip arp</code> and <code style={{ fontSize: 12, background: `${N}15`, color: N, padding: '2px 5px', borderRadius: 4 }}>clear ip arp</code> do the same.
      </ProTip>

      <HR />
      <Part n="04" title="A Day in the Life: Network Engineer at 3 AM" />

      <TimeBlock time="2:47 AM" label="PagerDuty fires — 40% packet loss to production DB cluster">
        You get paged. Monitoring shows 192.168.10.50 (primary DB) is intermittently unreachable from the app tier. SSH to the app server still works. Ping to the DB shows 40% loss with normal latency on successful pings — classic ARP instability or duplicate IP.
      </TimeBlock>
      <TimeBlock time="2:52 AM" label="Check ARP tables">
        Run <code style={{ fontSize: 12 }}>arp -n | grep 192.168.10.50</code> on app server. You see the entry cycling between two MAC addresses — one correct, one unknown. A host is ARP-spoofing or there's a duplicate IP. <code style={{ fontSize: 12 }}>ip neigh show</code> confirms the entry keeps flapping between REACHABLE and STALE, resolving to two different MACs alternately.
      </TimeBlock>
      <TimeBlock time="2:58 AM" label="Identify the culprit">
        SSH to the core switch. Run <code style={{ fontSize: 12 }}>show ip arp 192.168.10.50</code> — it shows the correct MAC. But from a different switch in the path, the same command shows a different MAC. A rogue host has 192.168.10.50 statically configured. Check DHCP lease table — 192.168.10.50 was allocated to a new VM that was deployed at 2:15 AM with incorrect static IP config.
      </TimeBlock>
      <TimeBlock time="3:06 AM" label="Resolution">
        Reconfigure the new VM's IP from 192.168.10.50 to an unused address in the correct range. Run <code style={{ fontSize: 12 }}>ip neigh flush all</code> on affected app servers to clear stale ARP cache. The DB becomes immediately and consistently reachable. Packet loss drops to 0%. Post-incident action item: enable DAI on all server VLANs and add IP address management (IPAM) tooling to prevent manual static IP conflicts.
      </TimeBlock>

      <HR />
      <Part n="05" title="Interview Questions" />

      <IQ q="Explain what happens at the network level when you ping a host on the same subnet for the very first time.">
        Before the first ICMP Echo Request can leave, the OS checks its ARP cache for the target IP's MAC address. Finding nothing, it broadcasts an ARP Request to FF:FF:FF:FF:FF:FF: "Who has [target IP]? Tell [my IP]." The target replies unicast with its MAC. The OS caches this mapping and only then constructs the Ethernet frame containing the IP packet containing the ICMP echo. The entire ARP exchange adds roughly one round-trip of latency before the first ping. Subsequent pings skip ARP as long as the cache entry remains valid.
      </IQ>

      <IQ q="Why can't you ARP for a host on a different subnet? What happens instead?">
        ARP uses Ethernet broadcasts, which are stopped by routers. They don't cross Layer 3 boundaries by design. When Host A wants to reach Host B on a different subnet, A checks its routing table and determines the packet must go via a default gateway (a router). A then ARPs for the <em>gateway's</em> MAC address, not B's. The gateway receives the packet, decrements TTL, ARP-resolves B's MAC on B's subnet, and forwards it. Each hop does its own independent ARP resolution.
      </IQ>

      <IQ q="How does ARP cache poisoning work, and what defenses exist?">
        ARP has no authentication — any host can send an unsolicited ARP reply claiming any IP→MAC mapping, and receivers will update their cache. An attacker sends spoofed ARP replies to both the victim (claiming to be the gateway) and the gateway (claiming to be the victim), becoming a MitM that all traffic flows through. Defenses: (1) Dynamic ARP Inspection on managed switches validates ARP packets against the DHCP Snooping binding table; (2) static ARP entries for critical hosts; (3) using encrypted protocols (TLS) so sniffed traffic is unreadable; (4) 802.1X port authentication to prevent rogue hosts from joining the network at all.
      </IQ>

      <IQ q="What is a gratuitous ARP and when is it used?">
        A gratuitous ARP is an ARP request where source and target IP are identical — the host is announcing its own IP→MAC binding to the network unsolicited. It's used for: (1) IP conflict detection — if you get a reply to your own gratuitous ARP, someone else claims your IP; (2) cache updates after a MAC change (NIC replacement, VM migration, failover); (3) pre-populating caches after a high-availability failover so traffic is redirected without waiting for cache expiry. Keepalived and other VRRP implementations send gratuitous ARPs immediately when the virtual IP moves to a new master.
      </IQ>

      <HR />
      <Part n="06" title="Key Terminology" />
      <Term t="ARP Request">Broadcast frame asking "who owns this IP?" Sent to FF:FF:FF:FF:FF:FF, received by all hosts on the segment.</Term>
      <Term t="ARP Reply">Unicast response from the target host mapping its IP to its MAC address.</Term>
      <Term t="ARP Cache">OS table mapping IP → MAC for recently resolved addresses. Entries expire (typically 20 min on Linux, 2 min on Windows).</Term>
      <Term t="Gratuitous ARP">ARP request where sender = target IP. Used for conflict detection, cache updates, and HA failovers.</Term>
      <Term t="Proxy ARP">Router answers ARP requests on behalf of hosts on another subnet, using its own MAC. Legacy technique.</Term>
      <Term t="ARP Spoofing">Attack where a malicious host sends forged ARP replies to poison caches and intercept traffic.</Term>
      <Term t="DAI">Dynamic ARP Inspection — switch feature that validates ARP packets against the DHCP Snooping binding table, blocking spoofed replies.</Term>

      <KeyTakeaways items={[
        'ARP translates Layer 3 IP addresses to Layer 2 MAC addresses using broadcast request / unicast reply.',
        'ARP only works within a broadcast domain (subnet) — routers terminate broadcasts, so each subnet does its own ARP.',
        'The ARP cache stores IP→MAC mappings to avoid repeated broadcasts; entries expire after OS-defined timeouts.',
        'Gratuitous ARP is critical for HA failovers: it forces immediate cache updates when a virtual IP moves.',
        'ARP has no authentication — spoofing attacks are trivially possible without DAI or static ARP entries.',
        'Dynamic ARP Inspection (DAI) on managed switches defeats most ARP poisoning attacks by validating against DHCP bindings.',
      ]} />
    </LearnLayout>
  )
}
