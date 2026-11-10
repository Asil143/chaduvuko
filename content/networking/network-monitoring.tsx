import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

const Chapter = ({ n, title }: { n: number; title: string }) => <div style={{ marginBottom: '0.25rem' }}><span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6366f1' }}>Chapter {n}</span><h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1e293b', margin: '0.25rem 0 0.75rem' }}>{title}</h2></div>
const Divider = () => <hr style={{ border: 'none', borderTop: '2px solid #e2e8f0', margin: '2.5rem 0' }} />
const Para = ({ children }: { children: React.ReactNode }) => <p style={{ lineHeight: 1.85, color: '#334155', marginBottom: '1rem', fontSize: '1.02rem' }}>{children}</p>
const CodeBlock = ({ children }: { children: React.ReactNode }) => <pre style={{ background: '#0f172a', color: '#e2e8f0', borderRadius: '10px', padding: '1.25rem 1.5rem', fontSize: '0.85rem', fontFamily: 'monospace', overflowX: 'auto', lineHeight: 1.7, margin: '1rem 0' }}><code>{children}</code></pre>
const Callout = ({ children }: { children: React.ReactNode }) => <div style={{ background: '#f0f9ff', border: '2px solid #0ea5e9', borderRadius: '12px', padding: '1.1rem 1.3rem', margin: '1.25rem 0', lineHeight: 1.8, color: '#0c4a6e' }}>{children}</div>
const Warn = ({ children }: { children: React.ReactNode }) => <div style={{ background: '#fffbeb', border: '2px solid #f59e0b', borderRadius: '12px', padding: '1.1rem 1.3rem', margin: '1.25rem 0', lineHeight: 1.8, color: '#78350f' }}>{children}</div>

