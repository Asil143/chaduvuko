import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

const Chapter = ({ n, title }: { n: number; title: string }) => <div style={{ marginBottom: '0.25rem' }}><span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6366f1' }}>Chapter {n}</span><h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1e293b', margin: '0.25rem 0 0.75rem' }}>{title}</h2></div>
const Divider = () => <hr style={{ border: 'none', borderTop: '2px solid #e2e8f0', margin: '2.5rem 0' }} />
const Para = ({ children }: { children: React.ReactNode }) => <p style={{ lineHeight: 1.85, color: '#334155', marginBottom: '1rem', fontSize: '1.02rem' }}>{children}</p>
const CodeBlock = ({ children }: { children: React.ReactNode }) => <pre style={{ background: '#0f172a', color: '#e2e8f0', borderRadius: '10px', padding: '1.25rem 1.5rem', fontSize: '0.85rem', fontFamily: 'monospace', overflowX: 'auto', lineHeight: 1.7, margin: '1rem 0' }}><code>{children}</code></pre>
const Callout = ({ children }: { children: React.ReactNode }) => <div style={{ background: '#f0f9ff', border: '2px solid #0ea5e9', borderRadius: '12px', padding: '1.1rem 1.3rem', margin: '1.25rem 0', lineHeight: 1.8, color: '#0c4a6e' }}>{children}</div>
const Warn = ({ children }: { children: React.ReactNode }) => <div style={{ background: '#fffbeb', border: '2px solid #f59e0b', borderRadius: '12px', padding: '1.1rem 1.3rem', margin: '1.25rem 0', lineHeight: 1.8, color: '#78350f' }}>{children}</div>

