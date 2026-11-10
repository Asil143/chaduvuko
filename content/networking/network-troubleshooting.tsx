import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

const Chapter = ({ n, title }: { n: number; title: string }) => <div style={{ marginBottom: '0.25rem' }}><span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6366f1' }}>Chapter {n}</span><h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1e293b', margin: '0.25rem 0 0.75rem' }}>{title}</h2></div>
const Divider = () => <hr style={{ border: 'none', borderTop: '2px solid #e2e8f0', margin: '2.5rem 0' }} />
const Para = ({ children }: { children: React.ReactNode }) => <p style={{ lineHeight: 1.85, color: '#334155', marginBottom: '1rem', fontSize: '1.02rem' }}>{children}</p>
const CodeBlock = ({ children }: { children: React.ReactNode }) => <pre style={{ background: '#0f172a', color: '#e2e8f0', borderRadius: '10px', padding: '1.25rem 1.5rem', fontSize: '0.85rem', fontFamily: 'monospace', overflowX: 'auto', lineHeight: 1.7, margin: '1rem 0' }}><code>{children}</code></pre>
const Callout = ({ children }: { children: React.ReactNode }) => <div style={{ background: '#f0f9ff', border: '2px solid #0ea5e9', borderRadius: '12px', padding: '1.1rem 1.3rem', margin: '1.25rem 0', lineHeight: 1.8, color: '#0c4a6e' }}>{children}</div>
const Warn = ({ children }: { children: React.ReactNode }) => <div style={{ background: '#fffbeb', border: '2px solid #f59e0b', borderRadius: '12px', padding: '1.1rem 1.3rem', margin: '1.25rem 0', lineHeight: 1.8, color: '#78350f' }}>{children}</div>

