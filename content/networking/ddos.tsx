import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

const Chapter = ({ n, title }: { n: number; title: string }) => <div style={{ marginBottom: '0.25rem' }}><span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6366f1' }}>Chapter {n}</span><h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1e293b', margin: '0.25rem 0 0.75rem' }}>{title}</h2></div>
const Divider = () => <hr style={{ border: 'none', borderTop: '2px solid #e2e8f0', margin: '2.5rem 0' }} />
const Para = ({ children }: { children: React.ReactNode }) => <p style={{ lineHeight: 1.85, color: '#334155', marginBottom: '1rem', fontSize: '1.02rem' }}>{children}</p>
const CodeBlock = ({ children }: { children: React.ReactNode }) => <pre style={{ background: '#0f172a', color: '#e2e8f0', borderRadius: '10px', padding: '1.25rem 1.5rem', fontSize: '0.85rem', fontFamily: 'monospace', overflowX: 'auto', lineHeight: 1.7, margin: '1rem 0' }}><code>{children}</code></pre>
const Callout = ({ children }: { children: React.ReactNode }) => <div style={{ background: '#f0f9ff', border: '2px solid #0ea5e9', borderRadius: '12px', padding: '1.1rem 1.3rem', margin: '1.25rem 0', lineHeight: 1.8, color: '#0c4a6e' }}>{children}</div>
const Warn = ({ children }: { children: React.ReactNode }) => <div style={{ background: '#fffbeb', border: '2px solid #f59e0b', borderRadius: '12px', padding: '1.1rem 1.3rem', margin: '1.25rem 0', lineHeight: 1.8, color: '#78350f' }}>{children}</div>

