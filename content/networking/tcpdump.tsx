import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

const Chapter = ({ n, title }: { n: number; title: string }) => <div style={{ marginBottom: '0.25rem' }}><span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6366f1' }}>Chapter {n}</span><h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1e293b', margin: '0.25rem 0 0.75rem' }}>{title}</h2></div>
const Divider = () => <hr style={{ border: 'none', borderTop: '2px solid #e2e8f0', margin: '2.5rem 0' }} />
const Para = ({ children }: { children: React.ReactNode }) => <p style={{ lineHeight: 1.85, color: '#334155', marginBottom: '1rem', fontSize: '1.02rem' }}>{children}</p>
const CodeBlock = ({ children }: { children: React.ReactNode }) => <pre style={{ background: '#0f172a', color: '#e2e8f0', borderRadius: '10px', padding: '1.25rem 1.5rem', fontSize: '0.85rem', fontFamily: 'monospace', overflowX: 'auto', lineHeight: 1.7, margin: '1rem 0' }}><code>{children}</code></pre>
const Callout = ({ children }: { children: React.ReactNode }) => <div style={{ background: '#f0f9ff', border: '2px solid #0ea5e9', borderRadius: '12px', padding: '1.1rem 1.3rem', margin: '1.25rem 0', lineHeight: 1.8, color: '#0c4a6e' }}>{children}</div>
const Warn = ({ children }: { children: React.ReactNode }) => <div style={{ background: '#fffbeb', border: '2px solid #f59e0b', borderRadius: '12px', padding: '1.1rem 1.3rem', margin: '1.25rem 0', lineHeight: 1.8, color: '#78350f' }}>{children}</div>

