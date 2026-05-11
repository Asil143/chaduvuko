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

export default function Module29() {
  return (
    <LearnLayout
      title="Identity and Access Management — MFA, RBAC, and Privileged Access"
      description="Authentication factors and their attack resistance, RBAC versus ABAC design, SSO federation, MFA implementation, Privileged Access Management, Just-in-Time access, and identity governance for enterprise environments."
      section="Cybersecurity — Module 29"
      readTime="32 min"
      updatedAt="May 2026"
    >
      <Part>
        <P>
          Identity is the new perimeter. In modern enterprise environments, the majority of breaches begin with a compromised credential — not a firewall bypass or a zero-day exploit. The 2024 Verizon DBIR found that credentials were involved in <Hl>86% of web application breaches</Hl>. Attackers do not hack in — they log in.
        </P>
        <P>
          Identity and Access Management (IAM) is the set of processes, policies, and technologies that control who can do what in an organisation's systems. Getting IAM right — proper authentication, least-privilege authorisation, privileged access controls, and identity lifecycle management — eliminates the most common attack vectors at their root.
        </P>
        <Callout type="info">
          IAM engineering is one of the fastest-growing specialisations in the US security market. Okta, Microsoft Entra, and CyberArk professionals command significant premiums, and the skills in this module apply directly to those roles.
        </Callout>
      </Part>

      <HR />

      <Part>
        <H>Authentication Factors and Their Attack Resistance</H>
        <P>
          Authentication proves identity. The strength of authentication depends on what factors are used and how resistant they are to the attacks we have studied throughout this course.
        </P>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Factor</th>
              <th style={s.th}>Examples</th>
              <th style={s.th}>Vulnerable to</th>
              <th style={s.th}>Phishing resistant?</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Knowledge (something you know)', 'Password, PIN, security question', 'Phishing, credential stuffing, brute force, social engineering', 'No'],
              ['Possession (something you have) — TOTP', 'Google Authenticator, Authy, TOTP app', 'Real-time phishing proxy (AiTM), SIM swap, malware', 'No'],
              ['Possession — SMS OTP', 'Code sent to phone', 'SIM swap, SS7 attacks, real-time phishing', 'No'],
              ['Possession — hardware key (FIDO2)', 'YubiKey, Google Titan Key, passkeys', 'Cannot be phished — key is bound to origin URL', 'Yes'],
              ['Inherence (something you are)', 'Fingerprint, face ID, voice', 'Spoofing attacks (varies by implementation), device seizure', 'Depends on implementation'],
              ['Passkeys (platform FIDO2)', 'Face ID/Touch ID + device key', 'Phishing resistant — cryptographic binding to origin', 'Yes'],
            ].map(([f, e, v, p]) => (
              <tr key={f}>
                <td style={{ ...s.td, fontWeight: 600 }}>{f}</td>
                <td style={s.td}>{e}</td>
                <td style={{ ...s.td, color: '#ff6b81', fontSize: 13 }}>{v}</td>
                <td style={{ ...s.td, color: p === 'Yes' ? '#2ed573' : '#ffa502', fontWeight: 600 }}>{p}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <P>
          The key distinction: <Hl>TOTP codes can be phished in real time</Hl> — an AiTM (Adversary-in-the-Middle) proxy captures the code as the victim types it and replays it to the real site before it expires. FIDO2/WebAuthn hardware keys and passkeys cannot be phished because they perform a cryptographic origin verification — the key refuses to respond to a phishing site because the origin URL does not match.
        </P>
        <P>
          The CISA recommendation: all organisations handling sensitive data should migrate critical account authentication to phishing-resistant MFA (FIDO2, passkeys) and treat TOTP as an interim control only.
        </P>
      </Part>

      <HR />

      <Part>
        <H>Authorisation Models — RBAC, ABAC, and ReBAC</H>
        <P>
          Authentication proves who you are. <Hl>Authorisation</Hl> determines what you can do. Three primary models dominate enterprise authorisation:
        </P>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Model</th>
              <th style={s.th}>How it works</th>
              <th style={s.th}>Best for</th>
              <th style={s.th}>Limitations</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['RBAC (Role-Based)', 'Users assigned to roles; roles have permissions. User → Role → Permission.', 'Applications with clear user types: read-only, editor, admin', 'Role explosion: 200+ roles in large orgs. Cannot express "Alice can edit her own records only".'],
              ['ABAC (Attribute-Based)', 'Access decisions based on attributes: user.department == resource.owner.department AND time < 17:00', 'Fine-grained access: "managers can approve requests from their own team only"', 'Complex to implement and audit; policy language requires expertise'],
              ['ReBAC (Relationship-Based)', 'Access based on relationships: Alice CAN_EDIT Document if Alice IS_MEMBER_OF Document.editors group', 'Google Docs-style sharing, Notion, GitHub repos — object-level permissions', 'Requires graph database; complex to reason about at scale'],
            ].map(([m, h, b, l]) => (
              <tr key={m}>
                <td style={{ ...s.td, fontWeight: 600, color: C }}>{m}</td>
                <td style={s.td}>{h}</td>
                <td style={s.td}>{b}</td>
                <td style={{ ...s.td, fontSize: 13, color: '#aaa' }}>{l}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Block>{`# RBAC implementation example (AWS IAM):

# Define roles with minimum necessary permissions:
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "ReadOnlyS3ForReports",
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:ListBucket"],
      "Resource": ["arn:aws:s3:::reports-bucket", "arn:aws:s3:::reports-bucket/*"],
      "Condition": {
        "StringEquals": {"s3:prefix": "public/"}
      }
    }
  ]
}

# Permission boundary — caps the maximum permissions even if broader policy attached
# Prevents privilege escalation via role assumption


# ABAC implementation example (OPA — Open Policy Agent):
package app.authz

# Allow access only if user's department matches resource's department
# AND user has the required action in their role

allow {
  input.user.department == input.resource.department
  input.user.role == "manager"
  input.action == "approve"
}

# OPA is used by: Kubernetes admission control, Envoy sidecar, custom apps
# Declarative policy — version controlled, testable, auditable`}</Block>
        <ProTip>
          Start with RBAC because it is auditable and understandable. Add ABAC constraints only where RBAC genuinely cannot express the required policy. The most common ABAC use cases in practice: time-of-day restrictions, geographic restrictions, and "owner can always edit their own records." These are well-served by ABAC conditions appended to RBAC roles rather than a pure ABAC system.
        </ProTip>
      </Part>

      <HR />

      <Part>
        <H>Single Sign-On and Federation</H>
        <P>
          <Hl>Single Sign-On (SSO)</Hl> allows a user to authenticate once to a central identity provider (IdP) and access multiple applications without re-authenticating. Beyond convenience, SSO has a security advantage: it centralises authentication enforcement — MFA policies, account lockout, and session management are all handled in one place.
        </P>
        <Block>{`SSO / Federation architecture:

  User → [Browser] → Application (Service Provider / SP)
                          │
                          │ "Who is this user?" (SAML/OIDC redirect)
                          ▼
                 Identity Provider (IdP)
                  (Okta / Entra ID / Google)
                          │
                          │ "User authenticated — here are their claims"
                          │ (SAML assertion or OIDC ID token)
                          ▼
                     Application grants access


# SAML 2.0 — enterprise standard (XML-based)
# Used by: Salesforce, AWS, legacy enterprise apps
# IdP-initiated vs SP-initiated SSO
# Assertion signing (IdP signs with X.509 cert) — SP verifies signature
# Common vulnerability: XML signature wrapping attacks

# OIDC (OpenID Connect) — modern, REST-based (built on OAuth 2.0)
# Used by: Google, GitHub, modern web apps
# Returns ID token (JWT) with user claims: sub, email, name, groups

# SCIM (System for Cross-domain Identity Management)
# Automates user provisioning/deprovisioning across systems
# When user is created in Okta → SCIM creates account in Salesforce, GitHub, etc.
# When user is terminated → SCIM deactivates all accounts automatically
# Closes the "orphaned accounts" problem

# Identity federation — connecting multiple organisations
# Partner companies federate their IdPs
# User from partner org logs in with their credentials → IdP-to-IdP trust
# Used in M&A scenarios, contractor access`}</Block>
      </Part>

      <HR />

      <Part>
        <H>Privileged Access Management (PAM)</H>
        <P>
          Privileged accounts — domain admins, cloud root accounts, database admins, service accounts — are the highest-value targets for attackers. <Hl>Privileged Access Management</Hl> is the set of controls specifically for these accounts.
        </P>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>PAM control</th>
              <th style={s.th}>What it prevents</th>
              <th style={s.th}>Implementation</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Credential vaulting', 'Shared password spreadsheets; employees keeping admin passwords after termination', 'CyberArk Vault, Delinea Secret Server — all admin passwords stored, rotated automatically'],
              ['Session recording', 'Admin actions without audit trail; insider threats; attacker using privileged session', 'Every privileged session recorded (keystrokes + video) and archived for 1 year+'],
              ['Just-in-Time (JIT) access', 'Standing privileged access — admin rights that persist 24/7 even when not in use', 'Request elevation → approval workflow → time-limited privilege → automatic revocation'],
              ['Least privilege for service accounts', 'Service accounts with DA rights used for lateral movement', 'gMSA for Windows services, dedicated service accounts with only required permissions'],
              ['Break-glass accounts', 'Emergency access when PAM system is unavailable', 'Sealed envelope or vault with MFA — use requires dual custody, every use alerts security'],
            ].map(([p, w, i]) => (
              <tr key={p}>
                <td style={{ ...s.td, fontWeight: 600 }}>{p}</td>
                <td style={s.td}>{w}</td>
                <td style={s.td}>{i}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <P>
          <Hl>Just-in-Time (JIT) access</Hl> is one of the most impactful PAM controls. Instead of permanent domain admin access, an engineer requests elevation, a manager approves it, the engineer gets admin rights for 2 hours, and then the rights are automatically removed. An attacker who compromises the engineer's account outside the approval window has no elevated access.
        </P>
        <Block>{`# JIT access workflow:

Engineer requests: "I need domain admin for DB migration — 2 hours"
                              │
              ┌───────────────┴────────────────┐
              │ PAM system checks:              │
              │ - Is this a known maintenance   │
              │   window?                       │
              │ - Does the request match the    │
              │   engineer's job function?      │
              │ - Is a second approver present? │
              └───────────────┬────────────────┘
                              │ Approval via Slack / PagerDuty
              ┌───────────────┴────────────────┐
              │ PAM creates temporary account:  │
              │ - Added to "Domain Admins" group│
              │ - Session recorded              │
              │ - Time limit: 2 hours           │
              │ - Alert sent to SIEM            │
              └───────────────┬────────────────┘
                              │ 2 hours later (or manual revoke)
              ┌───────────────┴────────────────┐
              │ PAM automatically:              │
              │ - Removes from Domain Admins    │
              │ - Rotates any credentials used  │
              │ - Archives session recording    │
              └────────────────────────────────┘

Tools: CyberArk Privileged Access Manager, Delinea (formerly Thycotic),
       BeyondTrust Password Safe, HashiCorp Vault SSH secrets engine,
       AWS IAM Identity Center, Microsoft PIM (Privileged Identity Management)`}</Block>
      </Part>

      <HR />

      <Part>
        <H>Identity Governance — Lifecycle Management</H>
        <P>
          Identity governance ensures that access is correct throughout the entire user lifecycle — from onboarding to role changes to offboarding. Access accumulation (users gaining permissions over time without losing old ones) and orphaned accounts (active accounts for former employees) are two of the most common findings in security audits.
        </P>
        <Block>{`# ━━ JOINER-MOVER-LEAVER LIFECYCLE ━━━━━━━━━━━━━━━━━━━━━━━━━

JOINER (new employee):
  1. HR system creates employee record
  2. SCIM auto-provisions accounts in: SSO IdP, email, Slack, GitHub org
  3. RBAC role assigned based on job title + department
  4. Manager receives onboarding checklist confirming access granted
  5. First-login forces password change and MFA enrolment

MOVER (role change / promotion / transfer):
  1. HR system updates role/department
  2. SCIM triggers access change: new role's permissions added
  3. Old role's permissions removed (role swapped, not accumulated)
  4. Access review triggered for any retained non-standard permissions

LEAVER (termination):
  1. HR system marks employee inactive
  2. IMMEDIATE actions (within 1 hour):
     - SSO session terminated and account disabled
     - All OAuth tokens revoked
     - All active sessions killed
     - Privileged access revoked
  3. SAME DAY: corporate device remotely wiped (MDM command)
  4. 30 DAYS: account archived; access removed from all systems via SCIM
  5. LONG TERM: email forwarded to manager for 90 days


# ━━ ACCESS REVIEWS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# Quarterly access reviews — required by SOC 2, ISO 27001, PCI-DSS
# Manager reviews all direct reports' access:
# "Does Alice still need access to the production database? Yes / No"
# Certify or revoke

# Tools:
# Saviynt, SailPoint — enterprise IGA platforms
# Microsoft Entra Identity Governance — access reviews in Entra P2
# Okta Lifecycle Management — automated joiner/mover/leaver

# What to audit:
SELECT username, last_login, created_date, role
FROM users
WHERE last_login < NOW() - INTERVAL '90 days'  -- dormant accounts
   OR role IN ('admin', 'superadmin', 'dbadmin'); -- privileged accounts

# Service account inventory:
# Every service account should have:
# - An owner (person, team)
# - A documented purpose
# - A rotation schedule for its credentials
# - A minimum-privilege permission set
# Accounts with no owner or no last-use date should be disabled`}</Block>
      </Part>

      <HR />

      <Part>
        <H>IAM for Cloud Environments</H>
        <P>
          Cloud IAM has unique challenges: the attack surface is entirely API-based, misconfigured permissions grant instant access to data at scale, and the blast radius of a single compromised role can span thousands of resources.
        </P>
        <Block>{`# AWS IAM best practices

# 1. Lock the root account
aws iam create-virtual-mfa-device ...      # enable MFA on root
aws iam update-account-password-policy ... # strong password policy
# Never use root for daily operations — create admin IAM users

# 2. Use IAM roles, not IAM users, for applications
# Users have static credentials (access key + secret) — they leak
# Roles have temporary credentials that expire automatically

# 3. Enforce MFA for console access
aws iam put-user-policy --policy-document '{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Deny",
    "NotAction": ["iam:CreateVirtualMFADevice", "iam:EnableMFADevice",
                  "iam:GetUser", "iam:ListMFADevices", "iam:ListVirtualMFADevices",
                  "sts:GetSessionToken"],
    "Resource": "*",
    "Condition": {
      "BoolIfExists": {"aws:MultiFactorAuthPresent": "false"}
    }
  }]
}'

# 4. Detect over-privileged permissions with Access Analyzer
aws accessanalyzer create-analyzer --analyzer-name MyAnalyzer --type ACCOUNT
aws accessanalyzer list-findings --analyzer-arn <arn>
# Flags: public S3 buckets, externally accessible roles, unused permissions

# 5. Use IAM Access Advisor to right-size permissions
# Shows last service access date for each permission
# Remove permissions unused for 90+ days

# 6. Service Control Policies (SCPs) — preventive guardrails in AWS Orgs
# Even with full admin in child account, SCP limits what is possible:
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "DenyOutsideUS",
    "Effect": "Deny",
    "Action": "*",
    "Resource": "*",
    "Condition": {
      "StringNotEquals": {"aws:RequestedRegion": ["us-east-1", "us-west-2"]}
    }
  }]
}`}</Block>
      </Part>

      <HR />

      <Part>
        <H>Interview Questions — Identity and Access Management</H>
        <IQ q="What is the difference between authentication and authorisation?">
          Authentication answers "who are you?" — it verifies identity using credentials (password, MFA, certificate). Authorisation answers "what are you allowed to do?" — it determines whether the verified identity has permission to perform a requested action on a specific resource. Authentication must happen before authorisation, but they are independent concerns implemented differently. Authentication produces a verified identity token (session, JWT, Kerberos ticket). Authorisation uses that token plus policy definitions (RBAC roles, ABAC rules, ACLs) to make access decisions. A system can authenticate a user correctly but authorise them incorrectly (IDOR — the user is who they say they are, but they can access other users' data).
        </IQ>
        <IQ q="Why is TOTP not considered phishing-resistant MFA, and what is?">
          TOTP codes are time-based one-time passwords valid for 30 seconds. An Adversary-in-the-Middle (AiTM) phishing proxy captures the victim's username, password, and TOTP code as they are entered on a phishing page, then immediately replays them to the real site before the code expires. The attacker is authenticated because all three factors are correct — the channel is compromised, not the factors themselves. FIDO2/WebAuthn (hardware keys like YubiKey, and passkeys on devices) are phishing-resistant because the authentication ceremony includes a cryptographic binding to the origin domain. The hardware key performs an Elliptic Curve Diffie-Hellman operation that includes the domain in the signed challenge — a phishing site at evil-corp.com requesting authentication for corp.com will receive a signature bound to evil-corp.com, which the real corp.com server will reject.
        </IQ>
        <IQ q="What is Just-in-Time privileged access and what problem does it solve?">
          Just-in-Time (JIT) privileged access means that elevated permissions are granted only for the duration of a specific approved task, then automatically removed. It solves the "standing privilege" problem: in traditional environments, domain admins have their elevated permissions continuously — 24 hours a day, 7 days a week — even when not performing admin tasks. An attacker who compromises a domain admin's account has full domain admin rights immediately. With JIT, that same compromise gives the attacker the account's baseline (non-privileged) access. The attacker would need to also compromise the approval workflow to obtain privileged access. JIT is typically implemented with time-limited elevation (2 hours, not 2 weeks), dual approval for high-risk requests, session recording during the privileged window, and automatic credential rotation after the session ends.
        </IQ>
        <IQ q="A new employee joins and is onboarded with access to ten different systems. Six months later they transfer to a different department. What access issues should you expect, and how does good IAM prevent them?">
          Without proper IAM governance, the employee accumulates access: the old department's permissions are rarely fully removed, and the new department's permissions are added on top. After a year, they have access to systems from two departments that neither team believes they currently need. This is "access creep" — one of the most common audit findings. Good IAM prevents it through: automated role-swap on job code change (via SCIM from HR system), not accumulation; quarterly access reviews where managers certify that each direct report still needs each permission; and a strict "certify or lose" policy — access not actively recertified is removed. The mover workflow should be designed as a complete replacement of permissions, not an addition.
        </IQ>
        <IQ q="How would you audit whether the principle of least privilege is being followed in an AWS environment?">
          Four tools: AWS IAM Access Analyzer identifies externally exposed roles and resource policies — it flags any role accessible from outside the account or organisation. IAM Access Advisor (in IAM console per user/role) shows the last time each service was accessed — permissions for services unused in 90+ days should be removed. AWS CloudTrail provides the API call history — examining what API calls a role actually makes in production versus what permissions it has identifies over-provisioning. Detective controls via AWS Config rules: managed rules like iam-no-inline-policy, iam-user-no-policies-check, and iam-root-access-key-check catch common IAM misconfigurations. Combine these with a tool like Prowler (open source) or AWS Security Hub for continuous compliance checking.
        </IQ>
      </Part>

      <HR />

      <Part>
        <H>Common Mistakes — Identity and Access Management</H>
        <Err
          title="Treating all MFA as equivalent"
          cause="An organisation deploys MFA company-wide — SMS OTP for all users — and considers the MFA requirement satisfied. SMS OTP is vulnerable to SIM swapping and real-time phishing proxies, and provides significantly weaker protection than FIDO2."
          fix="Create an MFA tiering policy: FIDO2/passkeys for all privileged accounts and anyone handling sensitive data; TOTP authenticator apps as a minimum for general users; SMS OTP disabled or used only as fallback. Migrate toward phishing-resistant MFA on a schedule, starting with the highest-risk roles."
        />
        <Err
          title="Shared service accounts across multiple applications"
          cause="A shared 'app-service' account has read/write access to multiple databases. When one application is compromised, the attacker has the service account credentials and can access all other databases using the same account."
          fix="One service account per application. Each account has only the permissions needed by that specific application. Credential rotation is automated. This limits blast radius: compromise of one application does not grant access to anything that application account does not use."
        />
        <Err
          title="Offboarding taking days instead of minutes"
          cause="An HR ticket is created when an employee leaves. The IT ticket queue has a two-day SLA. The terminated employee's SSO account remains active for 48 hours — during which they can access any application they had access to."
          fix="Termination must trigger immediate automated account disable in the SSO IdP — within minutes of HR system update, not days. SCIM automates downstream deprovisioning. Privileged access must be revoked first — within minutes of the termination decision, before the employee is even notified."
        />
        <Err
          title="Never reviewing access or cleaning up orphaned accounts"
          cause="A contractor needed temporary access for a project eighteen months ago. Their account was never deactivated. It sits dormant — but still active — in the system. Attackers find dormant accounts valuable precisely because their activity is not monitored as closely as active users."
          fix="Automated dormancy detection: accounts with no login in 60+ days are flagged, then disabled at 90 days if not recertified. Contractor accounts have explicit expiry dates set at creation. Quarterly access reviews with a 'certify or lose' policy eliminate accumulated permissions over time."
        />
        <Err
          title="Storing IAM secrets and API keys without rotation"
          cause="An AWS IAM user's access key was created during initial project setup. It has never been rotated. If this key is ever exposed — in a log, a screenshot, a git commit — it remains valid indefinitely."
          fix="Rotate all IAM user access keys at least every 90 days. Better: replace IAM user keys with IAM roles where possible (temporary credentials that expire automatically). Enable AWS Config rule access-keys-rotated with a 90-day threshold. Use AWS Secrets Manager rotation for database passwords and application secrets."
        />
      </Part>

      <HR />

      <KeyTakeaways items={[
        'Credentials are involved in 86% of web application breaches. Identity is the new perimeter — credential-based attacks bypass network controls entirely.',
        'TOTP (authenticator apps) is not phishing-resistant — real-time AiTM proxies capture and replay codes in under 30 seconds. FIDO2 hardware keys and passkeys are phishing-resistant because they bind the authentication to the origin domain cryptographically.',
        'RBAC assigns users to roles; roles have permissions. It is auditable and understandable. ABAC adds attribute-based conditions (department, time, location) for fine-grained control where RBAC alone is insufficient.',
        'Just-in-Time access eliminates standing privilege — elevated rights exist only for approved, time-limited windows with automatic revocation, reducing the blast radius of a compromised admin account.',
        'Privileged Access Management requires credential vaulting, session recording, JIT access, and dedicated Privileged Access Workstations for Tier 0 accounts — these controls collectively limit what an attacker can do with stolen admin credentials.',
        'The Joiner-Mover-Leaver lifecycle must be automated: provisioning via SCIM on join, role-swap (not accumulation) on move, and immediate SSO disable on leave — manual processes create orphaned accounts and access creep.',
        'AWS SCPs (Service Control Policies) are preventive guardrails that limit what even full admins can do in child accounts — they enforce organisation-wide security boundaries that cannot be bypassed by local IAM.',
        'Access reviews are required by SOC 2, ISO 27001, and PCI-DSS. Quarterly manager certification with "certify or lose" prevents permission accumulation over time.',
        'Every service account needs an owner, a documented purpose, minimum-privilege permissions, and automated credential rotation. Shared service accounts multiply blast radius.',
        'IAM Access Advisor (AWS) shows the last service access date for each permission — permissions unused for 90+ days should be removed to implement least privilege based on actual usage.',
      ]} />

      <HR />

      <Callout type="info">
        Identity controls determine who can authenticate. In{' '}
        <Link href="/learn/cybersecurity/firewalls-ids-ips">
          Module 30: Firewalls, IDS, and IPS
        </Link>
        , you learn the network control layer: how modern next-generation firewalls work, intrusion detection and prevention systems, WAF architecture, and how to design firewall rules that are both secure and operationally sustainable.
      </Callout>
    </LearnLayout>
  )
}