export default function NetworkTroubleshooting() {
  return <LearnLayout title="Network Troubleshooting Methodology" description="A repeatable, evidence-led approach to isolating network faults by layer." section="Networking Fundamentals — Lesson 40" readTime="18–24 min">
    <Chapter n={1} title="Start with the Symptom, Not a Favorite Command" />
    <Para>A staff member says, “The app is down.” That statement is a symptom, not a diagnosis. Ask what is failing, for whom, since when, from which network, and whether the failure is complete or intermittent. A useful problem statement is: “Users on the office Wi-Fi cannot resolve the payroll hostname; wired users can; the issue began after a DNS configuration change at 09:20.”</Para>
    <Para>Build a simple path model: client, local link, gateway, DNS resolver, route, firewall, load balancer, service, and dependencies. Identify the last known-good hop and the first failing one. Record timestamps and exact errors before changing configuration. One change at a time makes cause and effect easier to understand.</Para>
    <Callout><strong>Prerequisites:</strong> OSI/TCP-IP layers, IP addressing, DNS, routes, ports, and basic command-line use. Work only on systems and networks you are authorised to troubleshoot.</Callout>
    <Divider />
    <Chapter n={2} title="Use a Layered, Evidence-Led Sequence" />
    <Para><strong>Physical/link:</strong> check Wi-Fi association, cable, interface state, speed/duplex, VLAN, and local error counters. <strong>Network:</strong> inspect address, prefix, gateway, route, and reachability. <strong>Name resolution:</strong> query the intended resolver and compare with a known-good name. <strong>Transport:</strong> test whether the expected port is reachable. <strong>Application:</strong> inspect TLS, HTTP status, server logs, and dependencies.</Para>
    <Para>A successful ping does not prove that a web service works: ICMP may be blocked, or the server may answer ICMP while its application is unhealthy. A failed ping does not prove the host is offline. Use the test that matches the suspected layer, and distinguish “not tested” from “failed.”</Para>
    <CodeBlock>{`# Read-only local checks (Linux examples)
ip -brief address
ip route
ip route get 10.20.4.15

# DNS: ask the intended resolver explicitly
getent hosts app.internal.example

# Test an application port you are authorised to access
curl -I --connect-timeout 3 https://app.example.test/health`}</CodeBlock>
    <Divider />
    <Chapter n={3} title="A Worked Case: Name Resolves, Connection Times Out" />
    <Para>Suppose a client can resolve <code>inventory.internal</code> to <code>10.20.4.15</code>, but its HTTPS request times out. DNS is less likely to be the immediate fault. Check the selected route, then whether the network path allows TCP/443, then whether the server is listening and healthy. If the route points at the expected VPN or gateway, compare from a second authorised client and review firewall logs for a matching timestamp and source/destination pair.</Para>
    <Para>If the TCP connection establishes but TLS fails, the problem has moved up the stack: check certificate validity, server name, supported protocol configuration, and any inspection proxy. If TLS works and the response is HTTP 503, investigate the application or an upstream dependency rather than changing the client's default route.</Para>
    <CodeBlock>{`# Decision record (fill with observed evidence)
DNS answer: 10.20.4.15 from resolver 10.20.0.53
Route: via wg0, source 10.8.0.24
TCP/443: timeout from client A; succeeds from client B
TLS: not reached on client A
Firewall log: pending lookup at 09:34Z
Current hypothesis: path or policy differs for client A`}</CodeBlock>
    <Divider />
    <Chapter n={4} title="Tools and Their Limits" />
    <Para><code>ping</code> checks ICMP echo when allowed; <code>traceroute</code> or <code>tracepath</code> infers hops from TTL behaviour, but routers may suppress or rate-limit responses. <code>dig</code> and <code>nslookup</code> query DNS. <code>ip</code> shows Linux addresses and routes; <code>ss</code> inspects sockets. Browser developer tools expose request timing and HTTP details. Packet capture can answer questions about an observed exchange, but it may contain private data and needs a narrow filter and authorised scope.</Para>
    <Para>Compare endpoints and time windows carefully. A test from a server room does not reproduce a home ISP path. A single traceroute is not a complete map because return paths may differ. Keep command output with timestamps and redact account names, cookies, tokens, and internal details before sharing it.</Para>
    <CodeBlock>{`# Useful read-only checks
ss -lnt                 # local listening TCP sockets
ip neigh show           # local neighbour cache
tracepath app.example.test

# Compare resolver answers with an approved resolver
dig app.example.test

dig @10.20.0.53 app.internal.example`}</CodeBlock>
    <Divider />
    <Chapter n={5} title="Escalate with a Useful Handoff" />
    <Para>A high-quality escalation includes impact, scope, start time, recent changes, exact reproduction steps, evidence gathered, and the next unanswered question. “Network issue” gives the next team no starting point. “Only Wi-Fi clients in building A fail; wired clients succeed; DNS is correct; TCP/443 times out; no local route change is present” directs investigation toward wireless-to-server policy or path differences.</Para>
    <Para>After restoration, identify the root cause and contributing conditions, not just the first alert. Add a monitoring signal or test that would have detected the issue earlier. Document the fix and remove temporary workarounds that could create a security or reliability problem.</Para>
    <Warn>Do not run broad scans, change production routes, disable firewalls, or capture all traffic as a first step. Use approved change controls and the least intrusive test that can answer the question.</Warn>
    <Divider />
    <Chapter n={6} title="Mistakes, Practice, and Review" />
    <Para><strong>Common mistakes:</strong> changing multiple settings simultaneously; treating ICMP as a complete health check; skipping timestamps; and assuming DNS is at fault whenever an application name is mentioned. Separate observations, hypotheses, and conclusions in your notes.</Para>
    <Para><strong>Practice:</strong> (1) Write a precise problem statement for “video meetings are choppy.” (2) Build a layer-by-layer test sequence for one client unable to open an internal dashboard. (3) Interpret the worked case and identify two next checks. (4) Draft a concise escalation note from your results. (5) List sensitive data to redact from a packet capture.</Para>
    <KeyTakeaways items={['Define impact, scope, start time, and exact symptoms before testing.','Trace the path from local link through routing, DNS, transport, TLS, application, and dependencies.','Choose a test for the layer in question; ping and traceroute each have important limitations.','Change one thing at a time and record observations separately from hypotheses.','Use least-intrusive, authorised diagnostics and protect data collected during troubleshooting.','A useful handoff includes evidence, scope, recent changes, and the next question—not just “the network is down.”']} />
    <p style={{ marginTop: '2rem' }}><a href="/learn/networking/wireshark" style={{ color: '#2563eb', fontWeight: 700 }}>Next: Lesson 41 · Wireshark →</a></p>
  </LearnLayout>
}
