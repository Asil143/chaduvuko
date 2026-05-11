import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import { Callout } from '@/components/content/Callout'
import Link from 'next/link'

const C = '#ff4757'

const s = {
  p: { fontSize: 15, color: 'var(--text)', lineHeight: 1.9, marginBottom: 16 } as React.CSSProperties,
  h: { fontSize: 20, fontWeight: 700, color: 'var(--heading)', marginTop: 36, marginBottom: 12 } as React.CSSProperties,
  hl: { color: C, fontWeight: 600 } as React.CSSProperties,
  block: {
    background: 'var(--code-bg)', border: '1px solid var(--border)',
    borderRadius: 8, padding: '16px 20px', fontFamily: 'monospace',
    fontSize: 13, lineHeight: 1.8, marginBottom: 20, whiteSpace: 'pre-wrap' as const,
    overflowX: 'auto' as const,
  },
  table: { width: '100%', borderCollapse: 'collapse' as const, marginBottom: 24, fontSize: 14 },
  th: { background: 'var(--code-bg)', padding: '10px 14px', textAlign: 'left' as const, fontWeight: 600, borderBottom: '2px solid var(--border)' },
  td: { padding: '10px 14px', borderBottom: '1px solid var(--border)', verticalAlign: 'top' as const },
  divider: { border: 'none', borderTop: '1px solid var(--border)', margin: '40px 0' },
  iqBox: { background: 'var(--code-bg)', borderLeft: `4px solid ${C}`, borderRadius: 6, padding: '16px 20px', marginBottom: 20 },
  errBox: { background: '#1a0a0a', borderLeft: '4px solid #ff4757', borderRadius: 6, padding: '16px 20px', marginBottom: 20 },
}

function Part({ children }: { children: React.ReactNode }) { return <div style={{ marginBottom: 48 }}>{children}</div> }
function H({ children }: { children: React.ReactNode }) { return <h2 style={s.h}>{children}</h2> }
function P({ children }: { children: React.ReactNode }) { return <p style={s.p}>{children}</p> }
function Hl({ children }: { children: React.ReactNode }) { return <span style={s.hl}>{children}</span> }
function HR() { return <hr style={s.divider} /> }
function Block({ children }: { children: React.ReactNode }) { return <pre style={s.block}>{children}</pre> }
function IQ({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <div style={s.iqBox}>
      <div style={{ fontWeight: 700, color: C, marginBottom: 8 }}>Q: {q}</div>
      <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.8 }}>{children}</div>
    </div>
  )
}
function Err({ title, cause, fix }: { title: string; cause: string; fix: string }) {
  return (
    <div style={s.errBox}>
      <div style={{ color: '#ff4757', fontWeight: 700, marginBottom: 6 }}>✗ {title}</div>
      <div style={{ fontSize: 13, color: '#ccc', marginBottom: 4 }}><strong>Why it happens:</strong> {cause}</div>
      <div style={{ fontSize: 13, color: '#ccc' }}><strong>Fix:</strong> {fix}</div>
    </div>
  )
}
function ProTip({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: '#0a1a0a', borderLeft: '4px solid #2ed573', borderRadius: 6, padding: '14px 18px', marginBottom: 20, fontSize: 14, color: '#ccc', lineHeight: 1.8 }}>
      <strong style={{ color: '#2ed573' }}>Pro tip:</strong> {children}
    </div>
  )
}

