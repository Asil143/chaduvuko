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

export default function Module18() {
  return (
    <LearnLayout
      title="Cloud Security — Shared Responsibility, IAM, and Cloud Misconfigurations"
      description="The shared responsibility model, cloud IAM from first principles, the most dangerous cloud misconfigurations, SSRF to metadata theft, and cloud-native detection tools."
      section="Cybersecurity — Module 18"
      readTime="43 min"
      updatedAt="May 2026"
    >
      <Part>
        <P>
          Cloud security is not "IT security but in the cloud." It's a fundamentally different security model with different trust boundaries, different attack surfaces, and different tooling. The shared responsibility model means the cloud provider secures the infrastructure, but the <Hl>customer is responsible for their own data, IAM configuration, and application security</Hl>. The majority of cloud breaches are caused by customer-side misconfigurations, not cloud provider vulnerabilities.
        </P>
        <P>
          This module covers the cloud security model from first principles across AWS, Azure, and GCP: how IAM works and what least privilege means in a cloud context, the top cloud misconfigurations (public S3 buckets, over-permissive roles, exposed metadata services, insecure security groups), how SSRF attacks steal cloud credentials from the metadata service, and how cloud-native tools (AWS GuardDuty, Azure Defender, GCP Security Command Center) detect threats.
        </P>
      </Part>

      <HR />

      <Part>
        <H>The Shared Responsibility Model</H>
        <P>
          Every cloud security conversation starts here. Cloud providers and customers split security responsibility based on what level of the stack each controls. Getting this wrong — assuming the cloud provider protects something that you're actually responsible for — is the root cause of many cloud breaches.
        </P>
        <Block>{`Shared Responsibility Model:

                    Customer Responsible    Provider Responsible
IaaS (EC2, VMs):
  Customer data                 ✓
  Applications                  ✓
  OS patching                   ✓
  Network controls (SGs, NACLs) ✓
  IAM configuration             ✓
  Physical servers                              ✓
  Hypervisor                                    ✓
  Physical datacentre                           ✓
  Network connectivity                          ✓

PaaS (RDS, Azure SQL):
  Customer data                 ✓
  Application code              ✓
  IAM/access control            ✓
  OS patching                               ✓ (provider)
  Database engine patching                  ✓
  Infrastructure                            ✓

SaaS (Office 365, Salesforce):
  Account security / MFA        ✓
  Data governance               ✓
  User access management        ✓
  Application configuration     ✓
  Application security                      ✓
  Infrastructure                            ✓

Common misconceptions:
  ✗ "AWS is secure, so our data is secure"
    → AWS secures the infrastructure. Your S3 bucket ACLs, your IAM policies,
      your RDS public access setting — that's all yours.

  ✗ "We're running in AWS, we don't need to patch"
    → EC2 instances you manage need OS patching. AWS doesn't patch your EC2 OS.
      Only managed services (RDS, Lambda) include provider-managed patching.

  ✗ "The cloud provider will detect if we're hacked"
    → AWS GuardDuty detects threats but requires you to enable it.
      By default, almost no threat detection is enabled in cloud accounts.`}</Block>
      </Part>

      <HR />

      <Part>
        <H>Cloud IAM — Identity and Access Management from First Principles</H>
        <P>
          Cloud IAM is more complex than traditional RBAC because there are more principals (users, roles, service accounts, federated identities), more ways to grant access (policies, trust relationships, resource policies, SCPs), and the blast radius of over-permission is much larger (one misconfigured role can access every resource in an account).
        </P>
        <Block>{`AWS IAM — the core model:

Principals: Who can make requests
  IAM Users:          Named users with long-term credentials (access key ID + secret)
  IAM Roles:          Assumed temporarily; short-lived credentials (up to 12 hours)
  Service Accounts:   EC2 instance profiles, Lambda execution roles, ECS task roles
  Federated identities: SAML/OIDC users (Okta, Azure AD) mapped to IAM roles
  AWS services:       S3, Lambda etc. when interacting with other services

Policies: What actions are allowed
  Identity policies:  Attached to user/role — what they can do
  Resource policies:  Attached to resource (S3 bucket, KMS key) — who can access it
  SCPs:               Service Control Policies — maximum permissions for entire OU
                      (AWS Organizations) — restricts even root account actions
  Permission boundaries: Maximum permissions for a user/role (cannot exceed boundary)

Policy evaluation logic (simplified):
  1. Explicit DENY → access denied (overrides everything)
  2. SCP allow? → if no SCP or SCP allows
  3. Identity policy allow? → if policy grants the action
  4. Resource policy allow? → if resource policy allows
  5. Otherwise → DENY (default deny)

Principle of least privilege in AWS:
  Bad:   AdministratorAccess policy on every developer IAM user
  Better: Specific permissions per service: s3:GetObject, s3:PutObject on specific bucket ARN
  Best:   Roles assumed via SSO; no long-term access keys; scoped to specific resources

  # Find overly permissive policies:
  aws iam list-policies --scope Local | jq '.Policies[].PolicyName'
  aws iam get-policy-version --policy-arn arn:... --version-id v1

  # Find users/roles with AdministratorAccess:
  aws iam list-attached-user-policies --user-name username
  aws iam list-attached-role-policies --role-name rolename`}</Block>
        <Block>{`AWS IAM policy anatomy:

{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowS3ReadOnProduction",
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",       ← Specific action, not s3:*
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::prod-data-bucket",       ← Specific bucket, not *
        "arn:aws:s3:::prod-data-bucket/*"      ← Specific bucket contents
      ],
      "Condition": {
        "StringEquals": {
          "aws:RequestedRegion": "us-east-1"   ← Restrict to specific region
        },
        "Bool": {
          "aws:MultiFactorAuthPresent": "true" ← Require MFA
        }
      }
    },
    {
      "Sid": "DenyDelete",
      "Effect": "Deny",              ← Explicit deny overrides any allow
      "Action": "s3:DeleteObject",
      "Resource": "arn:aws:s3:::prod-data-bucket/*"
    }
  ]
}

Common over-permissive policy patterns to fix:
  "Action": "*"                    → Wildcard action — grants ALL permissions
  "Resource": "*"                  → Wildcard resource — applies to ALL resources
  "Action": "iam:*"               → Full IAM control — can create any user/role/policy
  "Action": "sts:AssumeRole"      → Can assume any role — potential privilege escalation
  Principal: {"AWS": "*"}         → Anyone can assume this role (on resource policy)`}</Block>
      </Part>

      <HR />

      <Part>
        <H>Top Cloud Misconfigurations</H>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Misconfiguration</th>
              <th style={s.th}>Risk</th>
              <th style={s.th}>How to Detect</th>
              <th style={s.th}>Fix</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Public S3 buckets', 'Public read/write of sensitive data — direct data breach', 'aws s3api get-bucket-acl / Macie', 'Block Public Access at account level'],
              ['Long-term access keys', 'Exposed keys = full programmatic access', 'aws iam list-access-keys; check age > 90 days', 'Use IAM roles + SSO; no long-term keys'],
              ['EC2 instance metadata exposed + SSRF', 'SSRF → metadata → instance role credentials', 'IMDSv2 disabled check; test SSRF', 'Enforce IMDSv2; deny metadata access from app'],
              ['Overly permissive security groups', 'Expose SSH/RDP/databases to 0.0.0.0/0', 'AWS Config rule: INCOMING_SSH_DISABLED', 'Source restrict; use bastion/SSM'],
              ['No MFA on root account', 'Root account full access without MFA', 'AWS Security Hub check', 'Enable virtual or hardware MFA on root'],
              ['Unencrypted data at rest', 'S3, EBS, RDS without encryption — data exposure', 'AWS Config: ENCRYPTED_VOLUMES', 'Enable default encryption; use KMS CMKs'],
              ['Logging disabled', 'No CloudTrail = no audit trail for forensics', 'Check CloudTrail is enabled in all regions', 'Enable CloudTrail multi-region, all services'],
              ['Public AMIs with sensitive data', 'AMI shared publicly, contains credentials/data', 'Check AMI permissions', 'Scrub AMIs before sharing; use private only'],
              ['IAM role sts:AssumeRole * principal', 'Any AWS account can assume this role', 'Audit resource policies for Principal: *', 'Restrict Principal to specific account/role ARNs'],
            ].map(([m, r, d, f]) => (
              <tr key={m}>
                <td style={{ ...s.td, color: C, fontWeight: 600 }}>{m}</td>
                <td style={s.td}>{r}</td>
                <td style={s.td}>{d}</td>
                <td style={s.td}>{f}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Block>{`# Most dangerous: Public S3 buckets — the Capital One, Twitch, etc. pattern

# Check if account has S3 Public Access Block enabled (should be YES):
aws s3control get-public-access-block --account-id 123456789012

# Expected output (all true):
{
    "PublicAccessBlockConfiguration": {
        "BlockPublicAcls": true,        ← Block any public ACLs
        "IgnorePublicAcls": true,       ← Ignore even existing public ACLs
        "BlockPublicPolicy": true,      ← Block bucket policies granting public access
        "RestrictPublicBuckets": true   ← Restrict access to public buckets
    }
}

# Enable at account level (prevents any S3 bucket in the account being made public):
aws s3control put-public-access-block --account-id 123456789012 \
  --public-access-block-configuration BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true

# Enable for specific bucket:
aws s3api put-public-access-block --bucket my-bucket \
  --public-access-block-configuration BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true

# Scan for existing public buckets (use AWS Config or):
for bucket in $(aws s3 ls | awk '{print $3}'); do
    acl=$(aws s3api get-bucket-acl --bucket $bucket 2>/dev/null)
    if echo "$acl" | grep -q "AllUsers\|AuthenticatedUsers"; then
        echo "PUBLIC: $bucket"
    fi
done`}</Block>
      </Part>

      <HR />

      <Part>
        <H>SSRF to Cloud Credential Theft — The Metadata Service Attack</H>
        <P>
          The <Hl>instance metadata service (IMDS)</Hl> is an HTTP service available at 169.254.169.254 on every EC2 instance, Azure VM, and GCP compute instance. It provides instance-specific information including the IAM role credentials attached to the instance. A <Hl>Server-Side Request Forgery (SSRF)</Hl> vulnerability in an application allows attackers to make the server fetch this URL and return the credentials — giving the attacker the instance's cloud permissions.
        </P>
        <Block>{`SSRF → IMDS attack (Capital One breach pattern, 2019):

Vulnerable application:
  GET /fetch?url=https://example.com/image.jpg

Attacker's request:
  GET /fetch?url=http://169.254.169.254/latest/meta-data/iam/security-credentials/

Application makes server-side request to the metadata URL.
Response: "InstanceRole"  ← Role name

Follow-up request:
  GET /fetch?url=http://169.254.169.254/latest/meta-data/iam/security-credentials/InstanceRole

Response (the actual credentials):
{
  "Code": "Success",
  "Type": "AWS-HMAC",
  "AccessKeyId": "ASIA...",     ← Temporary access key
  "SecretAccessKey": "...",     ← Temporary secret key
  "Token": "...",               ← Session token (required with temp creds)
  "Expiration": "2024-01-01T12:00:00Z"
}

Attacker uses credentials externally:
  AWS_ACCESS_KEY_ID=ASIA... \
  AWS_SECRET_ACCESS_KEY=... \
  AWS_SESSION_TOKEN=... \
  aws s3 ls  ← List all buckets the role can access

Capital One breach:
  SSRF in WAF (Modsecurity misconfiguration) → IMDS credentials → S3 access
  100 million customer records exposed
  Role had excessive S3 permissions (should not have had access to that data)
  Detection: Credentials used from non-EC2 IP (CloudTrail showed unusual source)`}</Block>
        <Block>{`Defence against IMDS attacks:

1. IMDSv2 — Require session-oriented metadata (PUT before GET):
   IMDSv1: Simple GET to 169.254.169.254 works immediately
   IMDSv2: Must first PUT to get a session token (requires custom headers)
           SSRF using simple GET requests cannot get the token
           Only full SSRF vulnerabilities (arbitrary HTTP with custom headers) work

   Enforce IMDSv2:
   aws ec2 modify-instance-metadata-options \
     --instance-id i-xxx \
     --http-tokens required \
     --http-endpoint enabled

   Also set at launch time via LaunchTemplate:
   "MetadataOptions": {
     "HttpTokens": "required",    ← IMDSv2 required
     "HttpEndpoint": "enabled"
   }

2. Restrict network access to metadata service from application processes:
   iptables -A OUTPUT -m owner --uid-owner www-data -d 169.254.169.254 -j DROP
   # Prevents web application process from reaching metadata service

3. Least-privilege IAM roles:
   Even if credentials are stolen, limit what they can do.
   EC2 web server role should only have S3 access to its specific bucket.
   Not: S3 full access to all buckets.

4. Application-level input validation:
   Deny URL patterns that match 169.254.x.x, 10.x.x.x, 172.16-31.x.x, 192.168.x.x
   URL allowlist if possible: only allow specific external domains

5. Detection (AWS CloudTrail):
   Alert on: EC2 instance role credentials used from non-EC2 IP address
   (CloudTrail logs sourceIPAddress for all API calls)
   Role credentials used from a laptop/attacker IP = likely SSRF exploitation`}</Block>
      </Part>

      <HR />

      <Part>
        <H>AWS Security Groups and Network Security</H>
        <P>
          <Hl>Security Groups</Hl> in AWS are stateful, instance-level firewalls. Unlike traditional firewalls (which work at the subnet level), security groups work at the EC2 instance level — each instance can have different rules. This enables fine-grained "service-to-service" rules rather than "subnet-to-subnet."
        </P>
        <Block>{`Security Group best practices:

Most dangerous finding: SSH/RDP open to 0.0.0.0/0
  aws ec2 describe-security-groups --filters \
    "Name=ip-permission.from-port,Values=22" \
    "Name=ip-permission.cidr,Values=0.0.0.0/0"
  → Any result means SSH is open to the entire internet

Correct patterns:

Web tier (public-facing):
  Inbound: 443 from 0.0.0.0/0    ← HTTPS from internet
           80  from 0.0.0.0/0    ← HTTP from internet (redirect to 443)
  Outbound: All to 0.0.0.0/0     ← Outbound allowed

App tier (internal):
  Inbound: 8080 from web-tier-sg  ← Only from web tier security group
           (NOT from 0.0.0.0/0 or any CIDR range — from specific SG)
  Outbound: 5432 to db-tier-sg
            443 to 0.0.0.0/0     ← For API calls to external services

Database tier (private subnet):
  Inbound: 5432 from app-tier-sg  ← Only PostgreSQL from app tier
  Outbound: None needed

Admin access (bastion or SSM):
  No direct SSH/RDP to instances
  AWS Systems Manager (SSM) Session Manager:
    - No open ports needed
    - No bastion host needed
    - Full audit log of all session commands
    - IAM-controlled access (who can start sessions)
  aws ssm start-session --target i-0123456789abcdef`}</Block>
      </Part>

      <HR />

      <Part>
        <H>Cloud IAM Privilege Escalation</H>
        <P>
          Cloud IAM privilege escalation is a set of techniques where a lower-privileged identity gains higher privileges by abusing IAM policies. Unlike AD (where the attack is often credential theft), cloud IAM escalation is often about <Hl>policy abuse</Hl> — using permitted actions to grant yourself more permissions.
        </P>
        <Block>{`AWS IAM privilege escalation techniques:

1. iam:AttachUserPolicy — Attach admin policy to yourself
   Attacker has: iam:AttachUserPolicy permission
   Attack:
     aws iam attach-user-policy --user-name attacker \
       --policy-arn arn:aws:iam::aws:policy/AdministratorAccess
   Result: Attacker now has full admin

2. iam:CreatePolicyVersion — Create new policy version with more permissions
   Attacker has: iam:CreatePolicyVersion on a policy attached to them
   Attack: Create a new version with Action:* Resource:*
   Result: Policy escalated to admin level

3. iam:PassRole + ec2:RunInstances — Launch instance with admin role
   Attacker has: iam:PassRole on admin role, ec2:RunInstances
   Attack: Launch EC2 instance with admin instance profile
   Result: Instance has admin credentials via IMDS

4. lambda:CreateFunction + iam:PassRole — Create Lambda with admin role
   Attacker has: lambda:CreateFunction, iam:PassRole, lambda:InvokeFunction
   Attack: Create Lambda function that calls iam:CreateUser + AttachPolicy
           Invoke the Lambda (runs as admin role)
   Result: New admin user created

5. sts:AssumeRole — Assume a more-privileged role
   Attacker has: sts:AssumeRole on a role with broader permissions
   Check: which roles trust the attacker's principal
   aws iam get-role --role-name HighPrivRole | jq '.Role.AssumeRolePolicyDocument'

Prevention:
  - Permission boundaries: Prevent users from granting permissions they don't have
  - Deny iam:* for non-admin roles: Prevent IAM self-modification
  - SCPs: Restrict privilege escalation paths at organization level
  - Pacu (AWS penetration testing framework) automates escalation path discovery`}</Block>
      </Part>

      <HR />

      <Part>
        <H>Cloud-Native Security Tools</H>
        <P>
          Each major cloud provider offers native security services that detect threats and misconfigurations. These are the first layer of cloud security monitoring — they should always be enabled, often for free or minimal cost.
        </P>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Provider</th>
              <th style={s.th}>Service</th>
              <th style={s.th}>What It Detects</th>
              <th style={s.th}>Data Source</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['AWS', 'GuardDuty', 'Credential abuse, instance compromise, crypto mining, backdoor communication, unusual API calls', 'VPC Flow Logs, CloudTrail, DNS logs'],
              ['AWS', 'SecurityHub', 'Aggregates findings from GuardDuty, Inspector, Macie; CIS benchmark compliance', 'Multiple AWS services'],
              ['AWS', 'CloudTrail', 'All API calls — who did what, when, from where (forensics baseline)', 'AWS API audit log'],
              ['AWS', 'Macie', 'Sensitive data discovery in S3 (PII, credentials, financial data)', 'S3 object content analysis'],
              ['AWS', 'Config', 'Configuration compliance — detects public S3, unencrypted volumes, open SGs', 'AWS resource configurations'],
              ['Azure', 'Defender for Cloud', 'VM threats, container threats, SQL injection attempts, identity threats', 'Azure Monitor, activity logs, Defender agents'],
              ['Azure', 'Microsoft Sentinel', 'SIEM/SOAR — correlate Azure + on-prem + M365 signals', 'Multiple data connectors'],
              ['GCP', 'Security Command Center', 'Misconfigurations, threats, vulnerability findings across GCP services', 'Cloud Audit Logs, Security Health Analytics'],
              ['All', 'CSPM tools', 'Continuous misconfiguration detection (Wiz, Prisma Cloud, Orca)', 'Cloud APIs (agentless)'],
            ].map(([provider, svc, det, src]) => (
              <tr key={svc}>
                <td style={{ ...s.td, color: C, fontWeight: 600 }}>{provider}</td>
                <td style={s.td}>{svc}</td>
                <td style={s.td}>{det}</td>
                <td style={s.td}>{src}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Block>{`# AWS GuardDuty key findings to alert on immediately:

UnauthorizedAccess:IAMUser/MaliciousIPCaller
  → API calls from a known-malicious IP address

UnauthorizedAccess:EC2/SSHBruteForce
  → Brute force against SSH from external IP

Recon:IAMUser/MaliciousIPCaller.Custom
  → Enumeration from known-bad IP

PrivilegeEscalation:IAMUser/AdministrativePermissions
  → User attempted to give themselves admin rights

Persistence:IAMUser/UserPermissions
  → IAM user created new access keys

CredentialAccess:EC2/MetadataDNSRebind
  → EC2 metadata access attempt via DNS rebinding

CryptoCurrency:EC2/BitcoinTool.B!DNS
  → EC2 instance communicating with known cryptomining domains

Exfiltration:S3/MaliciousIPCaller
  → S3 data access from known-malicious IP

# Enable GuardDuty:
aws guardduty create-detector --enable --finding-publishing-frequency FIFTEEN_MINUTES

# Alert on all HIGH/CRITICAL findings → SNS → PagerDuty/Slack`}</Block>
      </Part>

      <HR />

      <Part>
        <H>CloudTrail — The Forensic Record of Everything</H>
        <P>
          <Hl>AWS CloudTrail</Hl> records all API calls made to your AWS account — who called what API, from which IP, at what time, with which parameters, and whether it succeeded. This is the foundational audit log for incident response, forensics, and threat detection in AWS.
        </P>
        <Block>{`CloudTrail configuration best practices:

# Enable CloudTrail for ALL regions (not just your primary region):
aws cloudtrail create-trail \
  --name org-trail \
  --s3-bucket-name cloudtrail-logs-bucket \
  --is-multi-region-trail \           ← All regions
  --include-global-service-events \  ← IAM, STS, Route 53 (global services)
  --enable-log-file-validation       ← Detect log tampering

# Also record data events (object-level S3 access):
aws cloudtrail put-event-selectors \
  --trail-name org-trail \
  --event-selectors '[{
    "ReadWriteType": "All",
    "IncludeManagementEvents": true,
    "DataResources": [{
      "Type": "AWS::S3::Object",
      "Values": ["arn:aws:s3:::sensitive-bucket/"]
    }]
  }]'

# Query CloudTrail with Athena (for investigation):
# Find all API calls by a specific user in the last 24 hours:
SELECT eventTime, eventName, sourceIPAddress, errorCode
FROM cloudtrail_logs
WHERE userIdentity.userName = 'compromised-user'
  AND eventTime > date_add('day', -1, now())
ORDER BY eventTime;

# Find all S3 GetObject calls on sensitive bucket:
SELECT eventTime, userIdentity.arn, sourceIPAddress, requestParameters.key
FROM cloudtrail_logs
WHERE eventName = 'GetObject'
  AND requestParameters.bucketName = 'prod-sensitive-data'
ORDER BY eventTime DESC
LIMIT 100;

# Find all new IAM users/roles created in last week:
SELECT eventTime, eventName, userIdentity.arn, responseElements
FROM cloudtrail_logs
WHERE eventName IN ('CreateUser', 'CreateRole', 'AttachUserPolicy', 'AttachRolePolicy')
  AND eventTime > date_add('day', -7, now())
ORDER BY eventTime;`}</Block>
      </Part>

      <HR />

      <Part>
        <H>Cloud Security Posture Management (CSPM)</H>
        <P>
          <Hl>CSPM</Hl> tools continuously assess cloud environments for misconfigurations against security benchmarks (CIS AWS Foundations, NIST, PCI-DSS, SOC 2). They run agentlessly by reading cloud APIs and comparing resource configurations against rules.
        </P>
        <Block>{`CSPM checklist — CIS AWS Foundations Benchmark:

IAM:
  [ ] Root account has no active access keys
  [ ] Root account has MFA enabled
  [ ] IAM password policy: length ≥ 14, complexity enabled, rotation 90 days
  [ ] MFA enabled for all IAM users with console access
  [ ] No access keys older than 90 days
  [ ] No unused credentials (inactive > 45 days)
  [ ] Access Analyzer enabled (detects externally accessible resources)

Logging:
  [ ] CloudTrail enabled in all regions
  [ ] CloudTrail logs validated (integrity check enabled)
  [ ] CloudTrail logs encrypted (KMS)
  [ ] CloudWatch alarms for:
      - Root account usage
      - Unauthorised API calls
      - MFA console sign-in without MFA
      - IAM policy changes
      - Security Group changes

Networking:
  [ ] No security groups with 0.0.0.0/0 → port 22 (SSH)
  [ ] No security groups with 0.0.0.0/0 → port 3389 (RDP)
  [ ] Default VPC deleted or restricted
  [ ] VPC Flow Logs enabled
  [ ] Route tables not exposing private subnets to internet

Storage:
  [ ] S3 Block Public Access enabled at account level
  [ ] No S3 buckets publicly readable or writable
  [ ] S3 buckets with sensitive data encrypted (SSE-KMS)
  [ ] EBS volumes encrypted by default
  [ ] RDS instances not publicly accessible
  [ ] RDS backups encrypted

# Automated check with ScoutSuite (open source CSPM):
pip install scoutsuite
scout aws --report-dir ./scout_results
# Opens HTML report with findings per service`}</Block>
      </Part>

      <HR />

      <Part>
        <H>Interview Questions</H>

        <IQ q="Explain the shared responsibility model. Give an example of what the cloud provider is responsible for and what the customer is responsible for.">
          The shared responsibility model divides security responsibility between the cloud provider and the customer based on what layer of the stack each controls. The cloud provider (AWS, Azure, GCP) is responsible for security of the cloud infrastructure itself: the physical datacentres, the servers, the network hardware, the virtualisation layer (hypervisor), and the managed service components like RDS's underlying database engine or Lambda's execution environment. Customers never see or configure these layers.
          <br /><br />
          The customer is responsible for security in the cloud — everything built on top of that infrastructure: the data they store, the applications they deploy, the OS and software on EC2 instances, IAM configuration (who has access to what), network security groups and firewall rules, encryption settings (whether data at rest and in transit is encrypted), and application-level security (no SQL injection, proper authentication). A classic example: AWS guarantees that S3 is available and its internal encryption key management is secure. But if a customer configures their S3 bucket with a public access policy that allows anyone to read it, AWS will faithfully return the data to anyone who asks — the customer made the misconfiguration and bears responsibility for the breach.
        </IQ>

        <IQ q="An EC2 instance has an SSRF vulnerability. Walk me through how an attacker would use it to access the AWS metadata service and what they could gain.">
          The attack exploits the fact that the EC2 instance metadata service is accessible from any process running on the instance at 169.254.169.254. If the application makes server-side HTTP requests based on user input (SSRF), an attacker can provide the metadata URL as the target. Step one: the attacker sends a request like GET /fetch?url=http://169.254.169.254/latest/meta-data/iam/security-credentials/, and the application makes a server-side HTTP GET to that address. The response lists the IAM role name attached to the instance. Step two: the attacker requests /latest/meta-data/iam/security-credentials/RoleName and receives a JSON response containing a temporary Access Key ID, Secret Access Key, and Session Token. These credentials are valid for the remaining lifetime of the credential rotation cycle (usually one hour).
          <br /><br />
          With these credentials, the attacker authenticates to AWS APIs from their own machine. What they can do depends entirely on what IAM permissions the instance role has. If the role has broad S3 permissions (as in the Capital One breach), they can list and download all buckets. If the role has EC2 permissions, they can launch instances or snapshot EBS volumes. If the role has IAM permissions, they can create new users or escalate privileges. The defence is twofold: fix the SSRF vulnerability in the application (validate and restrict URLs that the application will fetch), and enforce IMDSv2 on the instance (which requires a PUT request with custom headers to get a metadata token, preventing simple GET-based SSRF from working).
        </IQ>

        <IQ q="What is AWS GuardDuty and what does it detect? How is it different from AWS Config?">
          AWS GuardDuty is a threat detection service that analyses data sources — VPC Flow Logs, CloudTrail events, DNS query logs, and EKS audit logs — for behavioural patterns indicating active threats. It uses machine learning and threat intelligence (known-malicious IP lists, domain reputation) to detect things like compromised EC2 instances communicating with C2 servers, unusual IAM API calls from unexpected locations, credential abuse from known-bad IPs, SSH brute force, and crypto-mining activity.
          <br /><br />
          AWS Config is a configuration compliance and change tracking service. It records the configuration state of AWS resources over time and evaluates them against rules — was this S3 bucket public yesterday? Does this EC2 instance have the approved AMI? Is this security group exposing port 22 to 0.0.0.0/0? Config detects misconfigurations and drift from a desired state; it doesn't analyse traffic or behaviour.
          <br /><br />
          They are complementary. Config tells you "this security group has an open SSH port" (a misconfiguration that may or may not be actively exploited). GuardDuty tells you "someone from a known-malicious IP successfully authenticated to this instance via SSH" (active exploitation). You want both: Config to find and remediate misconfigurations proactively, GuardDuty to detect active threats that slipped through your configuration controls.
        </IQ>

        <IQ q="How does IAM privilege escalation work in AWS? Give a concrete example.">
          IAM privilege escalation occurs when a lower-privileged identity uses permitted actions to grant itself or another identity higher privileges. Unlike traditional privilege escalation (exploiting a vulnerability), cloud IAM escalation abuses legitimate API calls that were granted with insufficient scope restriction.
          <br /><br />
          A concrete example: a developer has the IAM permission iam:AttachUserPolicy (probably granted to manage user permissions for their team). An attacker who compromises this developer's access key can run: aws iam attach-user-policy --user-name attacker-controlled-user --policy-arn arn:aws:iam::aws:policy/AdministratorAccess. This attaches the built-in AdministratorAccess managed policy to a user they control, giving them full admin access to the AWS account. The API call succeeds because iam:AttachUserPolicy was permitted — but it was permitted without proper scope restriction.
          <br /><br />
          The defence: permission boundaries. A permission boundary is a maximum permissions cap on an IAM entity. Even if a developer has iam:AttachUserPolicy, a permission boundary prevents them from granting permissions that exceed their own permission boundary. For example: developer has permission boundary of S3+EC2 access; even if they attach AdministratorAccess policy to a user, that user's effective permissions are still capped at S3+EC2 because the boundary applies. Additionally, Service Control Policies at the AWS Organization level can prevent specific dangerous IAM actions across the entire organization, regardless of individual account IAM policies.
        </IQ>

        <IQ q="A startup says 'we don't need to worry about cloud security yet, we'll add it when we have enterprise customers.' What are the risks of this approach?">
          The startup is accepting real risk with real cost — not hypothetical future risk. Cloud misconfigurations are actively exploited, often within hours or days of deployment, by automated scanning tools that continuously scan public IP space and cloud provider IP ranges for exposed databases, open S3 buckets, and unsecured APIs. A public S3 bucket or an unprotected MongoDB instance can be found and exfiltrated within hours of deployment — these are not targeted attacks, they're automated opportunistic attacks.
          <br /><br />
          The cost of a breach at startup stage is potentially fatal: customer data exposure damages trust before trust is established, breach notification requirements apply regardless of company size (GDPR, CCPA, state breach laws), the remediation and legal costs can exceed the company's runway, and enterprise customer due diligence will discover the breach history and use it as a reason not to buy. Many enterprise customers now require SOC 2 Type II certification, which audits security controls — a company that adds security controls "later" after development has to remediate existing architecture rather than build correctly from the start.
          <br /><br />
          The correct approach: enable free security controls from day one — GuardDuty, SecurityHub, CloudTrail, S3 Block Public Access, MFA on root, no public access to databases. These cost nothing or close to nothing and prevent the most common breaches. Security architecture decisions (IAM design, network segmentation, encryption) are cheaper to implement correctly during initial build than to retrofit later.
        </IQ>
      </Part>

      <HR />

      <Part>
        <H>Error Library — Common Mistakes</H>

        <Err
          title="Using long-term IAM access keys for automation"
          cause="Long-term access keys (AKID + secret) don't expire. If they're in source code, environment variables, CI/CD logs, or developer laptops, they're a persistent, credential-stuffable risk. Keys committed to git are discovered by automated scanners (including GitHub's own secret scanning and attacker-run tools like Trufflehog) within minutes of commit."
          fix="Use IAM roles instead of access keys wherever possible. EC2/Lambda/ECS can assume roles without any credentials. For CI/CD, use OIDC federation (GitHub Actions → AWS, GitLab → AWS) to get short-lived tokens instead of long-term keys. For human users, use AWS SSO (IAM Identity Center) with short-lived credentials. If long-term keys are unavoidable, rotate every 90 days and use AWS Secrets Manager or Parameter Store, not environment variables or code."
        />

        <Err
          title="Enabling IMDSv2 but not enforcing it (leaving IMDSv1 available)"
          cause="IMDSv2 can be configured in optional mode (http-tokens=optional) where both IMDSv1 and IMDSv2 work. This provides no SSRF protection — attackers can still use simple GET requests to the metadata service without the IMDSv2 token. Many teams enable IMDSv2 in optional mode thinking they've addressed the SSRF risk."
          fix="Set http-tokens=required (not optional) to enforce IMDSv2. Verify: aws ec2 describe-instances --query 'Reservations[].Instances[].MetadataOptions'. The HttpTokens field should be 'required', not 'optional'. Also set this in your launch templates and Auto Scaling group configurations so new instances inherit the enforcement. Test: from inside the instance, curl http://169.254.169.254/latest/meta-data/ should return 401 without the IMDSv2 token."
        />

        <Err
          title="Not enabling CloudTrail in all regions"
          cause="AWS allows creating CloudTrail trails scoped to a single region. Teams often create a trail in their primary region and assume they have full coverage. Attackers aware of this may use a non-monitored region as a staging area — creating IAM users, spinning up instances, or accessing resources in a region without audit logging. Global services (IAM, STS, Route 53) need to be explicitly included even in multi-region trails."
          fix="Create a multi-region trail with IsMultiRegionTrail=true and IncludeGlobalServiceEvents=true. This single trail captures all API calls across all regions plus global services. Store logs in a separate security-dedicated S3 bucket with restricted access (CloudTrail log bucket should not be accessible from the account being monitored — use a separate logging account in AWS Organizations)."
        />

        <Err
          title="Granting iam:* or * permissions to non-administrative roles"
          cause="Developers need to manage some IAM resources (creating service accounts for their applications, managing policies for their microservices). The quick solution is granting iam:* — which also grants the ability to create admin users, attach admin policies, and escalate privileges. This is an over-privilege pattern that creates privilege escalation paths."
          fix="Use permission boundaries to safely delegate IAM permissions. Grant iam:CreateUser and iam:AttachUserPolicy but with a Condition that restricts the policies that can be attached to a specific boundary. Alternatively, use a specific set of IAM permissions (iam:CreateServiceSpecificCredential, iam:TagUser) without blanket iam:*. Tools like IAM Access Analyzer can audit what permissions are actually used and identify over-permissions."
        />

        <Err
          title="Treating cloud security as a one-time setup"
          cause="Cloud environments are dynamic — new services are deployed, new IAM roles are created, security groups are modified for 'quick fixes', public S3 buckets are created for 'temporary' file sharing. A security configuration correct in January may be misconfigured by February without anyone noticing. Many breaches happen through configurations that were secure at deployment but drifted over time."
          fix="Implement continuous compliance monitoring with AWS Config rules or a CSPM tool (Wiz, Prisma Cloud, Orca Security, Lacework). Configure alerts for drift from your security baseline: any new public S3 bucket, any new security group with open SSH/RDP to 0.0.0.0/0, any new access key older than 90 days. Review GuardDuty findings weekly. This turns cloud security from a point-in-time project into an ongoing operational process."
        />
      </Part>

      <HR />

      <KeyTakeaways
        items={[
          'The shared responsibility model: cloud providers secure the infrastructure (physical, hypervisor, network hardware); customers secure everything built on it — IAM, data, applications, OS patching on EC2, network security groups.',
          'IAM roles with temporary credentials are always preferable to long-term access keys. Use IAM roles for EC2/Lambda, OIDC federation for CI/CD, and AWS SSO for human users. Long-term keys are a persistent breach risk.',
          'SSRF vulnerabilities in web applications allow attackers to reach the EC2 metadata service (169.254.169.254) and steal the instance role\'s temporary credentials. Enforce IMDSv2 (http-tokens=required) and least-privilege roles.',
          'Public S3 buckets are the most common cloud data breach vector. Enable S3 Block Public Access at the account level — this blocks any bucket from being made public even if a misconfigured policy attempts it.',
          'CloudTrail is the foundational audit log for all AWS API calls. Enable it in all regions with global services, encrypt logs, and enable log file validation. Without CloudTrail, incident response and forensics are nearly impossible.',
          'AWS GuardDuty detects active threats (credential abuse, crypto mining, C2 communication) by analysing VPC Flow Logs, CloudTrail, and DNS logs. AWS Config detects misconfigurations by checking resource configurations against rules. Both are needed.',
          'IAM privilege escalation abuses legitimate permissions to gain higher access — iam:AttachUserPolicy without a permission boundary allows granting oneself AdministratorAccess. Permission boundaries cap the maximum permissions any user or role can have.',
          'The IMDS attack (Capital One breach pattern): SSRF → 169.254.169.254 → IAM role credentials → access to S3/EC2/IAM APIs from attacker\'s machine. Defence: IMDSv2 required + least-privilege role + no SSRF in application.',
          'CSPM (Cloud Security Posture Management) tools continuously check cloud configurations against benchmarks. Even the built-in AWS SecurityHub with CIS AWS Foundations standard provides automated misconfiguration detection at minimal cost.',
          'Security groups should use security group ID references (sg-xxx) for east-west rules rather than CIDR ranges — when app tier instances scale out, the security group rule automatically applies to all new instances without updating CIDR ranges.',
        ]}
      />

      <HR />

      <div style={{ background: 'var(--code-bg)', borderRadius: 12, padding: '28px 32px', marginTop: 40 }}>
        <div style={{ fontSize: 13, color: C, fontWeight: 700, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
          Up Next — Module 19
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--heading)', marginBottom: 12 }}>
          API and Container Security
        </div>
        <p style={{ ...s.p, marginBottom: 20 }}>
          In Module 19, you learn the security model of modern application infrastructure: REST and GraphQL API vulnerabilities, JWT attacks, OAuth misconfigurations, Docker container security (escape techniques and defences), Kubernetes RBAC and network policies, and supply chain security for container images.
        </p>
        <Link
          href="/learn/cybersecurity/api-container-security"
          style={{
            display: 'inline-block',
            background: C,
            color: '#fff',
            padding: '12px 28px',
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 15,
            textDecoration: 'none',
          }}
        >
          Continue to Module 19 →
        </Link>
      </div>
    </LearnLayout>
  )
}
