import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

const Chapter = ({ n, title }: { n: number; title: string }) => <div style={{ marginBottom: '0.25rem' }}><span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6366f1' }}>Chapter {n}</span><h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1e293b', margin: '0.25rem 0 0.75rem' }}>{title}</h2></div>
const Divider = () => <hr style={{ border: 'none', borderTop: '2px solid #e2e8f0', margin: '2.5rem 0' }} />
const Para = ({ children }: { children: React.ReactNode }) => <p style={{ lineHeight: 1.85, color: '#334155', marginBottom: '1rem', fontSize: '1.02rem' }}>{children}</p>
const CodeBlock = ({ children }: { children: React.ReactNode }) => <pre style={{ background: '#0f172a', color: '#e2e8f0', borderRadius: '10px', padding: '1.25rem 1.5rem', fontSize: '0.85rem', fontFamily: 'monospace', overflowX: 'auto', lineHeight: 1.7, margin: '1rem 0' }}><code>{children}</code></pre>
const Callout = ({ children }: { children: React.ReactNode }) => <div style={{ background: '#f0f9ff', border: '2px solid #0ea5e9', borderRadius: '12px', padding: '1.1rem 1.3rem', margin: '1.25rem 0', lineHeight: 1.8, color: '#0c4a6e' }}>{children}</div>
const Warn = ({ children }: { children: React.ReactNode }) => <div style={{ background: '#fffbeb', border: '2px solid #f59e0b', borderRadius: '12px', padding: '1.1rem 1.3rem', margin: '1.25rem 0', lineHeight: 1.8, color: '#78350f' }}>{children}</div>

