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

const useCases = [
  { protocol: 'DNS', why: 'Query/response in single round-trip. Client retries on timeout. No need for persistent connection.' },
  { protocol: 'DHCP', why: 'Broadcast-based; no connection possible before having an IP address.' },
  { protocol: 'NTP', why: 'Time sync: single request/response, latency measurement is key, loss is tolerable.' },
  { protocol: 'VoIP / RTP', why: 'Real-time: old packets are useless. Better to skip a frame than wait for retransmission.' },
  { protocol: 'Online Gaming', why: 'Position updates obsolete in milliseconds. Fresh data beats guaranteed delivery.' },
  { protocol: 'Video Streaming', why: 'QUIC (UDP-based) preferred: no head-of-line blocking, faster recovery.' },
  { protocol: 'SNMP', why: 'Polling: simple request/response. Traps are fire-and-forget.' },
  { protocol: 'TFTP', why: 'Bootstrapping (PXE boot): works without full stack, implements own reliability.' },
  { protocol: 'QUIC / HTTP3', why: 'Transport-layer multiplexing without TCP head-of-line blocking.' },
]

function UDPVsTCPComparison() {
  const [scenario, setScenario] = useState<'video' | 'file' | 'dns'>('video')

  const scenarios = {
    video: {
      title: 'Video Call (VoIP/WebRTC)',
      tcp: { verdict: '❌ Poor', reason: 'A lost audio frame causes TCP to pause and retransmit. The audio arrives late and out of order — worse than dropping the frame. Head-of-line blocking makes jitter unpredictable.' },
      udp: { verdict: '✓ Ideal', reason: 'Lost frames are skipped or concealed by the codec. Real-time delivery is maintained. RTP (Real-time Transport Protocol) runs over UDP and handles its own sequencing for jitter compensation.' },
    },
    file: {
      title: 'File Transfer (1 GB)',
      tcp: { verdict: '✓ Ideal', reason: 'Every byte must arrive intact and in order. TCP retransmits lost segments automatically and provides flow control. The application receives a perfect copy of the file.' },
      udp: { verdict: '❌ Poor', reason: 'UDP provides no reliability. You would need to implement your own ACK system, retransmission, ordering, and flow control — essentially rebuilding TCP. Only worthwhile if you can make specific optimizations (like QUIC does).' },
    },
    dns: {
      title: 'DNS Query',
      tcp: { verdict: '⚠ Works but overkill', reason: 'DNS over TCP (DoT) works and is used for large responses (DNSSEC) and zone transfers. But the 3-way handshake adds 1.5× RTT before the query even begins — significant for sub-millisecond resolutions.' },
      udp: { verdict: '✓ Optimal', reason: 'DNS fits in a single UDP datagram (≤512 bytes traditional, ≤4096 bytes with EDNS0). Query + response = 1 RTT. The resolver retries on timeout. Simple, fast, stateless.' },
    },
  }

  const s = scenarios[scenario]

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: N, fontFamily: 'var(--font-mono)', margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '.1em' }}>TCP vs UDP: Which is Better?</p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {(Object.keys(scenarios) as (keyof typeof scenarios)[]).map(k => (
          <button key={k} onClick={() => setScenario(k)} style={{ background: scenario === k ? N : 'var(--bg)', color: scenario === k ? '#000' : 'var(--text)', border: `1px solid ${scenario === k ? N : 'var(--border)'}`, borderRadius: 6, padding: '7px 14px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>{scenarios[k].title.split(' ')[0]}</button>
        ))}
      </div>
      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>{s.title}</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {[['TCP', s.tcp], ['UDP', s.udp]].map(([name, data]) => {
          const d = data as { verdict: string; reason: string }
          const isGood = d.verdict.startsWith('✓')
          return (
            <div key={String(name)} style={{ background: isGood ? `${N}08` : '#ef444408', border: `1px solid ${isGood ? N : '#ef4444'}25`, borderRadius: 8, padding: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: isGood ? N : '#ef4444', marginBottom: 8 }}>{String(name)}: {d.verdict}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{d.reason}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function UDPModule() {
  return (
    <LearnLayout
      title="UDP — Fast and Simple Datagram Transport"
      description="UDP is not broken TCP. It's a deliberate design choice: when latency matters more than reliability, when the application handles its own error correction, or when you need broadcast or multicast."
      section="Networking Fundamentals"
      readTime="16 min"
      updatedAt="May 2026"
    >
      <Part n="01" title="UDP: What You Give Up and What You Gain" />
      <P>
        <Hl>UDP (User Datagram Protocol)</Hl>, defined in RFC 768 (1980), is 8 bytes of header: source port, destination port, length, checksum. No connection state. No sequence numbers. No acknowledgments. No retransmission. No flow control. No congestion control. The receiver has no way to ask for lost packets, no way to tell the sender to slow down, and packets may arrive out of order or not at all.
      </P>
      <P>
        This sounds like a failure. In reality it is a deliberate, carefully chosen design. UDP gives you: <Hl>zero setup latency</Hl> (no handshake — first packet carries data), <Hl>no head-of-line blocking</Hl> (lost packets don't stall later ones), <Hl>broadcast and multicast support</Hl> (TCP requires individual connections per destination), <Hl>stateless transport</Hl> (servers handle millions of clients without per-connection state), and <Hl>application-defined reliability</Hl> (the application can implement exactly the reliability it needs, no more).
      </P>
      <P>
        The insight behind UDP: TCP's reliability mechanisms are not always appropriate. If you're streaming live video and a frame arrives 200 ms late, you don't want it — you want the current frame. If you're querying DNS, you don't want a 3-way handshake before your 40-byte question. If you're building a custom protocol that runs over the internet, you might want to implement precisely tuned reliability, not TCP's one-size-fits-all approach.
      </P>

      <UDPVsTCPComparison />

      <HR />
      <Part n="02" title="UDP Header and Datagram Semantics" />

      <H>The 8-Byte Header</H>
      <P>
        The UDP header is the simplest transport header: <Hl>Source Port (16 bits)</Hl> — the sending application's port; <Hl>Destination Port (16 bits)</Hl> — the target application's port; <Hl>Length (16 bits)</Hl> — total length of UDP header + payload (maximum 65,535 bytes, constrained by IP fragmentation limits in practice); <Hl>Checksum (16 bits)</Hl> — optional in IPv4 (set to 0 to skip), mandatory in IPv6.
      </P>
      <P>
        Unlike TCP, UDP preserves <Hl>message boundaries</Hl>. Each <code style={{ fontSize: 13 }}>sendto()</code> call produces exactly one datagram; each <code style={{ fontSize: 13 }}>recvfrom()</code> call receives exactly one datagram. If you send 100 bytes in one call, the receiver gets 100 bytes in one call — you never get partial reads like with TCP streams. This makes UDP natural for request/response protocols where each message is self-contained.
      </P>

      <H>Checksum in UDP</H>
      <P>
        UDP's checksum covers the UDP header, payload, and a pseudo-header (source IP, dest IP, protocol, UDP length) from the IP header. In IPv4, a zero checksum disables verification — this was used in some legacy high-speed environments where the hardware guaranteed integrity. In IPv6, the checksum is mandatory because IPv6 removed the IP header checksum. On modern hardware, checksum computation is offloaded to the NIC at wire speed, so the overhead is negligible.
      </P>

      <HR />
      <Part n="03" title="Real-World UDP Applications" />

      <H>DNS: The Most Used UDP Application</H>
      <P>
        DNS queries and responses fit in a single UDP exchange for most lookups. The DNS resolver sends a query UDP datagram; the server responds with the answer in a single datagram. If no response arrives within a timeout (typically 5 seconds), the resolver retries (up to 3 times). If the response exceeds 512 bytes (or 4096 bytes with EDNS0), the server sets the TC (Truncated) flag and the client retries over TCP. This hybrid approach gives DNS the best of both worlds: UDP speed for normal queries, TCP reliability for large responses.
      </P>

      <H>VoIP and RTP</H>
      <P>
        Voice and video over IP use <Hl>RTP (Real-time Transport Protocol)</Hl> over UDP. RTP adds sequence numbers and timestamps on top of UDP — not for retransmission (retransmitting audio is useless), but for jitter compensation (reordering out-of-order packets in the playout buffer) and packet loss concealment (the codec interpolates missing frames). <Hl>RTCP (RTP Control Protocol)</Hl> provides quality statistics: packet loss percentage, jitter, delay. RTCP feedback allows the sender to adapt bitrate (WebRTC's adaptive bitrate control).
      </P>

      <H>QUIC: UDP-Based Transport for HTTP/3</H>
      <P>
        QUIC (RFC 9000), standardized in 2021, is Google's redesign of the transport layer running over UDP. QUIC provides all of TCP's reliability, ordering, and congestion control but adds: multiplexed streams without head-of-line blocking (a lost packet only stalls the one stream it belongs to, not all streams), built-in TLS 1.3 encryption (the crypto handshake is integrated, reducing round trips), connection migration (a connection survives IP address changes — phone switching from Wi-Fi to cellular), and 0-RTT resumption for reconnecting to known servers. HTTP/3 mandates QUIC as its transport.
      </P>

      <H>Common UDP Services</H>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 10, margin: '16px 0 24px' }}>
        {useCases.map(u => (
          <div key={u.protocol} style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 16px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: N, fontFamily: 'var(--font-mono)', marginBottom: 4 }}>{u.protocol}</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>{u.why}</div>
          </div>
        ))}
      </div>

      <Err title="UDP amplification in DDoS attacks">
        UDP's stateless nature enables amplification attacks. An attacker sends a small spoofed UDP request (forging the source IP to the victim) to a server that returns a large response. DNS, NTP, SSDP, Memcached, and others have been used this way — a 1-byte NTP MONLIST request returns thousands of bytes. Mitigation: BCP38 (anti-spoofing filters at network edges), rate-limiting UDP responses, disabling amplifiable commands (NTP MONLIST, DNS ANY queries).
      </Err>

      <HR />
      <Part n="04" title="A Day in the Life: Game Server Latency Investigation" />

      <TimeBlock time="7:00 PM" label="Player complaints: lag spikes every 2-3 seconds">
        A competitive gaming server shows 200–300 ms latency spikes every 2–3 seconds for ~100ms each. Background: the game uses UDP for state updates (10 packets/second per player, each ~200 bytes).
      </TimeBlock>
      <TimeBlock time="7:20 PM" label="Packet capture reveals the pattern">
        Run tcpdump on the game server. See UDP game packets flowing normally, then suddenly a burst of large UDP packets (1400 bytes each) every 2–3 seconds from a different source port — a background telemetry process sending analytics data via UDP. The ISP's QoS policy is rate-limiting all UDP from this server during those bursts, hitting game packets too.
      </TimeBlock>
      <TimeBlock time="7:35 PM" label="Mark game traffic with DSCP for QoS prioritization">
        Configure the game server to mark game UDP packets with DSCP EF (Expedited Forwarding — highest priority) using <code style={{ fontSize: 12 }}>setsockopt(SO_PRIORITY)</code>. Configure the router to honor DSCP EF and place game packets in a priority queue. Move telemetry to TCP on a different port so it's clearly differentiated. Lag spikes disappear.
      </TimeBlock>

      <HR />
      <Part n="05" title="Interview Questions" />

      <IQ q="When would you choose UDP over TCP, and what reliability mechanisms would you add?">
        Choose UDP when: (1) latency is more important than guaranteed delivery — live video/audio where retransmitting stale data is worse than dropping it; (2) broadcast or multicast is needed — TCP requires per-connection state; (3) the application implements its own reliability better suited to its semantics (QUIC, DNS retry logic); (4) stateless request/response (DNS, NTP) where a handshake is wasteful overhead. Reliability mechanisms to add: sequence numbers for ordering and loss detection, ACK/NACK for acknowledged delivery, timeouts and retransmission for reliability (what QUIC and SCTP implement on top of UDP), FEC (Forward Error Correction) for low-latency loss recovery without retransmission (used in RTP for video).
      </IQ>

      <IQ q="How does DNS use both UDP and TCP?">
        DNS uses UDP by default: query and response fit in a single datagram exchange (1 RTT, no handshake). If the response is truncated (TC bit set, response exceeds EDNS0 buffer size of typically 4096 bytes), the client retries over TCP for reliable large-response delivery. DNS zone transfers (AXFR/IXFR) always use TCP since they transfer entire zone databases. DNS over TLS (DoT, port 853) and DNS over HTTPS (DoH, port 443) use TCP with encryption for privacy. Modern resolvers implement RFC 7766 which keeps TCP connections open for multiple queries to amortize handshake cost.
      </IQ>

      <IQ q="What is a UDP amplification attack?">
        An attacker spoofs a victim's IP address as the source and sends small UDP requests to services that return disproportionately large responses (DNS, NTP, SSDP, Memcached). The amplified responses flood the victim's IP, which never sent the original requests. NTP MONLIST returns up to 4,096 bytes per 8-byte request — 500× amplification. Mitigations: (1) BCP38 ingress filtering at ISPs to drop packets with spoofed source IPs; (2) rate-limiting UDP response size; (3) disabling amplifiable features (NTP MONLIST, DNS ANY); (4) scrubbing centers that absorb volumetric DDoS.
      </IQ>

      <HR />
      <Part n="06" title="Key Terminology" />
      <Term t="UDP">User Datagram Protocol — connectionless, unreliable, unordered 8-byte header transport. Fast, stateless.</Term>
      <Term t="Datagram">Self-contained UDP message; each send/receive preserves message boundaries unlike TCP streams.</Term>
      <Term t="RTP">Real-time Transport Protocol — adds sequence numbers and timestamps to UDP for audio/video jitter management.</Term>
      <Term t="QUIC">UDP-based transport protocol providing TCP-like reliability with multiplexing, 0-RTT, and connection migration. Used by HTTP/3.</Term>
      <Term t="BCP38">Best Current Practice 38 — anti-spoofing filter: ISPs drop packets with source IPs not owned by the originating network.</Term>

      <KeyTakeaways items={[
        'UDP provides source port, destination port, length, and checksum — nothing else. No connection, no reliability, no ordering.',
        'UDP preserves message boundaries: one sendto() = one datagram; TCP is a byte stream with no inherent message boundaries.',
        'Choose UDP when latency matters more than reliability (VoIP, gaming), for broadcast/multicast, or when the app implements custom reliability.',
        'DNS, DHCP, NTP, SNMP, and TFTP all use UDP for low-overhead single-round-trip exchanges.',
        'QUIC (HTTP/3) runs over UDP but implements TCP-like reliability, plus multiplexing without head-of-line blocking and 0-RTT.',
        'UDP\'s statelessness enables amplification DDoS attacks; mitigate with BCP38 anti-spoofing and response-rate limiting.',
      ]} />
    </LearnLayout>
  )
}
