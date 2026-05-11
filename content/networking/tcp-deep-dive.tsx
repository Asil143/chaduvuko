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

function TCPHandshakeSim() {
  const [step, setStep] = useState(0)

  const steps = [
    { from: 'Client', dir: '→', to: 'Server', flag: 'SYN', seq: 'seq=1000', ack: '', detail: 'Client picks a random Initial Sequence Number (ISN=1000). Sends SYN (synchronize) to start the handshake. No data yet.' },
    { from: 'Server', dir: '→', to: 'Client', flag: 'SYN-ACK', seq: 'seq=5000', ack: 'ack=1001', detail: 'Server picks its own ISN (5000) and ACKs the client\'s SYN with ack=1001 (client\'s ISN + 1). SYN-ACK confirms receipt.' },
    { from: 'Client', dir: '→', to: 'Server', flag: 'ACK', seq: 'seq=1001', ack: 'ack=5001', detail: 'Client ACKs server\'s SYN (ack=5001). Connection is now ESTABLISHED on both sides. Data can flow.' },
    { from: 'Client', dir: '→', to: 'Server', flag: 'PSH+ACK', seq: 'seq=1001', ack: 'ack=5001', detail: 'Client sends data (e.g., HTTP GET). PSH flag tells receiver to pass data to application immediately.' },
    { from: 'Server', dir: '→', to: 'Client', flag: 'ACK', seq: 'seq=5001', ack: 'ack=1201', detail: 'Server ACKs 200 bytes of data received (1001+200=1201). Sliding window: more data can be in flight simultaneously.' },
  ]

  const flagColors: Record<string, string> = { 'SYN': '#3b82f6', 'SYN-ACK': '#8b5cf6', 'ACK': N, 'PSH+ACK': '#f59e0b', 'FIN': '#ef4444', 'RST': '#ef4444' }

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: N, fontFamily: 'var(--font-mono)', margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '.1em' }}>TCP Handshake & Data Flow</p>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid var(--border)' }}>
        {['CLIENT', 'SERVER'].map(h => (
          <div key={h} style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 8, padding: '8px 20px', fontSize: 12, fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>{h}</div>
        ))}
      </div>

      <div style={{ minHeight: 200, marginBottom: 16 }}>
        {steps.slice(0, step).map((s, i) => (
          <div key={i} style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 12, color: 'var(--muted)', width: 50, textAlign: s.from === 'Client' ? 'left' : 'right' }}>{s.from === 'Client' ? '' : s.from}</span>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ height: 2, flex: 1, background: `${flagColors[s.flag] ?? N}40` }} />
                <code style={{ fontSize: 11, background: `${flagColors[s.flag] ?? N}20`, color: flagColors[s.flag] ?? N, padding: '2px 8px', borderRadius: 4, fontWeight: 700, flexShrink: 0 }}>{s.flag}</code>
                <code style={{ fontSize: 10, color: 'var(--muted)', flexShrink: 0 }}>{s.seq}{s.ack ? ` ${s.ack}` : ''}</code>
                <div style={{ height: 2, flex: 1, background: `${flagColors[s.flag] ?? N}40` }} />
              </div>
              <span style={{ fontSize: 12, color: 'var(--muted)', width: 50, textAlign: s.from === 'Client' ? 'right' : 'left' }}>{s.from === 'Server' ? '' : s.to}</span>
            </div>
            {i === step - 1 && (
              <div style={{ fontSize: 12, color: 'var(--text)', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 6, padding: '8px 12px', margin: '4px 0' }}>{s.detail}</div>
            )}
          </div>
        ))}
        {step === 0 && <div style={{ fontSize: 13, color: 'var(--muted)', textAlign: 'center', paddingTop: 60 }}>Press "Next" to step through the TCP handshake</div>}
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0} style={{ background: 'transparent', color: 'var(--muted)', border: '1px solid var(--border)', borderRadius: 6, padding: '7px 16px', fontSize: 13, cursor: step === 0 ? 'default' : 'pointer', opacity: step === 0 ? 0.4 : 1 }}>← Back</button>
        <button onClick={() => setStep(s => Math.min(steps.length, s + 1))} disabled={step >= steps.length} style={{ background: N, color: '#000', border: 'none', borderRadius: 6, padding: '7px 16px', fontSize: 13, fontWeight: 700, cursor: step >= steps.length ? 'default' : 'pointer', opacity: step >= steps.length ? 0.5 : 1 }}>Next →</button>
        <button onClick={() => setStep(0)} style={{ background: 'transparent', color: 'var(--muted)', border: '1px solid var(--border)', borderRadius: 6, padding: '7px 16px', fontSize: 13, cursor: 'pointer' }}>Reset</button>
      </div>
    </div>
  )
}