export default function Tcpdump() {
  return <LearnLayout title="tcpdump — Command-Line Packet Capture" description="Capture scoped network evidence with tcpdump and read packet summaries." section="Networking Fundamentals — Lesson 42" readTime="16–22 min">
    <Chapter n={1} title="Small, Fast, and Close to the Interface" />
    <Para><code>tcpdump</code> captures packets from a network interface, applies a BPF filter, and prints a concise decode or writes a pcap file. It is valuable on remote Linux systems where a graphical analyzer is unavailable. The same discipline applies as with Wireshark: define an authorised scope, ask a specific question, and minimise what you collect.</Para>
    <Para>Most live captures require elevated privileges because packet capture accesses network interfaces. Use the least privilege available, ask an administrator when needed, and avoid leaving broad capture processes running. Never capture traffic from a network or device without permission.</Para>
    <Callout><strong>Prerequisites:</strong> interface names, Ethernet/IP/TCP/UDP, ports, and basic shell quoting. Filter expressions are BPF syntax; quote them so the shell passes the complete expression to tcpdump.</Callout>
    <Divider />
    <Chapter n={2} title="Select Interface and Scope" />
    <Para>First inspect available interfaces. Use the loopback interface for a local lab exchange, or a specific approved interface for an investigation. The <code>-n</code> option avoids DNS and service-name lookups, keeping output predictable and reducing extra traffic. A short packet limit or time-bounded capture is safer than an indefinite session.</Para>
    <CodeBlock>{`# List capture interfaces (may require elevated privileges)
sudo tcpdump -D

# Inspect only a local test service on loopback; stop after a small sample
sudo tcpdump -i lo0 -nn -c 20 'host 127.0.0.1 and port 8080'

# Linux often names loopback "lo"; confirm with the interface list first`}</CodeBlock>
    <Para>Interface names differ across operating systems and containers. Capturing on “any” can combine multiple interfaces and create duplicate-looking packets or different link-layer details. Choose the narrowest interface that can observe the path you care about.</Para>
    <Divider />
    <Chapter n={3} title="Build and Reason About BPF Filters" />
    <Para>BPF uses primitives such as <code>host</code>, <code>net</code>, <code>port</code>, <code>tcp</code>, and <code>udp</code>. Combine them with <code>and</code>, <code>or</code>, and <code>not</code>. Parentheses control grouping; single-quote the expression to keep the shell from interpreting punctuation. Begin broad enough to see the expected exchange, then narrow deliberately.</Para>
    <CodeBlock>{`# Common, read-only capture scopes
sudo tcpdump -i lo0 -nn 'udp port 53'
sudo tcpdump -i lo0 -nn 'tcp port 8080'
sudo tcpdump -i lo0 -nn 'host 127.0.0.1 and (tcp port 8080 or tcp port 8443)'
sudo tcpdump -i lo0 -nn 'icmp and host 127.0.0.1'

# Capture only headers in summary; avoid payload collection where possible
sudo tcpdump -i lo0 -nn -c 25 -s 96 'host 127.0.0.1 and port 8080'`}</CodeBlock>
    <Para>A snap length limits captured bytes per packet; it does not guarantee that the retained headers are sufficient for every protocol. Set the value to the minimum needed, and do not assume truncation eliminates all sensitive data. Test your filter in a controlled lab before relying on it during an incident.</Para>
    <Divider />
    <Chapter n={4} title="Write, Read, and Share Capture Files" />
    <Para>Use <code>-w</code> to save a pcap and <code>-r</code> to read it. Capture files should have restrictive permissions and an explicit retention plan. A bounded packet count or duration helps prevent filling a disk. Include a clear filename, case identifier, time zone, interface, and filter in the evidence notes rather than relying on the filename alone.</Para>
    <CodeBlock>{`# Save a narrowly scoped local lab capture
sudo tcpdump -i lo0 -nn -c 50 -w local-test.pcap 'host 127.0.0.1 and port 8080'

# Read it later; -nn keeps addresses and ports numeric
tcpdump -nn -r local-test.pcap

# Summarise packets to standard output without changing the saved evidence
tcpdump -nn -r local-test.pcap 'tcp[tcpflags] & tcp-syn != 0'`}</CodeBlock>
    <Para>Opening a pcap in Wireshark supports protocol dissection and stream analysis. The file may contain more than the summary printed to the terminal. Treat it as sensitive, verify its hash if chain-of-custody matters, and transfer it only through approved channels.</Para>
    <Divider />
    <Chapter n={5} title="Operational Caveats" />
    <Para>Capture loss may occur under load; tcpdump reports packet statistics on exit, which should be included in the interpretation. Host offload features, virtual interfaces, container networking, and asymmetric routes can affect what appears. A capture on the sender may show packets before a network device drops them; capture at a receiver or approved tap can answer a different question.</Para>
    <Para>For a safe lab workflow, start a local test server and send a request only to loopback. Do not copy commands that capture all interfaces or unfiltered payloads from examples into production. Be especially careful with passwords and session tokens on plaintext protocols.</Para>
    <CodeBlock>{`# Reproduce a harmless local exchange
python3 -m http.server 8080 --bind 127.0.0.1

# Separate terminal
curl -I http://127.0.0.1:8080/

# Filter to this loopback address and port; inspect only the evidence needed`}</CodeBlock>
    <Warn>Do not capture all traffic with a broad “any” interface filter unless an approved incident plan requires it. Confirm scope, duration, output path, permissions, and cleanup before starting.</Warn>
    <Divider />
    <Chapter n={6} title="Mistakes, Practice, and Review" />
    <Para><strong>Common mistakes:</strong> forgetting <code>-n</code> and creating confusing name lookups; using an interface name that does not exist on the host; leaving a capture unbounded; and saving a full pcap in a world-readable directory. If no packets appear, validate the interface and filter using a harmless known exchange.</Para>
    <Para><strong>Practice:</strong> (1) List interfaces and identify loopback on your OS. (2) Capture a local HTTP request with a host-and-port filter. (3) Read the pcap and identify the handshake. (4) Explain when a snap length is useful and what it does not guarantee. (5) Write evidence notes with capture point, time, scope, and packet-drop count.</Para>
    <KeyTakeaways items={['tcpdump is a command-line packet capture and BPF filtering tool; choose interface and scope deliberately.','Use quoted, narrow filters and numeric output for predictable, low-noise diagnostics.','Bound captures by time or packet count, and minimise payload with an appropriate snap length.','Use -w and -r for controlled pcap workflows; saved files remain sensitive even if terminal output is brief.','Capture point, offloads, asymmetric paths, and packet drops affect conclusions.','Restrict privileges, permissions, retention, and sharing; practice only on authorised traffic.']} />
    <p style={{ marginTop: '2rem' }}><a href="/learn/networking/nmap" style={{ color: '#2563eb', fontWeight: 700 }}>Next: Lesson 43 · Nmap →</a></p>
  </LearnLayout>
}
