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

export default function Module31() {
  return (
    <LearnLayout
      title="SIEM and Log Analysis — Finding Attacks in the Noise"
      description="Log sources, centralised collection architecture, SIEM query languages (Splunk SPL, Elastic KQL, Sentinel KQL), detection rule writing, alert triage methodology, and the essential Windows Event IDs that every SOC analyst must know."
      section="Cybersecurity — Module 31"
      readTime="34 min"
      updatedAt="May 2026"
    >
      <Part>
        <P>
          Every security event leaves a trace in a log somewhere. The attacker who ran mimikatz generated Windows Event ID 4624 (logon) and 4648 (explicit credential use). The ransomware encrypting files generated thousands of file modification events. The insider exfiltrating data generated unusual cloud storage access events. The challenge is not whether the evidence exists — it almost always does — but whether you are collecting the right logs, storing them long enough, and have queries that surface the signal from millions of events per day.
        </P>
        <P>
          A <Hl>Security Information and Event Management (SIEM)</Hl> system centralises log collection, provides search and correlation capabilities, and generates alerts. Understanding how to use one — writing detection queries, building dashboards, and triaging alerts — is the primary skill of a SOC (Security Operations Center) analyst, one of the most in-demand roles in the US security market.
        </P>
      </Part>

      <HR />

      <Part>
        <H>Log Sources — What to Collect and Why</H>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Log source</th>
              <th style={s.th}>Key events it captures</th>
              <th style={s.th}>Attack detection value</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Windows Security Event Log', 'Logon/logoff (4624/4634), account changes (4720/4738), privilege use (4672), process creation (4688)', 'Credential attacks, lateral movement, privilege escalation, persistence'],
              ['Active Directory (DC logs)', 'Kerberos TGT requests (4768/4769), DCSync (4662), account lockout (4740), group membership changes (4728)', 'Kerberoasting, Golden Ticket, lateral movement, admin group changes'],
              ['Firewall/NGFW logs', 'Allow/deny decisions, connection details, application ID, user identity', 'C2 beaconing, data exfiltration, port scanning, lateral movement'],
              ['Web server access logs', 'HTTP method, URI, status code, user agent, source IP', 'SQLi attempts, path traversal, brute force, webshell usage'],
              ['DNS logs', 'Query name, query type, response, client IP', 'DNS tunneling (long subdomain queries), DGA domains, C2 over DNS'],
              ['Cloud provider logs', 'AWS CloudTrail: API calls, IAM changes, S3 access; Azure AD: sign-ins, MFA events', 'Cloud privilege escalation, data exfiltration, IAM abuse'],
              ['EDR/AV logs', 'Process creation, network connections, file operations, code injection attempts', 'Malware execution, credential dumping, living-off-the-land techniques'],
              ['Authentication logs (Okta/Entra)', 'Login success/failure, MFA challenges, SSO events, unusual locations', 'Credential stuffing, impossible travel, AiTM phishing success'],
            ].map(([s2, k, a]) => (
              <tr key={s2}>
                <td style={{ ...s.td, fontWeight: 600 }}>{s2}</td>
                <td style={s.td}>{k}</td>
                <td style={{ ...s.td, color: '#2ed573', fontSize: 13 }}>{a}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <ProTip>
          The most overlooked high-value log source is DNS. Attackers use DNS for C2 (DNS tunneling), use Domain Generation Algorithms (DGA) for C2 resilience, and all internal tools resolve names. Centralising DNS resolver logs — which many organisations do not do — catches malware that successfully evades every other detection layer.
        </ProTip>
      </Part>

      <HR />

      <Part>
        <H>SIEM Architecture — Collecting at Scale</H>
        <Block>{`SIEM Architecture Overview:

┌──────────────────────────────────────────────────────────────┐
│ LOG SOURCES                                                  │
│ Windows Events → WEC (Windows Event Collector) or agent     │
│ Linux syslog → rsyslog/syslog-ng → syslog forwarder         │
│ Network devices → Syslog UDP/TCP 514 or SNMP                │
│ Cloud → CloudTrail S3 → S3 ingestion connector              │
│ Applications → structured JSON logs → Kafka or Kinesis      │
└──────────────────────┬───────────────────────────────────────┘
                       │
┌──────────────────────┴───────────────────────────────────────┐
│ LOG COLLECTION LAYER                                         │
│ Elastic Beats / Fluentd / Cribl / Splunk Universal Forwarder │
│ Responsibilities: parse, filter, enrich, batch, compress     │
│ Output: structured JSON events with normalized field names   │
└──────────────────────┬───────────────────────────────────────┘
                       │
┌──────────────────────┴───────────────────────────────────────┐
│ SIEM / DATA LAKE                                             │
│ Splunk: indexed data, SPL queries, correlation rules         │
│ Elastic SIEM (ELK): Elasticsearch + Kibana + detection rules │
│ Microsoft Sentinel: KQL queries, analytics rules, playbooks  │
│ Google Chronicle: YARA-L rules, petabyte-scale retention    │
│                                                              │
│ Retention requirements:                                      │
│ - PCI-DSS: 12 months (3 months online)                      │
│ - HIPAA:   6 years                                          │
│ - SOC 2:   typically 12 months minimum                      │
└──────────────────────────────────────────────────────────────┘


# Log volume estimates (to size SIEM storage):
# Windows endpoint:      ~1,000–5,000 events/day/host
# Domain Controller:     ~100,000–500,000 events/day
# Firewall (enterprise): ~1,000,000–50,000,000 events/day
# Web server (busy):     ~100,000–1,000,000 events/day

# Rule of thumb: 1 GB/day per 1,000 events at ~1KB/event average`}</Block>
      </Part>

      <HR />

      <Part>
        <H>Essential Windows Event IDs for SOC Analysts</H>
        <P>
          The following Event IDs form the backbone of Windows threat detection. Every SOC analyst must know these by number and know what suspicious patterns in them indicate.
        </P>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Event ID</th>
              <th style={s.th}>Description</th>
              <th style={s.th}>Suspicious indicator</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['4624', 'Successful logon', 'Logon Type 3 (network) or Type 10 (remote interactive) from unexpected IPs or at unusual hours'],
              ['4625', 'Failed logon', 'Many failures across many accounts from one source = password spray; many failures against one account = brute force'],
              ['4648', 'Logon with explicit credentials (RunAs)', 'Admin running commands as another user; lateral movement using harvested creds'],
              ['4672', 'Special privileges assigned to new logon', 'Admin-level logon; expected for IT staff, suspicious for service accounts or regular users'],
              ['4688', 'Process creation (requires audit policy)', 'PowerShell with encoded commands, cmd.exe spawned by web process, LOLBins (wmic, certutil, regsvr32)'],
              ['4698/4702', 'Scheduled task created/modified', 'Persistence mechanism; any new task created outside of normal IT deployment'],
              ['4720/4722', 'User account created/enabled', 'Attacker creating backdoor accounts'],
              ['4728/4732', 'Member added to global/local group', 'User added to Domain Admins, Administrators — high priority alert'],
              ['4738', 'User account changed', 'Password reset, account attribute change — possible account hijacking'],
              ['4740', 'Account locked out', 'Pattern of lockouts across accounts = password spray in progress'],
              ['4768', 'Kerberos TGT requested (AS-REQ)', 'Requests for non-existent user accounts; RC4 encryption type (downgrade, Kerberoasting)'],
              ['4769', 'Kerberos service ticket requested (TGS-REQ)', 'RC4 encryption for service tickets = Kerberoasting; many requests in short time'],
              ['7045', 'New service installed', 'Persistence; lateral movement via service creation (PsExec, MSF)'],
            ].map(([id, desc, sus]) => (
              <tr key={id}>
                <td style={{ ...s.td, fontWeight: 700, fontFamily: 'monospace', color: C }}>{id}</td>
                <td style={s.td}>{desc}</td>
                <td style={{ ...s.td, fontSize: 13, color: '#ffa502' }}>{sus}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <P>
          Windows does not log process creation (4688) or PowerShell activity by default. These must be enabled via Group Policy: Computer Configuration → Policies → Windows Settings → Security Settings → Advanced Audit Policy Configuration. Without these, PowerShell-based attacks and LOLBin abuse are invisible in Windows event logs.
        </P>
      </Part>

      <HR />

      <Part>
        <H>SIEM Query Languages — SPL, KQL, and Elastic EQL</H>
        <P>
          Each SIEM platform has its own query language. The concepts are identical — filtering, aggregating, correlating — but syntax differs. The following examples all detect the same thing: a password spraying attack (many failed logons across many accounts from one source).
        </P>
        <Block>{`# ━━ SPLUNK SPL ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# Password spray detection:
index=wineventlog EventCode=4625 Logon_Type=3
| stats count, dc(Account_Name) as unique_accounts by src_ip
| where count > 50 AND unique_accounts > 10
| sort -count

# Active Directory Kerberoasting detection:
index=wineventlog EventCode=4769 Ticket_Encryption_Type=0x17
| stats count by Account_Name, Service_Name, Client_Address
| where count > 5
| sort -count

# Lateral movement — network logons to many hosts:
index=wineventlog EventCode=4624 Logon_Type=3
| stats dc(ComputerName) as host_count by Account_Name
| where host_count > 5
| sort -host_count

# LOLBin execution (certutil, regsvr32, wmic, mshta):
index=wineventlog EventCode=4688
  (Process_Command_Line="*certutil*" OR Process_Command_Line="*regsvr32*"
   OR Process_Command_Line="*mshta*")
  AND NOT (Creator_Process_Name="C:\\Windows\\System32\\svchost.exe")
| table _time ComputerName Account_Name Process_Command_Line


# ━━ MICROSOFT SENTINEL / AZURE MONITOR (KQL) ━━━━━━━━━━━━━━━━

// Password spray detection:
SecurityEvent
| where EventID == 4625 and LogonType == 3
| summarize count(), dcount(TargetUserName) by IpAddress
| where count_ > 50 and dcount_TargetUserName > 10
| order by count_ desc

// Impossible travel detection (two logins from different continents):
SigninLogs
| where ResultType == 0   // successful login
| summarize by UserPrincipalName, Location, TimeGenerated
| join kind=inner (
    SigninLogs
    | where ResultType == 0
) on UserPrincipalName
| where abs(datetime_diff('minute', TimeGenerated, TimeGenerated1)) < 60
    and Location != Location1
| project UserPrincipalName, Location, Location1, TimeGenerated, TimeGenerated1

// DNS tunneling detection (unusually long subdomain queries):
DnsEvents
| where SubType == "LookupQuery"
| extend subdomain_len = strlen(Name)
| where subdomain_len > 50
| summarize count() by ClientIP, Name
| order by count_ desc


# ━━ ELASTIC / OPENSEARCH (EQL — Event Query Language) ━━━━━━━━

// Process creation with encoded PowerShell (common attacker technique):
process where process.name == "powershell.exe"
  and process.args : ("-enc", "-EncodedCommand", "-e")

// Webshell detection — web server spawning cmd/powershell:
process where process.name in ("cmd.exe", "powershell.exe")
  and process.parent.name in ("w3wp.exe", "nginx", "httpd", "apache2", "tomcat")

// Credential dumping via LSASS access:
process where process.name == "lsass.exe"
  and not process.parent.name in ("wininit.exe", "svchost.exe")`}</Block>
      </Part>

      <HR />

      <Part>
        <H>Alert Triage — From Signal to Finding</H>
        <P>
          An alert is a hypothesis: "this looks like an attack." Triage is the process of proving or disproving that hypothesis with enough evidence to make a decision: escalate as a confirmed incident, or close as a false positive.
        </P>
        <Block>{`Alert triage workflow — 15-minute target per alert:

STEP 1: CONTEXT (2 min)
  □ What triggered the alert? Which rule? What event?
  □ Who is the affected user/host? What is their role?
  □ When did it happen? Business hours? Weekend? 3am?
  □ Is this a known system? New asset? Critical infrastructure?

STEP 2: INITIAL INVESTIGATION (5 min)
  □ Pull all events for this user/host in the last 24 hours
  □ Look for related events: same source IP, same user account
  □ Check threat intelligence: is the source IP/domain known malicious?
  □ Check asset inventory: is this host expected to behave this way?

STEP 3: EVIDENCE GATHERING (5 min)
  □ Expand the time window — when did unusual activity start?
  □ Look for the attack chain: recon → initial access → privilege escalation?
  □ Check endpoint data (EDR): what processes ran on the host?
  □ Check authentication logs: any concurrent unusual logins?
  □ Pull raw log evidence for documentation

STEP 4: DECISION (3 min)
  TRUE POSITIVE — escalate:
    - Create incident ticket with all evidence attached
    - Notify incident response team and affected system owner
    - Implement immediate containment if active threat confirmed

  FALSE POSITIVE — document and close:
    - Record why it is false positive
    - Update detection rule to reduce FP rate
    - Note whether tuning is needed (threshold, suppression, context)

  UNCLEAR — escalate for second opinion:
    - Document current evidence, current hypothesis
    - Flag for senior analyst or threat hunter review


# Example: Password spray triage

Alert: "50 failed logons across 15 accounts from 203.0.113.10 in 10 minutes"

Context:
  - Source IP: 203.0.113.10 → Ukraine (unusual for US company)
  - Targeted accounts: random mix of user accounts, not IT team
  - Time: 3:47 AM ET Saturday

Initial investigation:
  - Same source IP: zero prior connections in 30 days
  - TI lookup: IP flagged by AbuseIPDB (141 reports in 30 days)
  - Authentication log: 2 accounts had successful login after failures
    → user jsmith@corp.com: 7 failures then 1 success at 03:51 AM
    → user rbrown@corp.com: 4 failures then 1 success at 03:53 AM

Decision: TRUE POSITIVE — active credential compromise
  → Immediate: force password reset and session revoke for jsmith and rbrown
  → Block source IP 203.0.113.10 at perimeter firewall
  → Check jsmith and rbrown activity since 03:51 AM for lateral movement
  → Create incident ticket, notify CISO`}</Block>
      </Part>

      <HR />

      <Part>
        <H>Interview Questions — SIEM and Log Analysis</H>
        <IQ q="What is a SIEM and what are its core functions?">
          A SIEM (Security Information and Event Management) system centralises security log collection from diverse sources, provides normalisation and correlation of events, enables real-time alerting on detected attack patterns, and stores logs for forensic investigation and compliance. The core functions are: log collection (agents or syslog from endpoints, network devices, applications, cloud); normalisation (parsing diverse log formats into a consistent schema); correlation (combining events across sources to detect multi-stage attacks); alerting (rules that trigger on suspicious patterns); and search (query capability for investigation and threat hunting). Modern SIEMs also integrate threat intelligence, user and entity behaviour analytics (UEBA), and automated playbooks (SOAR).
        </IQ>
        <IQ q="What Windows Event ID would you monitor to detect a Kerberoasting attack and why?">
          Event ID 4769 (Kerberos Service Ticket Requested). Kerberoasting works by requesting Kerberos service tickets for accounts with Service Principal Names (SPNs) registered — the service ticket is encrypted with the service account's NT hash and can be cracked offline. The detection indicators: a large number of 4769 events from one source in a short period, service tickets requested for many different service accounts, and Ticket Encryption Type 0x17 (RC4) rather than 0x12 (AES256). Modern environments should enforce AES-only encryption for service accounts — RC4 service ticket requests should be rare and warrant investigation. Combine with 4768 (TGT requests) to see the full Kerberos authentication pattern.
        </IQ>
        <IQ q="An alert fires for 'unusual outbound data transfer'. Walk me through your triage process.">
          First, context: which host generated the alert, what is its function (database server? developer workstation?), and what is the destination IP and port? Pull the last 24 hours of events for that host. Second, investigate the transfer: how much data, to where, over what protocol, at what time? Compare to baseline — is this volume unusual for this host historically? Third, check the destination IP in threat intelligence: is it known malicious, a cloud provider, a legitimate business partner? Fourth, examine what process on the host generated the traffic — EDR process-to-network correlation is critical here. If it is a known application making a known backup, close as FP and tune. If it is an unknown process sending data to an unusual IP, escalate as a potential exfiltration incident with full evidence gathered.
        </IQ>
        <IQ q="What is the difference between a use case and a detection rule in a SIEM?">
          A use case is a threat scenario you want to detect — "detect password spraying against Active Directory". It describes what attack technique, what data sources are needed, what the detection logic should be, and what the response should be. A detection rule is the technical implementation of that use case — the specific SIEM query, threshold, time window, and alert configuration. One use case may require multiple detection rules: password spraying can be detected via Windows Event 4625 patterns, via authentication service logs, via Okta logs, and via VPN authentication logs — four rules for one use case, each covering a different data source. Use cases drive the detection strategy; rules are the implementation artefacts.
        </IQ>
        <IQ q="Why is log retention important for security, and what are typical retention requirements?">
          Log retention is critical because attackers often maintain access for weeks or months before detection — the 2024 Verizon DBIR found median dwell time of 18 days. Investigating a breach requires logs from before the attacker was detected, often weeks earlier. Without retention, forensic evidence is unavailable and the full attack scope cannot be determined. Typical requirements: PCI-DSS mandates 12 months retention with 3 months immediately available for analysis. HIPAA requires 6 years for security-related records. SOC 2 typically expects 12 months minimum. Many security frameworks recommend 12–24 months for SIEM data. Hot storage (immediately queryable) is expensive — a common architecture keeps 30–90 days hot and archives older data to cold storage (S3, Azure Blob) for on-demand retrieval.
        </IQ>
      </Part>

      <HR />

      <Part>
        <H>Common Mistakes — SIEM and Log Analysis</H>
        <Err
          title="Collecting logs but not enabling critical Windows audit policies"
          cause="Windows does not log process creation (4688) or PowerShell script block execution by default. Most PowerShell attacks and LOLBin abuse are completely invisible without these audit policies enabled."
          fix="Enable via Group Policy: Advanced Audit Policy Configuration → Process Creation (Success) for 4688, and Configure Windows PowerShell ScriptBlock Logging under Windows Components → Windows PowerShell. Also enable 4698/4702 (scheduled task creation/modification) and 4697 (service installation) for persistence detection."
        />
        <Err
          title="Alert rules with no context — firing on every single event"
          cause="Rule: 'any failed login = alert'. A company with 5,000 employees generates thousands of failed logins daily from typos, expired passwords, and mobile apps. Every single one fires an alert that no one investigates."
          fix="Detection rules need thresholds, time windows, and contextual filters. The same information (failed logins) becomes actionable with context: 'more than 20 unique accounts failing from one source IP within 10 minutes, excluding known scanner IPs' is a password spray indicator. Always define what normal looks like before writing the alert for abnormal."
        />
        <Err
          title="No baseline — cannot distinguish normal from anomalous"
          cause="Analyst receives alert for 'unusual outbound traffic'. Without a baseline of what normal outbound traffic looks like from that host, 'unusual' is meaningless — everything could be unusual or nothing could be."
          fix="Build baselines before deploying anomaly-based detection. Run the proposed anomaly detection in observe-only mode for 2–4 weeks before alerting. Document expected behaviour for critical systems: this database server normally makes X connections per day to Y destinations on port Z. Deviation from that documented baseline is anomalous."
        />
        <Err
          title="SIEM without SOC — nobody reads the alerts"
          cause="Organisation deploys Splunk, builds detection rules, and generates 10,000 alerts per week. No analyst is assigned to review them. After two months, the inbox is full and everyone ignores it."
          fix="The SIEM is a tool, not a security control. Alert review requires staffed analyst capacity. Right-size the alert volume to the analyst capacity: reduce rules until every alert gets reviewed. An organisation with one part-time security analyst can sustainably review 20–30 alerts per day — design your detection portfolio accordingly. Prioritise coverage of the highest-risk attack techniques, not maximum number of rules."
        />
        <Err
          title="Logging everything but retaining nothing useful"
          cause="Organisation sends all logs to SIEM with 7-day retention. An incident is detected. Investigation requires logs from 3 weeks ago — they were purged. The full attack chain cannot be reconstructed."
          fix="Match retention to detection latency. The median time from compromise to detection is 18+ days — 7-day retention means the initial access evidence is gone before detection. Keep 30+ days hot (immediately queryable), 12 months archived. Cloud log archival (S3, Azure Blob) costs pennies per gigabyte — the cost of long retention is negligible compared to the cost of an uninvestigable breach."
        />
      </Part>

      <HR />

      <KeyTakeaways items={[
        'A SIEM centralises log collection, normalises diverse formats, correlates events across sources, and alerts on detected attack patterns. Splunk, Microsoft Sentinel, and Elastic are the dominant platforms.',
        'The highest-value log sources are: Windows Security Event Log (especially 4624/4625/4688/4698/4769), Active Directory DC logs, DNS resolver logs, cloud API logs (CloudTrail), and EDR telemetry.',
        'Windows Event ID 4688 (process creation) and PowerShell script block logging must be explicitly enabled via Group Policy — they are off by default, making PowerShell attacks invisible.',
        'Essential Event IDs: 4625 (failed logon — brute force/spray), 4688 (process creation — malware), 4698 (scheduled task — persistence), 4769 (Kerberos TGT — Kerberoasting), 4728 (group membership change — privilege escalation).',
        'SPL (Splunk), KQL (Sentinel/Azure Monitor), and EQL (Elastic) are the dominant SIEM query languages. All express the same concepts: filter, aggregate, correlate — with different syntax.',
        'Alert triage follows four steps: context (who, what, when, where), initial investigation (related events, threat intel), evidence gathering (expand time window, check full kill chain), and decision (true/false positive or unclear).',
        'Detection rules require thresholds and context — "any failed login = alert" generates thousands of FPs. "20 unique accounts failing from one source IP in 10 minutes" is a password spray indicator.',
        'Log retention must exceed the median attacker dwell time (18+ days). Keep 30+ days immediately queryable and 12 months archived. 7-day retention means breach evidence is gone before detection.',
        'Impossible travel detection — two logins from different countries within 60 minutes — is a high-fidelity indicator of credential compromise or AiTM phishing success.',
        'A SIEM without analyst capacity to review alerts is a log archive, not a detection system. Right-size alert volume to analyst capacity: every alert must get reviewed.',
      ]} />

      <HR />

      <Callout type="info">
        Detection identifies active attacks. In{' '}
        <Link href="/learn/cybersecurity/vulnerability-management">
          Module 32: Vulnerability Management
        </Link>
        , you learn the systematic process for finding, prioritising, tracking, and remediating vulnerabilities before attackers exploit them — scanning programmes, risk-based prioritisation frameworks, SLA management, and how to run a VM programme that actually reduces risk rather than generating reports.
      </Callout>
    </LearnLayout>
  )
}