export default function TCPDeepDiveModule() {
  return (
    <LearnLayout
      title="TCP — Reliable Transport Deep Dive"
      description="TCP is the reason your file downloads complete, your API calls return data, and your SSH sessions stay up through packet loss. Understanding it deeply separates network engineers from network users."
      section="Networking Fundamentals"
      readTime="26 min"
      updatedAt="May 2026"
    >
      <Part n="01" title="What TCP Guarantees and How" />
      <P>
        <Hl>TCP (Transmission Control Protocol)</Hl>, defined in RFC 793 (1981), provides four guarantees that the underlying IP layer does not: <Hl>reliability</Hl> (every byte sent is acknowledged or retransmitted), <Hl>ordering</Hl> (bytes arrive at the application in the same order they were sent), <Hl>flow control</Hl> (the sender doesn't overwhelm the receiver), and <Hl>congestion control</Hl> (the sender doesn't overwhelm the network). These guarantees come at the cost of setup overhead (the 3-way handshake), per-segment acknowledgment processing, and head-of-line blocking (a lost segment stalls all subsequent segments behind it).
      </P>
      <P>
        TCP is a <Hl>byte-stream</Hl> protocol — it provides a continuous ordered stream of bytes, not a message protocol. If you write 100 bytes to a TCP socket, the application at the other end may receive them as one 100-byte read, or as two 50-byte reads, or as 100 one-byte reads. It's the application's responsibility to define message boundaries (HTTP uses headers + Content-Length; TLS uses record lengths; SSH uses its own framing). This is a common source of bugs for developers new to network programming.
      </P>

      <TCPHandshakeSim />

      <HR />
      <Part n="02" title="The 3-Way Handshake and Connection Teardown" />

      <H>3-Way Handshake</H>
      <P>
        Before any data is exchanged, TCP establishes a connection via a 3-way handshake: <Hl>SYN → SYN-ACK → ACK</Hl>. Each side picks a random <Hl>Initial Sequence Number (ISN)</Hl> — the randomness prevents spoofing attacks and avoids confusing old connections with new ones. The handshake synchronizes both sequence number spaces and confirms both sides can send and receive.
      </P>
      <P>
        After the handshake, both sides are in ESTABLISHED state. The client's sequence space starts at its ISN; the server's starts at its ISN. Every byte of data increments the sequence number, allowing the receiver to detect gaps (lost packets) and reorder out-of-order arrivals. ACK numbers tell the sender "I have received everything up to byte N; send me byte N+1."
      </P>

      <H>Graceful Teardown (FIN/ACK)</H>
      <P>
        TCP closes connections with a 4-way exchange: the side initiating close sends FIN (finished sending), the other side ACKs it (half-close — it can still send data in the other direction), eventually sends its own FIN when done, and receives the final ACK. This allows each side to finish sending its data before fully closing. The <Hl>TIME_WAIT</Hl> state — where a connection lingers for 2×MSL (Maximum Segment Lifetime, ~60 seconds to 4 minutes) after the final ACK — exists to absorb any delayed packets from the old connection that might otherwise confuse a new connection on the same 4-tuple.
      </P>
      <P>
        You'll frequently see thousands of TIME_WAIT connections on busy servers with <code style={{ fontSize: 13 }}>ss -s</code> or <code style={{ fontSize: 13 }}>netstat -s</code>. This is normal and expected — TIME_WAIT connections consume minimal resources on modern kernels. The issue arises only when TIME_WAIT connections exhaust the ephemeral port range on clients making many short-lived connections (e.g., a service making millions of outbound HTTP calls per hour).
      </P>

      <H>RST: Abrupt Reset</H>
      <P>
        The RST (Reset) flag abruptly terminates a connection without the graceful FIN exchange. Causes: connecting to a closed port (the server sends RST immediately), a firewall injecting RST to terminate connections matching a policy, a timeout expiry, or an application crashing. When you see "Connection reset by peer," a RST was received. This is distinctly different from "Connection refused" (RST to a SYN — port not open) and "Connection timed out" (no response — packet loss or firewall dropping silently).
      </P>

      <HR />
      <Part n="03" title="Sequence Numbers, ACKs, and Retransmission" />

      <H>Cumulative Acknowledgments</H>
      <P>
        TCP uses <Hl>cumulative ACKs</Hl> — the ACK number acknowledges all bytes received in order up to that point. If the receiver has bytes 1–1000 and 2001–3000 but is missing 1001–2000, it can only acknowledge 1000. The sender must retransmit from 1001. This is head-of-line blocking at the TCP level — all data after a gap must wait until the gap is filled.
      </P>
      <P>
        <Hl>Selective Acknowledgment (SACK)</Hl> — defined in RFC 2018 and enabled by default on modern OSes — extends cumulative ACKs with additional information: "I have bytes 2001–3000 even though I'm missing 1001–2000." The sender can then retransmit only the missing segment rather than everything from 1001 onward. SACK dramatically improves performance on high-loss links.
      </P>

      <H>Retransmission Timers</H>
      <P>
        TCP maintains an <Hl>RTO (Retransmission Timeout)</Hl> for each outstanding segment. If ACK is not received before RTO expires, the segment is retransmitted. RTO is calculated from RTT measurements using a smoothed average and variance (RFC 6298). If RTO fires, the next RTO doubles (exponential backoff) to avoid overwhelming a congested network. After multiple RTO doublings (typically 15 attempts over ~2 minutes), TCP gives up and the connection is declared dead.
      </P>
      <P>
        <Hl>Fast Retransmit</Hl>: If the sender receives 3 duplicate ACKs (the receiver kept ACKing the same sequence number because later segments arrived out of order but the one it's waiting for didn't), TCP retransmits the missing segment immediately without waiting for RTO. This is much faster than RTO-based recovery and is the standard behavior for single packet losses.
      </P>

      <HR />
      <Part n="04" title="Flow Control and Congestion Control" />

      <H>Flow Control: Receive Window</H>
      <P>
        The <Hl>receive window (rwnd)</Hl> in the TCP header tells the sender how many bytes the receiver's buffer can currently accept. The sender must not have more than rwnd bytes of unacknowledged data outstanding. If rwnd drops to 0, the sender stops sending and probes periodically with 1-byte probes until rwnd opens again. This prevents a fast sender from overwhelming a slow receiver.
      </P>
      <P>
        Modern kernels advertise large receive windows (1 MB+) and auto-tune buffer sizes. The Window Scale option (RFC 7323, negotiated during the handshake) allows window sizes larger than the original 65,535-byte limit — essential for high-bandwidth, high-latency links (e.g., a 10 Gbps link with 100 ms RTT requires a window of at least 10G × 0.1 = 1 GB of data in flight to keep the pipe full).
      </P>

      <H>Congestion Control</H>
      <P>
        <Hl>Congestion control</Hl> prevents the sender from overwhelming the network (distinct from flow control which prevents overwhelming the receiver). TCP uses several algorithms:
      </P>
      <P>
        <Hl>Slow Start</Hl>: At connection start, the sender begins with a small <em>congestion window (cwnd)</em> of 10 segments and doubles it every RTT — exponential growth until cwnd reaches ssthresh (slow start threshold) or packet loss occurs. <Hl>Congestion Avoidance</Hl>: After ssthresh, cwnd grows linearly (by 1 MSS per RTT). <Hl>Fast Recovery</Hl>: On 3 duplicate ACKs (fast retransmit), halve cwnd and enter congestion avoidance. <Hl>On RTO</Hl>: Reset cwnd to 1 and re-enter slow start — a much more aggressive reduction.
      </P>
      <P>
        Modern congestion control algorithms like <Hl>BBR (Bottleneck Bandwidth and RTT)</Hl> — developed by Google and now default in Linux — use a different approach: model the bottleneck bandwidth and RTT to keep the pipe full without creating a queue, achieving higher throughput and lower latency than loss-based algorithms (CUBIC, RENO) especially on long-fat networks.
      </P>

      <Err title="Confusing flow control with congestion control">
        Flow control (receive window, rwnd) is receiver-driven — the receiver tells the sender how much buffer space it has. Congestion control (congestion window, cwnd) is sender-driven — the sender limits itself to avoid overloading the network. The actual sending rate is constrained by min(rwnd, cwnd). Both can independently limit throughput, but they address different problems: rwnd prevents receiver buffer overflow; cwnd prevents network congestion.
      </Err>

      <HR />
      <Part n="05" title="TCP in Production: TIME_WAIT, Keep-Alive, and Tuning" />

      <H>TCP Keep-Alive</H>
      <P>
        TCP has no built-in heartbeat. A connection can remain in ESTABLISHED state indefinitely with no traffic — even if the remote host rebooted minutes ago. <Hl>TCP Keep-Alive</Hl> (enabled with <code style={{ fontSize: 13 }}>SO_KEEPALIVE</code> socket option) sends probes after a configurable idle period (default: 2 hours on Linux, controllable via <code style={{ fontSize: 13 }}>tcp_keepalive_time</code>). If no response is received after several probes, the connection is declared dead and an error is returned to the application. Keep-alive also keeps NAT translations alive.
      </P>

      <H>Nagle's Algorithm and TCP_NODELAY</H>
      <P>
        <Hl>Nagle's algorithm</Hl> coalesces small writes into fewer, larger segments — it buffers small data until either the previous outstanding ACK is received or enough data accumulates for a full-size segment. This improves efficiency for chatty protocols but adds latency for interactive applications. Real-time apps (SSH, gaming, financial trading) disable Nagle with <code style={{ fontSize: 13 }}>TCP_NODELAY</code> to eliminate this delay.
      </P>

      <ProTip>
        Check per-connection TCP stats with <code style={{ fontSize: 12, background: `${N}15`, color: N, padding: '2px 5px', borderRadius: 4 }}>ss -ti</code> on Linux — it shows rtt, rttvar, cwnd, ssthresh, bytes sent/received, retrans count, and unacked bytes. <code style={{ fontSize: 12, background: `${N}15`, color: N, padding: '2px 5px', borderRadius: 4 }}>ss -ti dst [ip]</code> filters to connections to a specific host. This is invaluable for diagnosing whether a slow connection is caused by packet loss (high retrans), buffer limits (cwnd or rwnd constrained), or just slow application logic.
      </ProTip>

      <HR />
      <Part n="06" title="A Day in the Life: The Slow File Transfer" />

      <TimeBlock time="10:00 AM" label="Application team: S3 uploads taking 40 seconds instead of 4">
        An application uploading 100 MB files to AWS S3 degraded from 4 seconds to 40 seconds overnight. No code changes. The network looks healthy — ping to S3 endpoint is 12 ms with 0% loss.
      </TimeBlock>
      <TimeBlock time="10:20 AM" label="Check TCP stats during a test upload">
        Run <code style={{ fontSize: 12 }}>ss -ti dst s3.amazonaws.com</code> during the upload. See <code style={{ fontSize: 12 }}>cwnd:10 ssthresh:7</code> — congestion window is tiny and ssthresh is even smaller. Something is triggering TCP slow start repeatedly. Retrans counter incrementing.
      </TimeBlock>
      <TimeBlock time="10:35 AM" label="Find the cause: a new security appliance in the path">
        The security team deployed a new inline IDS appliance yesterday at 11 PM. It's rewriting TCP headers and corrupting sequence numbers on some packets, causing spurious retransmissions. Every time TCP sees what it thinks is packet loss, it backs off to slow start and halves ssthresh. The uploads thrash in slow start for most of their duration.
      </TimeBlock>
      <TimeBlock time="11:00 AM" label="Workaround and long-term fix">
        Bypass the IDS for the specific S3 destination via policy-based routing temporarily. S3 uploads immediately return to 4 seconds. Long-term: configure the IDS to pass-through mode for outbound traffic to known-good cloud provider CIDRs, or upgrade its firmware to fix the TCP sequence number handling bug.
      </TimeBlock>

      <HR />
      <Part n="07" title="Interview Questions" />

      <IQ q="Explain TCP's 3-way handshake and why ISNs are chosen randomly.">
        SYN: the client sends a SYN with its random Initial Sequence Number (ISN). SYN-ACK: the server responds with its own random ISN and ACKs the client's ISN+1. ACK: the client ACKs the server's ISN+1. Connection is established. ISNs are random for two reasons: (1) security — a predictable ISN allows TCP hijacking attacks where a third party can forge segments with the correct sequence number; (2) avoiding confusion between new connections and delayed packets from old connections with the same source/destination port pair.
      </IQ>

      <IQ q="What's the difference between flow control and congestion control in TCP?">
        Flow control prevents the sender from overwhelming the receiver's buffer. The receiver advertises a receive window (rwnd) — the maximum number of unacknowledged bytes it can accept. If rwnd = 0, the sender stops. Congestion control prevents the sender from overwhelming the network. The sender maintains a congestion window (cwnd) and limits in-flight data to min(rwnd, cwnd). Congestion control responds to inferred network congestion (packet loss, ECN) by reducing cwnd. They're complementary: rwnd protects the endpoint; cwnd protects the network.
      </IQ>

      <IQ q="What causes TIME_WAIT and why is it necessary?">
        TIME_WAIT state on the active closer lasts 2×MSL (typically 60 s–4 min) after sending the final ACK. It's necessary for two reasons: (1) the final ACK might be lost — the remote side would retransmit its FIN, and the closer needs to still be able to ACK it. Without TIME_WAIT, the ACK would be gone and the peer would get RST instead. (2) Prevents confusion from delayed packets — a new connection on the same 4-tuple (src IP, src port, dst IP, dst port) could receive old packets still in transit. TIME_WAIT ensures those packets expire before the port is reused.
      </IQ>

      <HR />
      <Part n="08" title="Key Terminology" />
      <Term t="ISN">Initial Sequence Number — random starting sequence number chosen by each side during the 3-way handshake.</Term>
      <Term t="ACK">Acknowledgment — tells the sender which bytes have been received in order (cumulative ACK).</Term>
      <Term t="SACK">Selective ACK — extends cumulative ACK to report non-contiguous received segments, enabling targeted retransmission.</Term>
      <Term t="rwnd">Receive window — advertised by receiver; limits how much data can be in flight to prevent buffer overflow.</Term>
      <Term t="cwnd">Congestion window — maintained by sender; limits in-flight data to avoid overwhelming the network.</Term>
      <Term t="RTT / RTO">Round-Trip Time / Retransmission Timeout — RTO is calculated from RTT; doubles on timeout (exponential backoff).</Term>
      <Term t="TIME_WAIT">State after graceful close lasting 2×MSL; absorbs delayed packets and handles lost final ACK retransmission.</Term>

      <KeyTakeaways items={[
        'TCP guarantees reliability, ordering, flow control, and congestion control — at the cost of handshake overhead and head-of-line blocking.',
        'The 3-way handshake (SYN → SYN-ACK → ACK) synchronizes sequence numbers; ISNs are random to prevent spoofing.',
        'Cumulative ACKs mean a single lost segment stalls all data behind it; SACK enables targeted retransmission of only the lost segment.',
        'Flow control (rwnd) prevents receiver buffer overflow; congestion control (cwnd) prevents network overload. Effective rate = min(rwnd, cwnd).',
        'Fast Retransmit on 3 duplicate ACKs recovers from single packet loss without waiting for the retransmission timeout.',
        'TIME_WAIT is normal and necessary — it exists to handle lost final ACKs and absorb delayed packets from closed connections.',
      ]} />
    </LearnLayout>
  )
}