export default function NetworkMonitoring() {
  return <LearnLayout title="Network Monitoring — NetFlow, SNMP Polling, Dashboards" description="Build useful network telemetry, baselines, dashboards, and actionable alerts." section="Networking Fundamentals — Lesson 44" readTime="16–22 min">
    <Chapter n={1} title="Observability Means Knowing What Changed" />
    <Para>Monitoring answers three operational questions: is the network healthy now, how is it changing, and what should an operator do when it degrades? One green dashboard is not enough. Network visibility combines device health, interface counters, flow records, logs, synthetic checks, and user-facing service indicators.</Para>
    <Para>Use a hierarchy: <strong>metrics</strong> quantify state over time; <strong>logs</strong> record discrete events; <strong>flows</strong> summarise conversations; and <strong>traces</strong> follow an application request through services. Network engineers frequently combine these to understand whether latency arose on a link, a firewall, DNS, or an application dependency.</Para>
    <Callout><strong>Prerequisites:</strong> SNMP and Syslog, interfaces, byte counters, routing, and basic time-series dashboards. Monitoring only works when clocks, labels, and ownership are reliable.</Callout>
    <Divider />
    <Chapter n={2} title="Polling, Events, and Flow Data" />
    <Para>SNMP polling periodically queries devices for counters and health values. A time series is produced by sampling counters and calculating the difference between samples; counter resets and wraparound must be handled correctly. Traps or informs send event notifications, but should supplement polling because an event can be lost or its receiver can be unavailable.</Para>
    <Para>NetFlow, IPFIX, and sFlow provide summaries of traffic conversations or sampled packets. They can show top talkers, protocol mix, and traffic direction without storing every payload. Flow records are not packet captures: they omit content and may be sampled. Treat source/destination addresses and application labels as sensitive operational data.</Para>
    <CodeBlock>{`# Counter-to-rate calculation
# Counter delta is bytes transferred between two successful polls.
bytes_per_second = (current_octets - previous_octets) / elapsed_seconds
bits_per_second = bytes_per_second * 8

# Utilisation needs a known interface capacity
utilisation_percent = 100 * bits_per_second / interface_capacity_bps
# Handle counter reset/wrap and invalid elapsed time before alerting.`}</CodeBlock>
    <Divider />
    <Chapter n={3} title="Build Useful Metrics and Baselines" />
    <Para>Start with service-level indicators that operators can act on: interface utilisation, errors and discards, packet loss, round-trip latency, DNS success, tunnel state, routing adjacency, and service probe success. Store device, interface, site, environment, and direction as consistent labels. Avoid an unbounded label such as full URL or arbitrary user ID, which can create huge storage and privacy risks.</Para>
    <Para>Baselines vary by time of day, region, and business event. A fixed threshold is useful for hard limits, but an increase in bandwidth alone may be normal during an enrollment deadline. Pair thresholds with trend context, dependency state, and an owner. Dashboards should have a question: “Which site has rising packet loss?” is better than a wall of unrelated graphs.</Para>
    <CodeBlock>{`# Example alert definition (conceptual)
alert: sustained-interface-errors
when: increase(interface_errors_total[5m]) > 0
for: 10m
labels:
  severity: warning
annotations:
  summary: "Interface errors persist on {{ device }} / {{ interface }}"
  action: "Check optics, cabling, peer counters, and recent changes"
`}</CodeBlock>
    <Divider />
    <Chapter n={4} title="Alerting and On-Call Quality" />
    <Para>An alert should be actionable, timely, and routed to the team that can respond. Include affected resource, impact, likely next check, runbook, and severity. Deduplicate correlated symptoms: one failed upstream link may trigger dozens of downstream alerts, but operators need one clear incident with related evidence rather than a flood of pages.</Para>
    <Para>Use warning thresholds for early investigation and paging thresholds for user-impacting or rapidly worsening conditions. Review alert noise, false positives, and missed incidents after each event. Alert on symptoms (service probe failures, packet loss) as well as causes (interface errors) so a silent monitoring gap does not look like health.</Para>
    <Callout>Monitoring has its own failure modes. Check telemetry freshness, poller health, trap receiver availability, time synchronisation, and dashboard permissions—not just the devices being monitored.</Callout>
    <Divider />
    <Chapter n={5} title="Security, Retention, and Operational Hygiene" />
    <Para>Use SNMPv3 with authentication and privacy where supported, restrict management access to dedicated collectors, and make read-only the default. Protect API tokens and dashboard accounts with least privilege. Encrypt telemetry in transit and at rest according to its sensitivity, define retention, and audit exports. Monitoring data can reveal network topology and user behaviour even when it contains no packet payload.</Para>
    <Para>Document which counters come from which device model, how interface capacity is obtained, and how inventory changes propagate into labels. Validate a new device in a test environment and compare reported counters against known traffic. Monitor the monitoring pipeline, since stale data can lead to incorrect incident decisions.</Para>
    <Warn>Do not expose management protocols or dashboards to the public internet for convenience. Use approved management networks, access controls, and secure remote administration.</Warn>
    <Divider />
    <Chapter n={6} title="Mistakes, Practice, and Review" />
    <Para><strong>Common mistakes:</strong> charting raw monotonically increasing counters as though they were rates; alerting on every brief threshold crossing; treating sampled flow data as complete packet truth; and ignoring telemetry freshness. Label cardinality and retention can become cost and reliability problems if left unplanned.</Para>
    <Para><strong>Practice:</strong> (1) Calculate interface utilisation from two counter samples and a link capacity. (2) Sketch a dashboard for a campus with three sites. (3) Write an alert with a clear action and deduplication key. (4) Identify sensitive fields in flow records. (5) Design a check that detects a silent monitoring collector failure.</Para>
    <KeyTakeaways items={['Combine metrics, logs, flows, and synthetic checks to understand both infrastructure and user impact.','SNMP polling provides sampled counters; event notifications supplement but do not replace polling.','Convert counter deltas to rates carefully, handling resets, wraparound, and elapsed time.','Use consistent labels, meaningful baselines, bounded cardinality, and dashboards built around operator questions.','Alerts need owners, impact, runbooks, deduplication, and continuous tuning.','Secure and monitor the telemetry pipeline itself; flow and inventory data can expose sensitive topology.']} />
    <p style={{ marginTop: '2rem' }}><a href="/learn/networking/load-balancers-and-reverse-proxies" style={{ color: '#2563eb', fontWeight: 700 }}>Next: Lesson 45 · Load Balancers and Reverse Proxies →</a></p>
  </LearnLayout>
}