export default function Wireshark() {
  return <LearnLayout title="Wireshark — Packet Analysis Complete Guide" description="Capture safely, filter effectively, and reason from packet evidence." section="Networking Fundamentals — Lesson 41" readTime="22–30 min">
    <Chapter n={1} title="A Packet Analyzer Is a Microscope" />
    <Para>Wireshark captures packets from an interface or reads a saved capture file, then decodes protocol fields into a searchable view. It is useful when counters and logs tell you that something failed but not what exchanged on the wire. A packet capture is evidence, not an automatic explanation: you still need a question, a time range, and an understanding of expected protocol behaviour.</Para>
    <Para>Start with a narrow question: “Did this client send a DNS query to the expected resolver?” or “Which side closed this TCP connection first?” Avoid collecting everything by default. Captures can include personal data, internal addresses, cookies, credentials sent by insecure protocols, and confidential payloads.</Para>
    <Callout><strong>Prerequisites:</strong> Ethernet, IP, TCP/UDP, DNS, HTTP, and TLS basics. Capture only traffic on systems and networks you own or are explicitly authorised to inspect.</Callout>
    <Divider />
    <Chapter n={2} title="Capture Filters and Display Filters" />
    <Para>A <strong>capture filter</strong> is applied while recording and limits what enters the file; it uses the Berkeley Packet Filter (BPF) syntax shared with tools such as tcpdump. A <strong>display filter</strong> is applied after capture and hides nonmatching packets from the current view without deleting them. Use a display filter to explore; use a capture filter when minimising collection is important.</Para>
    <CodeBlock>{`# BPF capture filter examples
host 127.0.0.1
port 53
host 127.0.0.1 and port 8080

# Wireshark display filter examples
dns
ip.addr == 127.0.0.1 && tcp.port == 8080
tcp.flags.syn == 1 && tcp.flags.ack == 0
http.response.code >= 400`}</CodeBlock>
    <Para>Filter expressions are protocol-aware: <code>tcp.port == 443</code> matches a TCP port, while HTTPS may use other transports. A filter that returns nothing can mean the wrong interface, wrong time window, no traffic, or a syntax mistake. Confirm the capture itself before concluding that a packet never existed.</Para>
    <Divider />
    <Chapter n={3} title="Read a TCP Conversation" />
    <Para>Use packet details to inspect layers from frame through link, IP, transport, and application protocol. For TCP, look for the handshake, sequence and acknowledgement numbers, retransmissions, window updates, FIN, and RST. The “Follow TCP Stream” view reconstructs application bytes for that connection when they are available. It cannot reveal encrypted TLS application content without authorised decryption material and an appropriate setup.</Para>
    <Para>Timing is often more useful than payload. A long gap before a SYN-ACK may suggest a path, firewall, or server delay; repeated retransmissions can indicate loss; an immediate RST indicates a different failure than a timeout. Compare both directions where possible and remember that asymmetric routing or capture loss may make one side incomplete.</Para>
    <CodeBlock>{`# Generate a small, local HTTP exchange in a controlled lab
python3 -m http.server 8080 --bind 127.0.0.1

# In another terminal, request only the local test server
curl -I http://127.0.0.1:8080/

# Then inspect: SYN, SYN/ACK, ACK, HTTP request, response, close`}</CodeBlock>
    <Divider />
    <Chapter n={4} title="A Practical Analysis Workflow" />
    <Para>Record the problem statement, interface, start and stop times, capture filter, and clock source. Reproduce one small exchange if safe. First identify endpoints and protocols, then narrow to a conversation, then inspect fields and timing. Save a filtered copy only when needed, and keep the original evidence protected. Add notes describing what the capture can and cannot show.</Para>
    <Para>For a DNS issue, check query name and type, resolver address, response code, and response time. For a TCP issue, identify where the handshake stops. For TLS, inspect ClientHello/server-name metadata and alert/handshake completion where visible, but do not assume encrypted application data is readable.</Para>
    <Callout>Capture display timestamps can be affected by clock drift, packet buffering, and capture location. Synchronise clocks and avoid comparing millisecond timing across unsynchronised devices.</Callout>
    <Divider />
    <Chapter n={5} title="Capture Hygiene and Limitations" />
    <Para>Use the smallest capture scope that answers your question, store files with restrictive permissions, define retention, and redact or securely transfer approved extracts. A SPAN port or virtual interface can drop packets under load. Wi-Fi monitor-mode visibility differs from normal client capture, and encryption limits payload interpretation. Offloads such as segmentation and checksum calculation can make host captures look different from packets on the physical wire.</Para>
    <Para>Do not use “Follow Stream” on data you are not authorised to view. Be particularly careful with unencrypted protocols and TLS key logs. If a team needs decryption for a legitimate investigation, use an approved, documented process that protects keys and limits access.</Para>
    <Warn>Packet captures can be credentials. Never attach a raw pcap to a public issue or unapproved ticket. Verify the destination, minimise contents, and dispose of the file according to policy.</Warn>
    <Divider />
    <Chapter n={6} title="Mistakes, Practice, and Review" />
    <Para><strong>Common mistakes:</strong> confusing capture and display filters; assuming an empty filtered view means no traffic; interpreting host-offload artefacts as wire corruption; and sharing unredacted capture files. Another error is treating one packet or one trace as definitive without checking the full conversation and capture point.</Para>
    <Para><strong>Practice:</strong> (1) Capture a local HTTP request and identify the TCP handshake. (2) Write a display filter for DNS failures. (3) Explain why a TCP retransmission does not by itself identify the faulty hop. (4) Compare a capture filter with an equivalent display filter. (5) Draft a safe handling checklist for a pcap that may contain personal data.</Para>
    <KeyTakeaways items={['Wireshark decodes packet evidence; it does not replace a clear troubleshooting question.','Capture filters limit collection; display filters only change what is visible in the current view.','TCP flags, sequence numbers, retransmissions, and timing can reveal where a conversation stalled.','TLS payload is encrypted; visible metadata and timing do not equal application content.','Capture point, packet drops, offloads, clock accuracy, and asymmetric routing shape what you observe.','Minimise, protect, redact, and retain pcaps under an authorised data-handling process.']} />
    <p style={{ marginTop: '2rem' }}><a href="/learn/networking/tcpdump" style={{ color: '#2563eb', fontWeight: 700 }}>Next: Lesson 42 · tcpdump →</a></p>
  </LearnLayout>
}