export default function Module28() {
  return (
    <LearnLayout
      title="Security Architecture — Defence in Depth and Zero Trust"
      description="How to design systems that are resilient under attack: defence in depth, Zero Trust principles, network segmentation, security control selection, threat modelling integration, and architectural patterns for cloud-native environments."
      section="Cybersecurity — Module 28"
      readTime="33 min"
      updatedAt="May 2026"
    >
      <Part>
        <P>
          Security architecture is the discipline of designing systems so that when one control fails — and eventually one will — the attacker is still contained. The offensive modules taught you how attackers move from a foothold to domain admin. Security architecture is the discipline of making each of those steps harder, slower, more detectable, or impossible.
        </P>
        <P>
          The shift from security as a checkbox to security as an architectural property is the inflection point in a security career. A security architect does not just add a firewall — they ask: "If an attacker gets through the firewall, what do they find? If they compromise that application server, what can they reach from there? If they steal credentials, what can they do with them?" The answers determine which controls to build and where.
        </P>
        <Callout type="info">
          Security architecture skills are among the highest-paid in the US cybersecurity market. Security architect and CISO roles commanding $200K–$350K+ are typically occupied by people who deeply understand both offense and defence — which is exactly the path this course builds.
        </Callout>
      </Part>

      <HR />

      <Part>
        <H>Defence in Depth — Layered Controls</H>
        <P>
          <Hl>Defence in depth</Hl> means deploying multiple independent security controls so that an attacker must defeat several layers to achieve their objective. No single control is assumed to be reliable. The layers slow attackers, generate detection signals, and limit blast radius.
        </P>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Layer</th>
              <th style={s.th}>Controls</th>
              <th style={s.th}>What it stops</th>
              <th style={s.th}>Bypass</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Perimeter', 'Firewall, WAF, DDoS mitigation, IPS', 'Mass scanning, known attack patterns, volumetric attacks', 'Targeted attack over allowed protocols, insider threat'],
              ['Network', 'Segmentation, VLANs, micro-segmentation, IDS', 'Lateral movement, C2 beaconing detection', 'Encrypted C2, legitimate tool abuse (living off the land)'],
              ['Host', 'EDR, HIPS, patching, hardening, disk encryption', 'Malware execution, exploitation, credential theft', 'Living-off-the-land, signed binary abuse, kernel exploits'],
              ['Identity', 'MFA, PAM, least privilege, SSO, Credential Guard', 'Credential theft, pass-the-hash, privilege escalation', 'MFA bypass (AiTM), session hijacking, insider'],
              ['Application', 'Input validation, output encoding, parameterised queries, WAF', 'SQLi, XSS, injection, command injection', 'Logic flaws, business rule bypass, zero-day'],
              ['Data', 'Encryption at rest and transit, DLP, column-level access, backup', 'Data exfiltration, ransomware (backups survive)', 'Encryption bypass via stolen keys, authorised access abuse'],
              ['Detection', 'SIEM, UEBA, honeypots, threat hunting', 'Slow-and-low attacks, insider threats, post-breach dwell', 'Detection evasion, living-off-the-land, log tampering'],
            ].map(([l, c, w, b]) => (
              <tr key={l}>
                <td style={{ ...s.td, fontWeight: 600, color: C }}>{l}</td>
                <td style={s.td}>{c}</td>
                <td style={s.td}>{w}</td>
                <td style={{ ...s.td, color: '#aaa', fontSize: 13 }}>{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <P>
          The bypass column is as important as the controls column. Every layer has weaknesses. The architecture question is not "does this control work?" but "if this control fails, what does the attacker find next, and does the next layer detect or contain them?"
        </P>
      </Part>

      <HR />

      <Part>
        <H>Zero Trust Architecture</H>
        <P>
          Traditional network security assumed that traffic inside the corporate network perimeter was trustworthy. <Hl>Zero Trust</Hl> (ZT) rejects this assumption entirely: no user, device, or network segment is trusted by default — all access is verified explicitly, every time.
        </P>
        <P>
          The driver for Zero Trust adoption is the collapse of the perimeter: remote work, cloud services, contractor access, and mobile devices mean most enterprise traffic now flows outside the traditional corporate network. The old model of "trust inside, verify outside" is structurally broken.
        </P>
        <P>
          NIST SP 800-207 defines Zero Trust through seven tenets:
        </P>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Tenet</th>
              <th style={s.th}>What it means in practice</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['All resources are treated as assets regardless of location', 'A database on-prem is treated identically to one in a cloud VPC — both require authentication and authorisation'],
              ['All communication is secured regardless of network location', 'TLS everywhere, including internal service-to-service communication. No cleartext protocols even on "internal" networks.'],
              ['Access to individual resources is granted per-session', 'A login grants access to a specific application, not to the entire network segment containing that application'],
              ['Access decisions use dynamic policy with observable state', 'Device health, location, user behaviour, and time-of-day inform every access decision in real time'],
              ['All assets are monitored and measured for integrity', 'Endpoint agents report device state; deviation from baseline triggers re-evaluation of access'],
              ['All authentication and authorisation is dynamic and enforced before access', 'The Policy Decision Point re-evaluates on every request — stale sessions are revoked'],
              ['Collect as much information as possible to improve posture', 'Logs, telemetry, and threat intelligence feed back into policy refinement'],
            ].map(([t, m]) => (
              <tr key={t}>
                <td style={{ ...s.td, fontWeight: 600 }}>{t}</td>
                <td style={s.td}>{m}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <P>
          In practice, Zero Trust is implemented progressively — it is a journey, not a switch. Most organisations start with identity (strong MFA everywhere), then add device compliance checks, then micro-segment applications, and eventually reach continuous monitoring with automated access revocation.
        </P>
        <Block>{`Zero Trust implementation priority order (most impact first):

1. Identity — Deploy MFA everywhere, especially for admin access.
   Tools: Okta, Microsoft Entra ID, Duo Security, CrowdStrike Identity

2. Device compliance — Only allow devices that meet baseline health requirements.
   Checks: EDR installed, OS patched, disk encrypted, screen lock active
   Tools: Microsoft Intune, Jamf, CrowdStrike Falcon Device Control

3. Application access — Replace VPN with identity-aware proxies.
   Users access specific applications, not network segments.
   Tools: Cloudflare Access, Zscaler Private Access, Google BeyondCorp

4. Micro-segmentation — Prevent lateral movement between workloads.
   East-west traffic filtered; services only communicate with named peers.
   Tools: Illumio, Guardicore, AWS Security Groups, Kubernetes NetworkPolicy

5. Data classification — Know what data you have and where it lives.
   Apply access controls at the data level, not just the application level.
   Tools: Microsoft Purview, Varonis, BigID`}</Block>
        <ProTip>
          Zero Trust fails when it is applied to the network perimeter without changing identity controls. The most impactful single Zero Trust investment is phishing-resistant MFA (hardware keys, passkeys) for all privileged accounts. Credential theft is how most breaches start — Zero Trust at the identity layer stops them before the network is reached.
        </ProTip>
      </Part>

      <HR />

      <Part>
        <H>Network Segmentation Architecture</H>
        <P>
          Network segmentation limits lateral movement: if an attacker compromises a web server, they should not be able to directly reach the database server, the domain controller, or the backup infrastructure. Segmentation is one of the most effective compensating controls for the inevitability of some level of compromise.
        </P>
        <Block>{`Enterprise network segmentation model:

                    INTERNET
                        │
              ┌─────────┴─────────┐
              │    PERIMETER      │
              │  Firewall + WAF   │
              └─────────┬─────────┘
                        │
              ┌─────────┴─────────┐
              │       DMZ         │  ← Internet-facing services only
              │  Web, API, CDN    │  ← No access to internal from here
              └─────────┬─────────┘
                        │ (explicit allow rules only)
              ┌─────────┴─────────┐
              │   APPLICATION     │  ← App servers talk only to DB segment
              │   SEGMENT         │  ← No access to management segment
              └─────────┬─────────┘
                        │ (port 5432 / 3306 only, to specific IPs)
              ┌─────────┴─────────┐
              │    DATA SEGMENT   │  ← DB servers, storage
              │                   │  ← No outbound internet access
              └───────────────────┘

              ┌───────────────────┐
              │  MANAGEMENT       │  ← Separate, jump server access only
              │  SEGMENT          │  ← AD, SIEM, backup, monitoring
              │  (Tier 0 AD)      │  ← Physical/VPN access from Tier 0 PAW only
              └───────────────────┘

Rules between segments:
  DMZ → Application:      Allowed: TCP 443 (API), TCP 8080 (internal API)
  Application → Data:     Allowed: TCP 5432 to db01.internal only
  Application → Internet: Denied (no direct internet access from app servers)
  Management → All:       Allowed from jump servers only (specific IPs)
  All → Management:       Denied except monitoring agents (UDP 514 syslog, TCP 9200 SIEM)`}</Block>
        <P>
          Cloud-native segmentation uses security groups, network policies, and service meshes instead of physical VLANs:
        </P>
        <Block>{`# AWS Security Groups — micro-segmentation example
# Allow web servers to only receive traffic from the ALB
resource "aws_security_group" "web" {
  ingress {
    from_port       = 443
    to_port         = 443
    protocol        = "tcp"
    security_groups = [aws_security_group.alb.id]  # only from ALB
  }
  egress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.database.id]  # only to DB
  }
}

# Kubernetes NetworkPolicy — deny all, then allow explicitly
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-all
  namespace: production
spec:
  podSelector: {}       # applies to all pods in namespace
  policyTypes:
  - Ingress
  - Egress
  # No rules = deny all ingress and egress
---
# Allow specific communication:
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-api-to-db
  namespace: production
spec:
  podSelector:
    matchLabels:
      app: database
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: api-server
    ports:
    - port: 5432`}</Block>
      </Part>

      <HR />

      <Part>
        <H>Security Control Frameworks</H>
        <P>
          Rather than inventing security controls from scratch, architects use established frameworks that map controls to threat categories. These frameworks also serve as audit baselines for compliance.
        </P>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Framework</th>
              <th style={s.th}>What it provides</th>
              <th style={s.th}>Primary audience</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['NIST Cybersecurity Framework (CSF 2.0)', 'Five functions: Govern, Identify, Protect, Detect, Respond, Recover. High-level risk management structure.', 'All organisations — especially US federal contractors'],
              ['CIS Controls v8', '18 prioritised control categories. Highly actionable — implementation groups allow small orgs to start with the highest-ROI controls first.', 'Practical for all org sizes. Implementation Group 1 = minimum baseline.'],
              ['ISO 27001/27002', 'Information Security Management System (ISMS) standard. Certification available. 93 controls in 4 themes.', 'Enterprise, international, and regulated industries requiring certification'],
              ['MITRE ATT&CK', 'Adversary tactics, techniques, and procedures (TTPs) mapped to real-world attack groups. Each technique has detection and mitigation guidance.', 'Threat detection, threat hunting, red team planning, security architecture review'],
              ['NIST SP 800-53', 'Comprehensive control catalogue for federal information systems. 20 control families, hundreds of controls.', 'US federal agencies, contractors, FedRAMP cloud providers'],
            ].map(([f, w, a]) => (
              <tr key={f}>
                <td style={{ ...s.td, fontWeight: 600 }}>{f}</td>
                <td style={s.td}>{w}</td>
                <td style={s.td}>{a}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <P>
          For a US-market security architect, knowing CIS Controls and NIST CSF is baseline. MITRE ATT&CK is increasingly used in job descriptions because it provides a common language for discussing specific threat techniques and their mitigations.
        </P>
      </Part>

      <HR />

      <Part>
        <H>Secure Architecture Patterns</H>
        <P>
          Certain architectural patterns appear repeatedly in well-secured systems. These are not vendor products — they are structural decisions that reduce attack surface regardless of what software is deployed.
        </P>

        <H>Bastion Host / Jump Server</H>
        <P>
          All administrative access to production systems routes through a single, highly hardened jump server with MFA, session recording, and full audit logging. Direct SSH/RDP to production from developer workstations is prohibited.
        </P>
        <Block>{`Jump server architecture:
  Developer laptop → MFA → Jump server (session recorded) → Production server

  Jump server controls:
  - MFA required for every session
  - All keystrokes logged and stored for 1+ year
  - No internet access from jump server
  - Privileged Access Workstation (PAW) for Tier 0 (AD, backup, SIEM management)
  - Jump server itself is Tier 0 — managed identically to the DC

  Tools: CyberArk, Delinea (Thycotic), AWS Systems Manager Session Manager,
         HashiCorp Vault SSH secrets engine, BeyondTrust`}</Block>

        <H>Immutable Infrastructure</H>
        <P>
          Production servers are never patched or configured in place — they are replaced. When a new version is ready, a new server image is built, tested, and swapped in. The old server is terminated. Attackers cannot persist on a server that is replaced every deployment cycle.
        </P>
        <Block>{`Immutable infrastructure security properties:
  - No SSH access to running production instances (nothing to log into)
  - Attackers cannot persist across deployments (15-minute TTL with frequent deploys)
  - Configuration drift is impossible — every server matches the golden image
  - Secrets injected at runtime from secrets manager, not baked into image
  - All config changes via version-controlled IaC (Terraform, Pulumi)
    → every change has a PR, review, and audit trail

  Implementation:
  - Docker/Kubernetes: rolling updates replace containers with new image builds
  - EC2: Auto Scaling Group + Launch Template, terminate on config change
  - Golden image pipeline: Packer builds → AMI → staging test → production rollout`}</Block>

        <H>Secrets Management Architecture</H>
        <P>
          Every service authenticates to a centralised secrets manager using its platform identity (IAM role, Kubernetes service account) — no static credentials anywhere.
        </P>
        <Block>{`Secrets management architecture:
  ┌──────────────────────────────────────────────────────────┐
  │ Service (on EC2/ECS/Lambda)                              │
  │   → Has IAM role (no static credentials)                │
  │   → Role has policy: secretsmanager:GetSecretValue      │
  │     for arn:aws:secretsmanager:us-east-1:123:secret:    │
  │     prod/myapp/database only                            │
  └──────────────┬───────────────────────────────────────────┘
                 │ (uses instance metadata service v2)
  ┌──────────────┴───────────────────────────────────────────┐
  │ AWS Secrets Manager                                      │
  │   → Stores encrypted database credentials               │
  │   → Rotation: Lambda rotates DB password every 30 days  │
  │   → Audit: CloudTrail logs every GetSecretValue call    │
  │   → Access log: "which service accessed which secret    │
  │     at what time" — detect anomalous access             │
  └──────────────────────────────────────────────────────────┘

Security properties:
  - Credentials never stored in environment variables, config files, or source code
  - If service is compromised: attacker gets temporary IAM credentials that expire
  - If credentials are rotated: old credentials become invalid within minutes
  - Audit trail: every secret access is logged in CloudTrail with caller identity`}</Block>
      </Part>

      <HR />

      <Part>
        <H>Architectural Anti-Patterns — What Not to Build</H>
        <P>
          As important as knowing what to build is recognising patterns that create structural vulnerabilities:
        </P>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Anti-pattern</th>
              <th style={s.th}>Why it fails</th>
              <th style={s.th}>Fix</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Flat network — everything on the same VLAN', 'One compromised host reaches all others; zero lateral movement resistance', 'Segment by function (web, app, data, management) with explicit allow rules'],
              ['Admin access from regular workstations', 'Malware on dev laptop → privilege escalation to domain admin', 'Privileged Access Workstations (PAWs) for Tier 0 admin only'],
              ['Shared service accounts across applications', 'One breached app → credentials grant access to all apps using the same account', 'Dedicated service account per application; gMSA for Windows services'],
              ['Security as a final phase gate', '"We\'ll add security review before release" — always deprioritised under deadline', 'Threat modelling at design, SAST in CI, pentest as part of release criteria'],
              ['Perimeter-only security', 'Insider threats, phishing → internal attacker faces no controls after VPN auth', 'Zero Trust — verify identity and device for every application, every session'],
              ['Manual security controls', 'Humans forget, get tired, rotate, leave. Manual firewall rules accumulate cruft.', 'Infrastructure as Code for all security controls — version controlled, auditable, automated'],
            ].map(([a, w, f]) => (
              <tr key={a}>
                <td style={{ ...s.td, color: '#ff4757', fontWeight: 600 }}>{a}</td>
                <td style={s.td}>{w}</td>
                <td style={{ ...s.td, color: '#2ed573' }}>{f}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Part>

      <HR />

      <Part>
        <H>Interview Questions — Security Architecture</H>
        <IQ q="What is defence in depth and why is it more than just adding multiple firewalls?">
          Defence in depth is a strategy of independent layered controls so that the failure of any single control does not result in a complete compromise. It is not just multiple firewalls — it spans all layers: perimeter controls, network segmentation, host-based controls (EDR, hardening), identity controls (MFA, least privilege), application controls (input validation, output encoding), data controls (encryption, DLP), and detection controls (SIEM, honeypots). The key word is "independent" — the layers must be structurally different so that an attacker who defeats one does not automatically defeat others. Multiple firewalls from the same vendor running the same rules with the same misconfiguration is not depth — it is redundancy of a single point of failure.
        </IQ>
        <IQ q="Explain the Zero Trust principle 'never trust, always verify' and how it differs from traditional perimeter security.">
          Traditional perimeter security trusts anything inside the corporate network — once you pass the firewall, you have broad access. Zero Trust removes the concept of a trusted network location: every access request is evaluated against identity, device health, and context regardless of whether it originates from inside or outside the corporate network. "Never trust" means no implicit trust based on network location. "Always verify" means every session explicitly authenticates the user, verifies device compliance, evaluates context (time, location, risk score), and grants the minimum access needed for that specific request. The practical difference: in traditional security, a phishing victim who clicks a link from inside the VPN gives an attacker broad internal access. In Zero Trust, the attacker still needs MFA, a compliant device, and access scoped to specific applications — each of which is a separate control to defeat.
        </IQ>
        <IQ q="A company wants to improve their security posture but has a limited budget. Using CIS Controls, what do you prioritise first?">
          CIS Controls v8 defines Implementation Group 1 (IG1) as the "essential cyber hygiene" controls accessible to any organisation regardless of size. Prioritised for limited budgets: first, inventory of hardware and software assets (you cannot protect what you do not know you have). Second, secure configuration management — harden default settings across all systems, this is nearly free but eliminates a huge attack surface. Third, privilege control — remove local admin rights from regular users and require MFA for all remote access. Fourth, email and web browser protections — phishing is the number one initial access vector and email filtering is cost-effective. Fifth, patch management — patch critical and high vulnerabilities within seven days. These five in order address the majority of successful attacks with the least investment.
        </IQ>
        <IQ q="How does micro-segmentation improve on traditional VLAN-based segmentation?">
          Traditional VLAN segmentation divides the network into zones — DMZ, internal, data — but within a zone, hosts can communicate freely. An attacker compromising one server in the internal zone can reach all other internal-zone hosts directly. Micro-segmentation applies access controls at the workload level rather than the network segment level. Each server, container, or VM has a policy that explicitly defines which other workloads it can communicate with and on which ports — everything else is denied by default. An attacker on server A in the application zone cannot reach server B in the same zone unless B's policy explicitly allows communication from A. Cloud implementations use security groups (AWS) or network policies (Kubernetes). On-premise implementations use host-based firewall policies managed centrally or software-defined networking overlays.
        </IQ>
        <IQ q="What is the Privileged Access Workstation model and why is it important for Active Directory security?">
          A Privileged Access Workstation (PAW) is a dedicated, highly secured workstation used only for privileged administrative tasks — it is never used for email, browsing, or regular work. The security properties: no internet access, no email client, managed applications only, EDR with maximum sensitivity, no USB access except keyboard/mouse, frequent vulnerability scanning. The model is necessary for Active Directory Tier 0 because domain admin credentials entered on a regular workstation are vulnerable to credential theft — keyloggers, LSASS dumping, malicious browser extensions, or simply phishing that delivers malware to the workstation. A PAW ensures that the most powerful credentials in the enterprise are never exposed to the normal threat surface of a general-purpose computer. If attackers compromise a PAW, they face a hardened system with maximum detection sensitivity rather than a developer's laptop.
        </IQ>
      </Part>

      <HR />

      <Part>
        <H>Common Mistakes — Security Architecture</H>
        <Err
          title="Treating security as a product purchase rather than an architectural decision"
          cause="Buying a next-generation firewall, a SIEM, and an EDR platform, then declaring the organisation secure. Tools without architectural decisions about segmentation, identity, and access control provide a false sense of security."
          fix="Start with architecture: map trust boundaries, segment networks, implement least privilege, require MFA. Then add tools to support the architecture — not the other way around. A $50K firewall in a flat network with shared admin credentials is less secure than a well-segmented network with MFA and minimal tooling."
        />
        <Err
          title="Implementing Zero Trust network access without fixing identity"
          cause="Deploying a Zero Trust network access (ZTNA) solution like Zscaler or Cloudflare Access but leaving SMS-based MFA, no device compliance checks, and shared service account passwords. The network layer is zero trust but the identity layer is still 2010."
          fix="Zero Trust implementation must start at the identity layer. Every privileged account must have phishing-resistant MFA (hardware key, passkey). Device compliance must be enforced before network access is granted. Only after identity is solid does network-layer Zero Trust add meaningful security."
        />
        <Err
          title="Documenting security architecture but never validating it"
          cause="The architecture diagram shows network segmentation between the web tier and database tier. The actual firewall rules have 'any to any' on the internal interface because a developer needed temporary access two years ago and nobody removed it."
          fix="Validate architecture against implementation regularly. Run network reachability tests: can the web server actually reach the domain controller? Run pentest exercises that specifically test assumed segmentation boundaries. Use tools like Shodan to verify what you think is internal is actually internal. Architecture diagrams without validation are fiction."
        />
        <Err
          title="Over-segmenting without compensating operational tooling"
          cause="Implementing strict micro-segmentation that blocks legitimate application communication. Support team cannot access servers. Monitoring agents cannot reach the SIEM. Applications fail because DB connections are blocked. Operations revolts and disables the segmentation."
          fix="Design segmentation with operations from the start. Map all legitimate communication flows before implementing controls. Use 'monitor' mode before 'enforce' mode — Illumio and similar tools log what would be blocked before blocking it, so you can validate rules do not break operations. Build exception and change processes before enforcement begins."
        />
        <Err
          title="Neglecting the supply chain in architecture"
          cause="The architecture protects internal systems but ignores third-party vendors with privileged access — managed security providers, software vendors with remote access, SaaS integrations with broad API permissions."
          fix="Every third-party connection is a trust boundary that must be explicitly documented, scoped to minimum required access, and reviewed regularly. Vendor assessments, SaaS security reviews (via SSPM tools), and just-in-time vendor access (instead of persistent VPN credentials) reduce the third-party attack surface. The SolarWinds breach exploited this gap at scale."
        />
      </Part>

      <HR />

      <KeyTakeaways items={[
        'Defence in depth deploys independent layered controls — perimeter, network, host, identity, application, data, and detection — so that no single control failure results in complete compromise.',
        'Zero Trust rejects implicit trust based on network location. Every access request is evaluated against identity, device health, and context — even from inside the corporate network.',
        'The most impactful first Zero Trust investment is phishing-resistant MFA for all privileged accounts. Credential theft is the dominant initial access vector and identity controls stop it earliest.',
        'Network segmentation limits lateral movement: define explicit allow rules between tiers (DMZ → App → Data), deny all else. Cloud segmentation uses security groups and Kubernetes NetworkPolicy.',
        'CIS Controls Implementation Group 1 is the baseline: asset inventory, secure configuration, privilege control, email/web filtering, and patch management. These five controls prevent the majority of successful attacks.',
        'MITRE ATT&CK provides a common language for discussing specific attack techniques and their mitigations — increasingly required knowledge for US security architect roles.',
        'Architectural anti-patterns to avoid: flat networks, admin access from regular workstations, shared service accounts, security as a final phase gate, perimeter-only security, and manual controls.',
        'Privileged Access Workstations (PAWs) isolate the use of Tier 0 credentials from the general threat surface — domain admin actions only from a dedicated hardened workstation.',
        'Immutable infrastructure eliminates persistence as an attacker capability — servers replaced at every deployment cannot accumulate malware, misconfigurations, or attacker footholds.',
        'Validate architecture against implementation: network reachability tests, segmentation penetration tests, and "any-to-any" firewall rule audits catch gaps between the diagram and reality.',
      ]} />

      <HR />

      <Callout type="info">
        Security architecture designs the system. In{' '}
        <Link href="/learn/cybersecurity/identity-access-management">
          Module 29: Identity and Access Management
        </Link>
        , you go deep on the most attacked layer: how to design IAM systems that prevent credential-based attacks, implement least privilege at scale, and integrate SSO, MFA, and privileged access management in enterprise environments.
      </Callout>
    </LearnLayout>
  )
}
