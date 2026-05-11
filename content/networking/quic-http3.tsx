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

function HOLBlockingDemo() {
  const [lostStream, setLostStream] = useState<number | null>(null)

  const streams = [
    { id: 1, name: 'HTML page', chunks: [1, 2, 3, 4, 5] },
    { id: 2, name: 'CSS file', chunks: [1, 2, 3] },
    { id: 3, name: 'JS bundle', chunks: [1, 2, 3, 4, 5, 6] },
    { id: 4, name: 'Image', chunks: [1, 2, 3, 4] },
  ]

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: N, fontFamily: 'var(--font-mono)', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '.1em' }}>Head-of-Line Blocking Demo</p>
      <p style={{ fontSize: 13, color: 'var(--muted)', margin: '0 0 16px' }}>Click a stream to simulate a packet loss. See how TCP/HTTP2 stalls everything vs QUIC/HTTP3 which only stalls the affected stream.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        {['TCP/HTTP2', 'QUIC/HTTP3'].map(proto => (
          <div key={proto}>
            <div style={{ fontSize: 12, fontWeight: 700, color: proto.startsWith('TCP') ? '#ef4444' : N, fontFamily: 'var(--font-mono)', marginBottom: 10 }}>{proto}</div>
            {streams.map(s => {
              const isLost = s.id === lostStream
              const isBlocked = proto.startsWith('TCP') && lostStream !== null && s.id !== lostStream
              return (
                <div key={s.id} onClick={() => setLostStream(isLost ? null : s.id)} style={{ cursor: 'pointer', marginBottom: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                    <span style={{ fontSize: 11, color: isBlocked ? '#ef4444' : isLost ? '#f59e0b' : 'var(--muted)' }}>
                      {s.name} {isBlocked ? '(blocked by loss)' : isLost ? '(lost packet)' : ''}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: 3 }}>
                    {s.chunks.map((_, ci) => (
                      <div key={ci} style={{ flex: 1, height: 8, borderRadius: 2, background: isBlocked ? '#ef444430' : isLost && ci === 2 ? '#f59e0b' : isLost && ci > 2 ? `${N}30` : N, transition: 'background .2s' }} />
                    ))}
                  </div>
                </div>
              )
            })}
            {lostStream !== null && (
              <div style={{ marginTop: 8, fontSize: 12, color: proto.startsWith('TCP') ? '#ef4444' : N }}>
                {proto.startsWith('TCP') ? '⚠ All streams paused waiting for retransmission' : '✓ Only stream ' + lostStream + ' paused; others continue'}
              </div>
            )}
          </div>
        ))}
      </div>
      {lostStream !== null && <button onClick={() => setLostStream(null)} style={{ background: 'transparent', color: 'var(--muted)', border: '1px solid var(--border)', borderRadius: 6, padding: '6px 14px', fontSize: 12, cursor: 'pointer' }}>Clear</button>}
    </div>
  )
}

