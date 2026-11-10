import Link from 'next/link'
import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import { Callout } from '@/components/content/Callout'

const C = '#4285f4'
const Part = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section style={{ marginBottom: 44 }}>
    <h2 style={{ color: C, fontSize: 22, fontWeight: 700, marginBottom: 14 }}>{title}</h2>
    {children}
  </section>
)
const H = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ color: 'var(--heading)', fontSize: 17, fontWeight: 650, margin: '24px 0 8px' }}>{children}</h3>
)
const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ color: 'var(--text)', fontSize: 15, lineHeight: 1.9, marginBottom: 14 }}>{children}</p>
)
const Block = ({ children }: { children: React.ReactNode }) => (
  <pre style={{ background: 'var(--code-bg)', border: '1px solid var(--border)', borderRadius: 8, padding: '16px 20px', fontSize: 13, lineHeight: 1.8, whiteSpace: 'pre-wrap', overflowX: 'auto', marginBottom: 18 }}>{children}</pre>
)
const Hl = ({ children }: { children: React.ReactNode }) => <strong style={{ color: C }}>{children}</strong>

export default function Module42() {
  return (
    <LearnLayout
      title="Packet Analysis with Wireshark"
      description="Use Wireshark and tshark to inspect authorised captures, follow TCP streams, and recognise network behaviours that merit defensive investigation."
      section="Cybersecurity — Lesson 42"
      readTime="40 min"
    >
      <Part title="A Packet Capture Is Evidence, Not a Verdict">
        <P>Wireshark decodes captured traffic into protocol layers so an analyst can ask who communicated, when, using which protocol, and what was visible. A capture is a partial view: encryption, packet loss, capture location, network address translation, and clock differences all affect interpretation. Start with a question and note capture limits before drawing conclusions.</P>
        <P>Use a supplied training trace or capture only on your own lab network or a network you are explicitly authorised to monitor. Packet captures can contain personal data, session tokens, or credentials. Store them securely, restrict access, and follow retention and incident-handling procedures.</P>
      </Part>

      <Part title="Capture Filters and Display Filters">
        <P><Hl>Capture filters</Hl> (BPF syntax) decide what to save while recording; <Hl>display filters</Hl> narrow packets already in the capture using Wireshark's richer syntax. A display filter does not delete packets from the file.</P>
        <Block>{`Capture-filter examples (set before starting a capture):
  host 192.0.2.10
  tcp port 443
  udp port 53

Display-filter examples (apply to an opened capture):
  dns
  ip.addr == 192.0.2.10
  tcp.port == 443
  tcp.flags.syn == 1 && tcp.flags.ack == 0
  http.request
  tcp.stream == 7`}</Block>
        <P>The address 192.0.2.10 is from a documentation-only range; substitute a lab address only when you have permission. If a capture filter seems to exclude expected traffic, check whether you chose the right interface, address family, and BPF expression. Verify the capture before relying on it as evidence.</P>
      </Part>

      <Part title="Follow TCP Streams and Inspect Protocol Context">
        <P>Choose a TCP packet and use <Hl>Follow → TCP Stream</Hl> to reconstruct the conversation in sequence. Wireshark applies a stream filter, colours each direction, and presents reassembled application data when available. This is useful for understanding request/response exchanges and confirming whether a protocol is encrypted.</P>
        <P>Reassembly depends on having the relevant packets and a recognisable protocol. A missing handshake, truncated capture, retransmission, or asymmetric capture can make a stream incomplete. HTTPS/TLS content remains encrypted unless you have an authorised decryption setup and the required secrets; do not treat unreadable payload as suspicious by itself.</P>
        <H>Read the layers before the payload</H>
        <P>Check timestamps, source/destination addresses and ports, TCP flags and sequence behaviour, DNS questions and answers, and protocol metadata. Use packet details and byte views to confirm the decode rather than assuming a port number guarantees a particular application protocol.</P>
      </Part>

      <Part title="Patterns Worth Investigating">
        <H>DNS tunnelling indicators</H>
        <P>Look for an unusual volume of queries from one host, long or high-entropy subdomain labels, repeated uncommon query types, and a concentration on one domain. These are <Hl>indicators, not proof</Hl>: software updates, service discovery, and security products can produce unusual DNS. Correlate with resolver logs, host process telemetry, domain history, and a known-good baseline. Do not send test queries to domains you do not own.</P>
        <H>Possible port scanning</H>
        <P>A host sending many initial TCP SYN packets to different destination ports in a short period, especially with few completed handshakes, may indicate a scan. Distinguish an authorised inventory scanner or health check from unapproved activity by checking asset ownership, change windows, destination scope, and scan schedules. The same pattern can arise from retries or misconfigured monitoring.</P>
        <H>Cleartext credential exposure</H>
        <P>Some legacy or misconfigured protocols can expose usernames, passwords, or session data in readable payloads. Treat a capture containing credentials as sensitive evidence—do not paste it into tickets or public tools. Notify the responsible security and service teams through approved channels, restrict access to the trace, and remediate with an encrypted protocol. Inspect only controlled training traffic or evidence you are authorised to review.</P>
      </Part>

      <Part title="Command-Line Review with tshark">
        <P><Hl>tshark</Hl> is Wireshark's terminal packet analyser. These examples read a capture you are authorised to examine; they do not initiate network activity.</P>
        <Block>{`# Read a capture and display DNS packets
  tshark -r training.pcapng -Y 'dns'

# Show selected fields from DNS requests
  tshark -r training.pcapng -Y 'dns.flags.response == 0' \\
    -T fields -e frame.time -e ip.src -e dns.qry.name

# Limit output to initial TCP SYN packets
  tshark -r training.pcapng \\
    -Y 'tcp.flags.syn == 1 && tcp.flags.ack == 0'`}</Block>
        <P>Use field names supported by your installed Wireshark version; check <code>tshark -G fields</code> or the local manual when a field is unknown. Keep the original trace unchanged, note tool/version and filter used, and save derived output separately in the approved case workspace.</P>
      </Part>

      <KeyTakeaways items={[
        'Capture filters reduce what is recorded; display filters select what is shown from a saved trace.',
        'Following a TCP stream helps reconstruct a conversation but cannot restore packets that were never captured.',
        'Interpret DNS patterns, SYN bursts, and readable payloads as leads that require context and corroboration.',
        'Encryption and capture placement limit visibility; a port number alone does not establish application identity.',
        'Treat packet captures as sensitive evidence and investigate only authorised systems and traces.',
        'tshark can filter and extract fields from an existing capture reproducibly; preserve the original evidence.',
      ]} />

      <Callout type="info">
        <strong>Up Next — Lesson 43: Digital Forensics Basics</strong><br />
        Learn to preserve evidence, acquire images safely, verify hashes, and build timelines from memory, disk, and system artefacts.{' '}
        <Link href="/learn/cybersecurity/digital-forensics-basics" style={{ color: C, fontWeight: 700 }}>Continue to Lesson 43 →</Link>
      </Callout>
    </LearnLayout>
  )
}
