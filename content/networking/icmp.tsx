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

const icmpTypes = [
  { type: 0, code: 0, name: 'Echo Reply', use: 'Ping response' },
  { type: 3, code: 0, name: 'Destination Unreachable: Net Unreachable', use: 'No route to destination network' },
  { type: 3, code: 1, name: 'Destination Unreachable: Host Unreachable', use: 'Host not responding on reachable network' },
  { type: 3, code: 3, name: 'Destination Unreachable: Port Unreachable', use: 'UDP packet to a closed port' },
  { type: 3, code: 4, name: 'Destination Unreachable: Fragmentation Needed', use: 'Packet too large, DF bit set — MTU discovery' },
  { type: 4, code: 0, name: 'Source Quench', use: 'Congestion signal (deprecated, RFC 6633)' },
  { type: 5, code: 0, name: 'Redirect: Network', use: 'Router tells host to use a better gateway' },
  { type: 8, code: 0, name: 'Echo Request', use: 'Ping probe' },
  { type: 11, code: 0, name: 'Time Exceeded: TTL Expired', use: 'Traceroute hop response' },
  { type: 11, code: 1, name: 'Time Exceeded: Fragment Reassembly', use: 'Fragments didn\'t all arrive in time' },
  { type: 12, code: 0, name: 'Parameter Problem', use: 'Malformed IP header' },
]