export default function Ddos() {
  return <LearnLayout title="DDoS — How It Works and How to Defend Against It" description="Recognize denial-of-service patterns and design layered, tested mitigation." section="Networking Fundamentals — Lesson 39" readTime="18–24 min">
    <Chapter n={1} title="Availability Is a Security Property" />
    <Para>A denial-of-service (DoS) event makes a service unavailable or too slow for legitimate users. A distributed denial-of-service (DDoS) event uses many sources, often compromised devices or abused third-party infrastructure, making simple source blocking ineffective. A food-delivery app can have intact servers yet fail when its upstream link, DNS provider, database connection pool, or payment dependency is overwhelmed.</Para>
    <Para>Defensive analysis asks where capacity is exhausted and whether the traffic is distinguishable from legitimate demand. The goal is not just to “block bad IPs”; it is to preserve critical functions, involve upstream providers quickly, and avoid causing more harm through a poorly scoped mitigation.</Para>
    <Callout><strong>Prerequisites:</strong> bandwidth, packets per second, TCP handshakes, DNS, HTTP request rates, load balancing, and basic monitoring. DDoS readiness is an architecture and incident-response exercise, not a single firewall setting.</Callout>
    <Divider />
    <Chapter n={2} title="Three Broad Attack Classes" />
    <Para><strong>Volumetric events</strong> consume link capacity with a large byte rate. <strong>Protocol/state exhaustion</strong> consumes connection tables, CPU, or other finite state in network devices. <strong>Application-layer events</strong> send requests that may look valid but make expensive work occur in the application or its dependencies. Real incidents can combine classes and shift as defenses adapt.</Para>
    <Para>Reflection and amplification abuse a third-party service that returns a larger response than the initiating request. Source-address spoofing can make those responses head toward a victim. The lesson for service owners is to reduce exposed reflectors in networks they operate, use ingress/egress anti-spoofing practices, and coordinate with providers; do not generate or reproduce such traffic.</Para>
    <CodeBlock>{`# Read-only incident snapshot fields to collect
window_start: 10:00Z
window_end: 10:05Z
edge_bytes_per_second: baseline_vs_current
edge_packets_per_second: baseline_vs_current
http_requests_per_second: baseline_vs_current
connection_errors: baseline_vs_current
regions_or_points_of_presence: affected
upstream_provider_ticket: reference-id`}</CodeBlock>
    <Divider />
    <Chapter n={3} title="Distinguish a Surge from a Failure" />
    <Para>Compare traffic against normal baselines by bytes, packets, new connections, request paths, status codes, geography, client reputation, and business events. A festival sale or examination-results release can create a genuine spike. Indicators such as repeated expensive endpoints, abnormal connection churn, broad geographic distribution, or an unusual protocol mix are evidence to investigate, not proof by themselves.</Para>
    <Para>Trace the dependency chain. Is the public edge receiving traffic but origin health normal? Are application workers busy, or is a database pool exhausted? Did a recent release create a slow query? Logs can be incomplete during saturation, so retain independent provider telemetry and synthetic health checks from multiple regions.</Para>
    <CodeBlock>{`# Example baseline comparison (CSV columns)
minute,requests_per_second,baseline_rps,p95_latency_ms,error_rate
10:00,820,760,140,0.008
10:01,24800,770,1900,0.41
10:02,25120,765,2100,0.44

# Compare multiple signals; one metric alone is not a diagnosis`}</CodeBlock>
    <Divider />
    <Chapter n={4} title="Layered Mitigation and Resilience" />
    <Para>Move filtering as close to the traffic source as possible. An application firewall or rate limiter at the origin cannot restore a saturated access link; upstream scrubbing, CDN/edge services, or provider support may be required. At the application layer, protect costly routes with quotas, bounded work, caching, queues, and graceful degradation. At the network layer, use capacity planning, resilient DNS, redundant paths, and provider escalation contacts.</Para>
    <Para>Rate limits must account for shared NATs, mobile networks, and legitimate bursts. Use multiple dimensions such as account, token, endpoint, and time window rather than treating a source IP as a user. Preserve critical tasks: a read-only status page, queued order processing, or reduced-feature mode may keep the service useful while expensive functions are paused.</Para>
    <Callout>Anycast can distribute traffic across multiple points of presence and route users to a nearby edge, but it does not create unlimited capacity or automatically distinguish malicious from legitimate requests.</Callout>
    <Divider />
    <Chapter n={5} title="Incident Runbook and Recovery" />
    <Para>Prepare roles before an incident: incident commander, network/provider liaison, application lead, communications owner, and decision-maker for customer impact. Keep provider mitigation contacts and account verification details available offline. Document what data can be shared with a mitigation provider and who approves emergency traffic filtering.</Para>
    <Para>During response, declare the incident, capture a baseline snapshot, engage upstream providers early, apply reversible mitigations, and monitor both availability and false positives. Keep a timeline of decisions. Afterward, remove temporary rules safely, verify recovery from multiple networks, preserve evidence, and update capacity and runbooks based on what failed.</Para>
    <CodeBlock>{`# Incident checklist
[ ] Confirm customer impact with independent probes
[ ] Check provider / CDN / DNS status and open incident bridge
[ ] Compare edge, application, and dependency telemetry
[ ] Apply approved mitigation with an owner and expiry time
[ ] Track false positives and critical customer journeys
[ ] Communicate status and recovery criteria
[ ] Review and remove temporary controls after the event`}</CodeBlock>
    <Divider />
    <Chapter n={6} title="Mistakes, Practice, and Review" />
    <Para><strong>Common mistakes:</strong> assuming all spikes are attacks; relying only on origin scaling; blocking by IP without understanding NAT; and waiting until a provider is needed to find its support number. Do not promise that a DDoS product will stop every attack. Contracts, coverage, capacity, and operational procedures all need testing.</Para>
    <Para><strong>Practice:</strong> (1) Map the dependencies for an online exam portal and identify which need upstream help. (2) Compare a flash-crowd and suspicious surge using several metrics. (3) Write graceful-degradation options for a payment service. (4) Draft a provider escalation checklist. (5) Define recovery criteria and a post-incident review outline.</Para>
    <Warn>Do not create a denial-of-service test against public services. Capacity exercises require written approval, a controlled scope, provider coordination, and a safe test plan. Prefer synthetic load testing in a dedicated environment.</Warn>
    <KeyTakeaways items={['DDoS targets availability and may exhaust bandwidth, protocol state, or application resources.','Measure bytes, packets, new connections, request costs, latency, and errors against a time-appropriate baseline.','Real user surges can resemble attacks; correlate traffic with business events and dependency telemetry.','Mitigate close to the source with upstream providers, edge capacity, bounded application work, and graceful degradation.','Maintain a runbook with owners, escalation contacts, reversible controls, customer communications, and recovery criteria.','Use controlled, authorised load tests only; never reproduce DDoS techniques against third-party services.']} />
    <p style={{ marginTop: '2rem' }}><a href="/learn/networking/network-troubleshooting" style={{ color: '#2563eb', fontWeight: 700 }}>Next: Lesson 40 · Network Troubleshooting →</a></p>
  </LearnLayout>
}