export default function QUICHTTPThreeModule() {
  return (
    <LearnLayout
      title="QUIC and HTTP/3 — The Web's New Transport"
      description="Google built QUIC when they realized TCP itself was the bottleneck. HTTP/3 mandates it. Understand why multiplexing over TCP is fundamentally broken and how QUIC fixes it."
      section="Networking Fundamentals"
      readTime="20 min"
      updatedAt="May 2026"
    >
      <Part n="01" title="Why TCP Needed Replacing" />
      <P>
        HTTP/2 (2015) introduced multiplexing — multiple HTTP requests and responses over a single TCP connection, eliminating the need for multiple parallel TCP connections. This seemed like a major improvement over HTTP/1.1's connection-per-request model. There was one fundamental problem: <Hl>TCP is a byte stream</Hl>. All HTTP/2 streams share a single TCP connection, and if one TCP segment is lost, all streams must pause and wait for the retransmission — even streams that have nothing to do with the lost segment. This is <Hl>head-of-line blocking at the transport layer</Hl>.
      </P>
      <P>
        HTTP/2 fixed HTTP-level head-of-line blocking but exposed TCP-level head-of-line blocking. On lossy networks (mobile, satellite, congested Wi-Fi), HTTP/2 can actually be slower than HTTP/1.1 with multiple connections because HTTP/1.1's multiple TCP connections are independent — one stall doesn't affect others.
      </P>
      <P>
        The deeper problem: TCP is implemented in OS kernels. Changing TCP behavior requires OS updates across billions of devices — a process that takes years. The internet's "ossification" from network middleboxes (firewalls, NATs, load balancers) that assume TCP semantics made even incremental TCP improvements nearly impossible to deploy.
      </P>

      <HOLBlockingDemo />

      <HR />
      <Part n="02" title="What QUIC Is" />

      <P>
        <Hl>QUIC (Quick UDP Internet Connections)</Hl>, standardized as RFC 9000 (2021), is a new transport protocol running over UDP. Google developed it starting in 2012 and deployed it across all Google properties before standardization. By 2022, it handled ~70% of Google's traffic. Key properties:
      </P>

      <H>Stream Multiplexing Without Head-of-Line Blocking</H>
      <P>
        QUIC implements multiple independent streams over one UDP connection. A lost UDP datagram only stalls the stream whose data was in that datagram — other streams continue flowing. This is the core fix: stream-level independence that TCP's single byte-stream fundamentally cannot provide.
      </P>

      <H>Built-in TLS 1.3</H>
      <P>
        TLS is not added on top of QUIC like it is with TCP (where TLS runs as an application-layer protocol over the TCP stream). In QUIC, TLS 1.3 is integrated into the QUIC handshake. The crypto handshake and transport handshake happen simultaneously. A new QUIC connection to a known server takes <Hl>1 RTT</Hl> before data flows. To a previously visited server, <Hl>0-RTT resumption</Hl> allows sending application data with the first packet — no round trip at all.
      </P>

      <H>Connection Migration</H>
      <P>
        TCP connections are tied to a 4-tuple (src IP, src port, dst IP, dst port). When a phone switches from Wi-Fi to cellular, its IP address changes — the TCP connection breaks and must be re-established. QUIC connections use a <Hl>Connection ID</Hl> — a random value that identifies the connection independent of IP addresses. When the IP changes, QUIC transparently migrates the connection without the application layer knowing. Seamless continuation of streaming, calls, and downloads through network transitions.
      </P>

      <H>Improved Congestion Control</H>
      <P>
        QUIC's congestion control runs entirely in user space, not the kernel. This means it can be updated and deployed with application updates rather than OS releases. Google ships BBR and other experimental algorithms in QUIC, iterating much faster than kernel TCP changes would allow.
      </P>

      <HR />
      <Part n="03" title="HTTP/3: HTTP over QUIC" />

      <P>
        <Hl>HTTP/3</Hl> (RFC 9114, 2022) is HTTP/2's semantics running over QUIC instead of TCP+TLS. The HTTP/2 frame format was adapted for QUIC streams. Major differences from HTTP/2:
      </P>
      <P>
        <Hl>No more TCP head-of-line blocking</Hl>: Each HTTP request/response pair maps to a separate QUIC stream. Packet loss in one request doesn't affect others. <Hl>Faster connection establishment</Hl>: 1 RTT for QUIC + TLS vs 3 RTTs for TCP + TLS 1.2 (TCP SYN/SYN-ACK/ACK + TLS 2×RTT). <Hl>Header compression via QPACK</Hl>: HTTP/2 used HPACK which had ordering dependencies (another form of head-of-line blocking); QPACK is designed for independent stream processing. <Hl>Connection migration</Hl>: Inherited from QUIC — connections survive IP address changes.
      </P>

      <H>Alt-Svc and Protocol Negotiation</H>
      <P>
        How does a browser know a server supports HTTP/3? The server includes an <code style={{ fontSize: 13 }}>Alt-Svc</code> header (or HTTPS DNS record) in its HTTP/1.1 or HTTP/2 response: <code style={{ fontSize: 13, background: `${N}15`, color: N, padding: '2px 6px', borderRadius: 4 }}>Alt-Svc: h3=":443"; ma=86400</code>. On the next request, the browser tries QUIC/HTTP3 on port 443. If QUIC is blocked (common in some enterprise networks), the browser falls back to TCP. Chrome uses the Connection Coalescing mechanism to race H2 and H3 connections and use the first to establish.
      </P>

      <H>Deployment Reality</H>
      <P>
        As of 2026, HTTP/3 is supported by Chrome, Firefox, Safari, and Edge. Nginx (1.25+) and Caddy support HTTP/3. AWS CloudFront, Cloudflare, and Google Cloud CDN serve HTTP/3 by default. Deployment challenges: some enterprise firewalls block UDP on port 443, forcing HTTP/2 fallback. Some network QoS configurations treat QUIC UDP differently from TCP HTTPS. The gradual shift continues, but HTTP/3 is increasingly the default for major web properties.
      </P>

      <ProTip>
        Check if a site supports HTTP/3: <code style={{ fontSize: 12, background: `${N}15`, color: N, padding: '2px 5px', borderRadius: 4 }}>curl -I --http3 https://cloudflare.com</code> (requires curl with HTTP/3 support). Or check the browser's dev tools Network panel — protocol column shows "h3" for HTTP/3 connections. In Wireshark, QUIC traffic appears as UDP on port 443.
      </ProTip>

      <HR />
      <Part n="04" title="Interview Questions" />

      <IQ q="Explain TCP head-of-line blocking and how QUIC solves it.">
        TCP is a byte stream: all data in a connection arrives in sequence. HTTP/2 multiplexes multiple streams over one TCP connection — if a TCP segment carrying data for stream A is lost, all streams (B, C, D) must wait for the retransmission, even though they have nothing to do with stream A. This is TCP-level head-of-line blocking. QUIC runs multiple streams over UDP independently. A lost UDP datagram only stalls the stream whose data was in that datagram. Other streams have their own QUIC stream state and continue flowing. The key insight: QUIC streams are logically independent; TCP's single byte-stream cannot separate them.
      </IQ>

      <IQ q="How does QUIC achieve 0-RTT connection establishment?">
        On a first connection, QUIC requires 1 RTT (ClientHello with key share → ServerHello+cert+Finished → client Finished, data can start). On reconnection, the client stores a Pre-Shared Key (PSK) from the previous session. On the next connection, the client includes application data encrypted with the PSK in its very first packet — 0-RTT. The server decrypts and processes this data before completing the handshake. Caveat: 0-RTT data is replay-safe only for idempotent operations — an attacker could replay 0-RTT data to trigger the same server action again. RFC 9001 recommends applications treat 0-RTT data as potentially replayed.
      </IQ>

      <IQ q="Why did QUIC choose UDP as its transport instead of extending TCP?">
        TCP is implemented in OS kernels, and changing it requires OS-wide updates — a multi-year process across billions of devices. Network middleboxes (firewalls, NATs, load balancers) have hard-coded assumptions about TCP behavior and would break or block unknown TCP extensions. Running QUIC over UDP allows it to be deployed as a user-space library, updated with application releases (Chrome, for example, ships QUIC with each browser update). UDP is just a datagram wrapper that network infrastructure passes through. QUIC implements all the reliability, ordering, and congestion control that TCP provides — it just does it in user space where it can evolve rapidly.
      </IQ>

      <HR />
      <Part n="05" title="Key Terminology" />
      <Term t="QUIC">UDP-based transport protocol: stream multiplexing, built-in TLS 1.3, 0-RTT, connection migration. RFC 9000.</Term>
      <Term t="HTTP/3">HTTP over QUIC. Eliminates TCP head-of-line blocking. Uses QPACK instead of HPACK for header compression.</Term>
      <Term t="HOL Blocking">Head-of-Line Blocking — one lost/delayed packet stalls all subsequent data (TCP), or all streams (HTTP/2 over TCP).</Term>
      <Term t="Connection ID">QUIC identifier for a connection independent of IP address — enables transparent migration when IP changes.</Term>
      <Term t="0-RTT">QUIC resumption where application data is sent in the first packet using a cached Pre-Shared Key from a prior session.</Term>
      <Term t="QPACK">HTTP/3 header compression — handles independent streams without HPACK's ordering dependency.</Term>

      <KeyTakeaways items={[
        'HTTP/2 multiplexing over TCP still suffers from TCP-level head-of-line blocking: one lost segment stalls all streams.',
        'QUIC runs over UDP, implementing its own reliable streams — a lost packet only stalls the stream whose data was lost.',
        'QUIC integrates TLS 1.3 into its handshake: 1 RTT for new connections, 0-RTT for known servers.',
        'QUIC Connection IDs allow connections to survive IP address changes — seamless Wi-Fi to cellular transitions.',
        'HTTP/3 = HTTP/2 semantics over QUIC instead of TCP+TLS. Supported by all major browsers and CDNs.',
        'QUIC runs in user space, allowing rapid iteration without OS kernel updates — the key to its fast deployment.',
      ]} />
    </LearnLayout>
  )
}