function ICMPTypeTable() {
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 24, margin: '32px 0', overflowX: 'auto' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: N, fontFamily: 'var(--font-mono)', margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '.1em' }}>ICMP Type/Code Reference</p>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr>
            {['Type', 'Code', 'Name', 'When you see it'].map(h => (
              <th key={h} style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--muted)', fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', borderBottom: '1px solid var(--border)' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {icmpTypes.map((t, i) => (
            <tr key={i} onClick={() => setSelected(selected === i ? null : i)} style={{ background: selected === i ? `${N}08` : 'transparent', cursor: 'pointer', borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '10px 12px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: N }}>{t.type}</td>
              <td style={{ padding: '10px 12px', fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>{t.code}</td>
              <td style={{ padding: '10px 12px', color: 'var(--text)', fontWeight: selected === i ? 700 : 400 }}>{t.name}</td>
              <td style={{ padding: '10px 12px', color: 'var(--muted)', fontSize: 12 }}>{t.use}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function TracerouteSim() {
  const [running, setRunning] = useState(false)
  const [hops, setHops] = useState<{ ttl: number; ip: string; rtt: string; label: string }[]>([])
  const [done, setDone] = useState(false)

  const routePath = [
    { ttl: 1, ip: '192.168.1.1', rtt: '1.2 ms', label: 'Home router' },
    { ttl: 2, ip: '10.0.0.1', rtt: '8.4 ms', label: 'ISP gateway' },
    { ttl: 3, ip: '72.14.198.1', rtt: '12.1 ms', label: 'ISP peering point' },
    { ttl: 4, ip: '209.85.142.65', rtt: '14.3 ms', label: 'Google backbone' },
    { ttl: 5, ip: '216.239.54.1', rtt: '15.8 ms', label: 'Google datacenter edge' },
    { ttl: 6, ip: '8.8.8.8', rtt: '16.2 ms', label: '8.8.8.8 — destination reached!' },
  ]

  async function runTrace() {
    setHops([])
    setDone(false)
    setRunning(true)
    for (let i = 0; i < routePath.length; i++) {
      await new Promise(r => setTimeout(r, 600))
      setHops(prev => [...prev, routePath[i]])
    }
    setDone(true)
    setRunning(false)
  }

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: N, fontFamily: 'var(--font-mono)', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '.1em' }}>Traceroute Simulator</p>
      <p style={{ fontSize: 13, color: 'var(--muted)', margin: '0 0 16px' }}>Target: 8.8.8.8 (Google DNS)</p>

      <div style={{ minHeight: 160, background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 8, padding: 16, fontFamily: 'var(--font-mono)', fontSize: 12, marginBottom: 16 }}>
        <div style={{ color: 'var(--muted)', marginBottom: 8 }}>traceroute to 8.8.8.8 (8.8.8.8), 30 hops max</div>
        {hops.map(h => (
          <div key={h.ttl} style={{ display: 'flex', gap: 12, marginBottom: 4, color: h.ip === '8.8.8.8' ? N : 'var(--text)' }}>
            <span style={{ width: 20, textAlign: 'right', color: 'var(--muted)' }}>{h.ttl}</span>
            <span style={{ width: 150, color: h.ip === '8.8.8.8' ? N : '#3b82f6' }}>{h.ip}</span>
            <span style={{ width: 70, color: 'var(--text)' }}>{h.rtt}</span>
            <span style={{ color: 'var(--muted)' }}>— {h.label}</span>
          </div>
        ))}
        {running && hops.length < routePath.length && <div style={{ color: 'var(--muted)', animation: 'pulse 1s infinite' }}>  probing TTL {hops.length + 1}…</div>}
        {done && <div style={{ color: N, marginTop: 8 }}>Trace complete. {hops.length} hops.</div>}
      </div>

      <button onClick={runTrace} disabled={running} style={{ background: running ? 'var(--bg)' : N, color: running ? 'var(--muted)' : '#000', border: `1px solid ${running ? 'var(--border)' : N}`, borderRadius: 6, padding: '8px 18px', fontSize: 13, fontWeight: 700, cursor: running ? 'default' : 'pointer' }}>
        {running ? 'Running…' : done ? 'Run Again' : 'Run Traceroute'}
      </button>

      <div style={{ marginTop: 16, padding: '12px 16px', background: `${N}08`, border: `1px solid ${N}20`, borderRadius: 8, fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>
        Each probe sends a UDP packet (Unix) or ICMP Echo (Windows) with TTL=1, then TTL=2, etc. Each router decrements TTL by 1; when TTL reaches 0, the router discards the packet and sends back ICMP Type 11 "Time Exceeded" — revealing its IP address. The final destination sends ICMP Type 3 "Port Unreachable" (UDP mode) or ICMP Type 0 "Echo Reply" (ICMP mode), indicating the trace is complete.
      </div>
    </div>
  )
}

export default function ICMPModule() {
  return (
    <LearnLayout
      title="ICMP — Ping, Traceroute, and Error Reporting"
      description="The Internet Control Message Protocol is the nervous system of IP networking. Without ICMP, you would have no way to diagnose why your packets are disappearing."
      section="Networking Fundamentals"
      readTime="18 min"
      updatedAt="May 2026"
    >
      <Part n="01" title="What ICMP Actually Is" />
      <P>
        <Hl>ICMP (Internet Control Message Protocol)</Hl>, defined in RFC 792 (1981) and updated many times since, is not a transport protocol like TCP or UDP. It does not carry application data. ICMP is the <em>feedback mechanism</em> for IP — when something goes wrong with a packet (TTL expired, destination unreachable, fragmentation required), the network device sends an ICMP error message back to the source. ICMP also provides diagnostic utilities — ping and traceroute are both implemented using ICMP.
      </P>
      <P>
        ICMP sits at Layer 3 (it is technically encapsulated in IP packets, but it is considered part of the IP layer). ICMPv4 is used with IPv4; ICMPv6 is the significantly expanded version used with IPv6 (it also handles address resolution via NDP, router discovery via RA/RS, and more). This module focuses on ICMPv4.
      </P>

      <H>ICMP Message Format</H>
      <P>
        Every ICMP message has a <Hl>Type</Hl> (8 bits, identifying the message category), a <Hl>Code</Hl> (8 bits, subcategory within the type), a <Hl>Checksum</Hl> (16 bits), and Type-specific data. Error messages also include the first 8 bytes of the original IP datagram's payload (to help the receiver identify which connection the error applies to). The most famous types: Type 8 (Echo Request — ping probe), Type 0 (Echo Reply — ping response), Type 11 (Time Exceeded — TTL expired, the basis of traceroute), Type 3 (Destination Unreachable — various subtypes).
      </P>

      <ICMPTypeTable />

      <HR />
      <Part n="02" title="Ping: Echo Request and Echo Reply" />

      <P>
        <Hl>Ping</Hl> sends ICMP Type 8 (Echo Request) packets to a destination and measures whether Type 0 (Echo Reply) packets come back, and how long they take. It's the most fundamental network diagnostic tool — if ping fails, you know connectivity is broken somewhere. If ping succeeds, you have a baseline for latency (Round Trip Time, RTT) and packet loss percentage.
      </P>

      <H>Reading Ping Output</H>
      <P>
        A typical ping output shows: <code style={{ fontSize: 13, background: `${N}15`, color: N, padding: '2px 6px', borderRadius: 4 }}>64 bytes from 8.8.8.8: icmp_seq=1 ttl=116 time=14.3 ms</code>. The <code style={{ fontSize: 13 }}>64 bytes</code> is the ICMP payload size. The <code style={{ fontSize: 13 }}>ttl=116</code> is the TTL remaining when the reply arrived — the original TTL (typically 64 or 128) minus the hops traversed (in this case, 128 − 116 = 12 hops). The <code style={{ fontSize: 13 }}>time</code> is the round-trip time.
      </P>
      <P>
        Increasing TTL values across successive pings (same destination) indicates route changes — ECMP hash variation or routing table updates. Jitter (high variance in RTT) indicates congestion or bufferbloat in the path. 100% packet loss with "Request timeout" usually means filtering (firewall blocking ICMP) rather than true unreachability — use traceroute to distinguish.
      </P>

      <Err title="Assuming 'ping fails = host is down'">
        Many security policies block ICMP Echo Requests on servers and firewalls to prevent reconnaissance. A host may be fully operational and serving TCP connections while blocking ping. Always verify with a service-specific test (TCP connect to a known open port, curl HTTP) before concluding a host is unreachable. Conversely, a host that responds to ping but fails TCP connections may have a firewall allowing ICMP but blocking the service port.
      </Err>

      <HR />
      <Part n="03" title="Traceroute: Mapping the Path" />

      <P>
        <Hl>Traceroute</Hl> discovers the sequence of routers (hops) between source and destination by exploiting the <Hl>TTL (Time-To-Live)</Hl> field in IP packets. Each router decrements the TTL by 1. When TTL reaches 0, the router discards the packet and sends back an ICMP Type 11 "Time Exceeded" message. The source IP of this ICMP error reveals the router's address.
      </P>
      <P>
        Traceroute starts by sending packets with TTL=1 (first hop router gets the error), then TTL=2 (second hop), then TTL=3, and so on until the destination is reached or the maximum TTL (30 hops by default) is exceeded. For each TTL value, traceroute sends three probes and reports the RTT for each.
      </P>
      <P>
        On Unix/Linux, traceroute uses <Hl>UDP</Hl> by default (sending to high port numbers unlikely to be open). The final destination sends ICMP Type 3 Code 3 "Port Unreachable" to indicate the trace is complete. On Windows, <code style={{ fontSize: 13 }}>tracert</code> uses <Hl>ICMP Echo Requests</Hl> instead. The <code style={{ fontSize: 13 }}>mtr</code> tool combines ping and traceroute, continuously probing each hop to measure sustained packet loss and jitter per hop.
      </P>

      <TracerouteSim />

      <H>Interpreting Traceroute Output</H>
      <P>
        <Hl>Stars (***)</Hl>: A hop doesn't respond — ICMP Time Exceeded is being filtered at that router. This doesn't mean traffic isn't flowing through it; many routers deprioritize ICMP replies from their own interfaces. If subsequent hops respond, the path is working. <Hl>RTT spikes at a single hop</Hl>: That router is rate-limiting ICMP responses, not congested. If all subsequent hops also have high RTT, there is actual congestion. <Hl>Increasing then decreasing RTT</Hl>: Classic sign of ECMP load balancing — packets are taking different paths.
      </P>

      <HR />
      <Part n="04" title="ICMP Type 3: Destination Unreachable" />

      <P>
        ICMP Type 3 is the most information-dense ICMP message. The Code field distinguishes 16 different reasons why a destination is unreachable. Most important for engineers:
      </P>
      <P>
        <Hl>Code 0 (Net Unreachable)</Hl>: A router has no route to the destination network. The most distant router with a partial routing table sends this. <Hl>Code 1 (Host Unreachable)</Hl>: The final-hop router can reach the network but can't find the host on it (ARP failed, host is down). <Hl>Code 3 (Port Unreachable)</Hl>: The host is reachable but no application is listening on the target UDP port. <Hl>Code 4 (Fragmentation Needed and DF Set)</Hl>: A router needs to fragment a packet but the Don't Fragment bit is set — this is the mechanism behind Path MTU Discovery. The ICMP message includes the MTU of the bottleneck link.
      </P>

      <H>Path MTU Discovery</H>
      <P>
        Modern stacks set the DF (Don't Fragment) bit and rely on ICMP Type 3 Code 4 responses to discover the maximum packet size for a path. If a router can't forward a packet without fragmenting and DF is set, it sends ICMP "Fragmentation Needed" with its link MTU. The source reduces its packet size and retries. This Path MTU Discovery (PMTUD) converges to the smallest MTU on the path. A common failure mode: firewalls that block all ICMP cause PMTUD to fail ("PMTUD black hole"), resulting in connections that establish fine (small packets like TCP SYN) but stall when sending bulk data (large packets that get silently dropped).
      </P>

      <ProTip>
        The classic PMTUD black hole symptom: SSH and HTTP work, but large file transfers or VPN tunnels stall after the initial handshake. Run <code style={{ fontSize: 12, background: `${N}15`, color: N, padding: '2px 5px', borderRadius: 4 }}>ping -M do -s 1472 [destination]</code> on Linux (sets DF bit, 1472 + 28 byte IP/ICMP header = 1500 MTU). If you get "Frag needed" errors back, PMTUD is working. If you get no response, the firewall is blocking ICMP and breaking PMTUD.
      </ProTip>

      <HR />
      <Part n="05" title="A Day in the Life: Diagnosing a Mysterious Timeout" />

      <TimeBlock time="3:00 PM" label="Alert: database queries timing out after ~2 MB of data">
        Application team reports: connections to the database establish fine, small queries succeed, but any query returning more than ~2 MB of results hangs until timeout. TCP connection shows as established. The database shows the query completes on its side but the app never receives the response.
      </TimeBlock>
      <TimeBlock time="3:15 PM" label="Hypothesis: MTU mismatch or PMTUD black hole">
        Symptoms match perfectly: small packets work (TCP handshake, small queries), large data transfers silently hang. Suspect a firewall or middlebox dropping large TCP segments or blocking ICMP fragmentation-needed messages.
      </TimeBlock>
      <TimeBlock time="3:22 PM" label="Test with ping DF bit">
        From the app server: <code style={{ fontSize: 12 }}>ping -M do -s 1400 db-primary</code> — success. <code style={{ fontSize: 12 }}>ping -M do -s 1472 db-primary</code> — success. <code style={{ fontSize: 12 }}>ping -M do -s 1480 db-primary</code> — no response. MTU somewhere on the path is 1480 + 28 = 1508 bytes? No, standard Ethernet is 1500. Run mtr to check each hop.
      </TimeBlock>
      <TimeBlock time="3:35 PM" label="Root cause found: IPsec VPN overhead">
        The database server was recently added behind an IPsec VPN tunnel with 60 bytes of overhead — effective MTU 1440. The server's NIC was sending 1500-byte frames, but the VPN tunnel was silently dropping them (DF bit set). ICMP fragmentation-needed messages were being blocked by the firewall. Fix: set TCP MSS clamping on the VPN interface to 1380, ensuring TCP negotiates smaller segment sizes. Large queries immediately begin working.
      </TimeBlock>

      <HR />
      <Part n="06" title="Interview Questions" />

      <IQ q="How does traceroute use TTL and ICMP to map a network path?">
        Traceroute exploits the TTL field in IP headers. Every router decrements TTL by 1; when TTL reaches 0, the router sends ICMP Type 11 "Time Exceeded" back to the source and discards the packet. Traceroute sends the first probe with TTL=1 — the first hop router returns ICMP Time Exceeded, revealing its IP. Then TTL=2 — the second hop responds. This continues until the destination is reached (which returns ICMP Port Unreachable on UDP probes, or Echo Reply on ICMP probes) or max-hops is exceeded. The RTT for each ICMP response is measured to build the hop-by-hop latency map.
      </IQ>

      <IQ q="What is Path MTU Discovery and why can firewalls break it?">
        PMTUD allows TCP stacks to discover the largest packet size that doesn't require fragmentation on a path. Modern OSes set the DF (Don't Fragment) bit and start with the local MTU (typically 1500 bytes). If a router on the path needs to fragment the packet but can't (DF set), it sends ICMP Type 3 Code 4 "Fragmentation Needed" with the link's MTU. The source reduces its packet size and retries. When firewalls block all ICMP (a misguided hardening practice), these fragmentation-needed messages never arrive, causing a PMTUD black hole: TCP connections establish fine (small SYN/SYN-ACK), but bulk data transfers silently stall when packets exceed the bottleneck MTU.
      </IQ>

      <IQ q="What does ICMP Type 3 Code 3 mean, and when would you see it?">
        ICMP Type 3 Code 3 is "Destination Port Unreachable" — the target host is reachable, but no application is listening on the specified UDP port. You see this when: (1) traceroute's UDP probes hit the final destination with no listening service on those high ports; (2) a DNS query goes to a host running no DNS server; (3) any UDP connection attempt to a closed port. Note that TCP has its own RST mechanism for closed ports, so you typically see ICMP Port Unreachable only for UDP. For TCP, a closed port returns RST directly in the TCP layer.
      </IQ>

      <HR />
      <Part n="07" title="Key Terminology" />
      <Term t="ICMP">Internet Control Message Protocol — Layer 3 feedback protocol for IP error reporting and diagnostics. Not a transport protocol.</Term>
      <Term t="Echo Request / Reply">ICMP Type 8 / Type 0 — the basis of ping. Request probes reachability; Reply confirms it with RTT measurement.</Term>
      <Term t="TTL">Time To Live — decremented by each router; when it reaches 0, the packet is dropped and ICMP Time Exceeded is sent back.</Term>
      <Term t="Time Exceeded">ICMP Type 11 — sent when TTL reaches 0 (Code 0) or fragment reassembly times out (Code 1). The backbone of traceroute.</Term>
      <Term t="Dest. Unreachable">ICMP Type 3 — various codes for network/host/port/protocol unreachable and fragmentation needed.</Term>
      <Term t="PMTUD">Path MTU Discovery — uses ICMP Type 3 Code 4 to find the minimum MTU along a path, enabling DF-bit TCP to avoid fragmentation.</Term>

      <KeyTakeaways items={[
        'ICMP is an error and diagnostic protocol for IP — not a transport. It reports failures and enables ping and traceroute.',
        'Ping uses ICMP Echo Request (Type 8) / Echo Reply (Type 0) to test reachability and measure RTT.',
        'Traceroute works by sending packets with incrementing TTL values; each router at TTL=0 sends ICMP Time Exceeded revealing its address.',
        'ICMP Type 3 Code 4 (Fragmentation Needed) enables Path MTU Discovery — blocking all ICMP breaks this and causes bulk transfer stalls.',
        'Stars (***) in traceroute mean ICMP Time Exceeded is filtered at that hop, not necessarily packet loss — if subsequent hops respond, the path is fine.',
        'Never block all ICMP at firewalls — specifically, always allow ICMP Type 3 Code 4 for PMTUD and Type 11 for traceroute diagnostic visibility.',
      ]} />
    </LearnLayout>
  )
}