export default function ZeroTrustNetworking() {
  return <LearnLayout title="Zero Trust Networking — Never Trust, Always Verify" description="Identity-aware access, device posture, segmentation, and continuous verification." section="Networking Fundamentals — Lesson 38" readTime="16–22 min">
    <Chapter n={1} title="Replace the Trusted Perimeter with Explicit Decisions" />
    <Para>A traditional perimeter model often treated a device inside the office network as more trustworthy than one on the public internet. Cloud services, contractors, remote work, and compromised endpoints make that boundary unreliable. Zero trust is an architecture and operating approach that assumes no network location alone proves trust. Each access decision should be explicit, least-privileged, and informed by identity, device, resource, and context.</Para>
    <Para>“Never trust, always verify” does not mean continuously prompting users or distrusting every employee. It means do not grant broad access merely because a connection came through a VPN or office Wi-Fi. Authenticate the user, check device posture, authorise a specific resource, and record enough context to investigate later.</Para>
    <Callout><strong>Prerequisites:</strong> know basic firewalls, VPNs, identity providers, and network segmentation. Zero trust is not one product; it is a collection of controls, policies, and operational practices.</Callout>
    <Divider />
    <Chapter n={2} title="A Reference Access Flow" />
    <Para>A user requests access to an application. An identity provider verifies the user (often with phishing-resistant MFA); endpoint management supplies device identity and posture; a policy engine evaluates role, resource sensitivity, device health, location risk, and session conditions; an enforcement point allows a narrow connection; and logs capture the decision. Some systems use a broker or software-defined perimeter so the application is not directly reachable from every client network.</Para>
    <Para>The policy should be understandable and testable. For example, an employee with a managed, encrypted device may read a dashboard, while a contractor can reach a separate project portal but not the production database. Authentication answers “who are you?”; authorisation answers “what may you do here?”; device posture answers “is this endpoint in an acceptable state?”</Para>
    <CodeBlock>{`# Illustrative access policy (conceptual, not a vendor syntax)
resource: finance-reporting
allow_when:
  user_group: finance-analysts
  mfa: satisfied
  device: managed-and-compliant
  session_risk: acceptable
permissions:
  - reports:read
  - reports:export-deny
log:
  decision: required
  reason: required`}</CodeBlock>
    <Divider />
    <Chapter n={3} title="Segmentation and the VPN Relationship" />
    <Para>Microsegmentation limits east-west communication between workloads and user groups. Instead of one flat subnet where any compromised laptop can attempt to reach every server, define allowed paths around applications and service dependencies. A user may reach an identity-aware proxy for one web application without receiving a route to the whole data-centre subnet.</Para>
    <Para>Zero trust does not simply replace every VPN. A VPN can remain appropriate for network administration or legacy systems, but it should provide scoped access with strong identity and policy, not imply blanket trust. Zero-trust network access (ZTNA) commonly brokers per-application access; implementations vary, and product labels are not a guarantee of architecture quality. SASE combines networking and security functions delivered as a service; it is a delivery model, not a substitute for clear policy.</Para>
    <CodeBlock>{`# Example allow-list expressed as a reviewable table
identity             destination                 action
staff-web-users      app-proxy:443               allow
staff-web-users      database-subnet:*           deny
platform-operators   bastion:22                  allow-with-MFA
bastion              approved-admin-hosts:22     allow
all-other-sources    production-database:5432    deny`}</CodeBlock>
    <Divider />
    <Chapter n={4} title="Build Incrementally, Measure Outcomes" />
    <Para>Start with asset and identity discovery: who uses each application, which devices connect, what network paths are required, and which legacy dependencies exist. Prioritise high-value applications, define an owner, and map a small set of explicit access rules. Introduce observe-only or report mode when available, test with a pilot group, and keep a rollback path before enforcement.</Para>
    <Para>Measure whether the architecture reduces standing privilege and broad network reach without blocking legitimate work. Useful signals include the number of broad access rules, unmanaged-device access attempts, policy exceptions, authentication failures, and time to revoke a session. Do not measure success only by number of products purchased or MFA prompts shown.</Para>
    <Callout>Make policy changes reviewable and reversible. A good deployment plan includes application owners, user communication, support readiness, test cases, and a process for time-limited exceptions.</Callout>
    <Divider />
    <Chapter n={5} title="Production Risks and Common Mistakes" />
    <Para>Identity systems, policy engines, endpoint management, DNS, and enforcement points become critical dependencies. Protect administrators with separate privileged identities, hardware-backed MFA where feasible, strong recovery procedures, and alerting. Keep emergency access documented and audited. Centralised access services can become a single point of failure; use tested redundancy and make outage behaviour explicit.</Para>
    <Para>Common mistakes include treating a VPN as zero trust; writing policies that allow entire address ranges when a single application is needed; trusting a device label without checking its source and freshness; and forgetting service accounts or machine-to-machine paths. Another danger is a policy too complex for its operators to reason about. Prefer small rules with named owners, observable decisions, and periodic recertification.</Para>
    <Warn>Continuous verification should be proportionate. Collect only the telemetry needed for security and reliability, explain monitoring to users, and protect access logs because they can reveal sensitive work patterns.</Warn>
    <Divider />
    <Chapter n={6} title="Practice and Review" />
    <Para><strong>Practice:</strong> (1) Draw an access flow for an employee reaching a payroll app from a managed laptop. (2) Design a least-privilege policy for an external auditor. (3) Identify three legacy dependencies to discover before segmentation. (4) Describe how a policy engine should handle an unhealthy endpoint mid-session. (5) Propose an availability and rollback plan for a staged rollout.</Para>
    <Para><strong>Common misconceptions:</strong> an internal IP address is not proof of identity; MFA alone does not establish device health; microsegmentation is not just making more VLANs; and denying all traffic by default without a dependency inventory is not a usable migration plan.</Para>
    <KeyTakeaways items={['Zero trust makes explicit, least-privileged access decisions; network location alone does not establish trust.','A practical decision combines identity, resource, device posture, context, and policy.','Microsegmentation reduces lateral reach; ZTNA can provide narrow per-application access.','VPNs can coexist with zero-trust controls when access is scoped, authenticated, and monitored.','Discover dependencies, pilot in observe mode, test rollback, and assign policy owners before broad enforcement.','Protect the identity and policy control planes, measure access outcomes, and keep user telemetry proportionate.']} />
    <p style={{ marginTop: '2rem' }}><a href="/learn/networking/ddos" style={{ color: '#2563eb', fontWeight: 700 }}>Next: Lesson 39 · DDoS →</a></p>
  </LearnLayout>
}
