import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import { Callout } from '@/components/content/Callout'

const C = '#ff4757'

const Part = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: 48 }}>
    <h2 style={{ fontSize: 22, fontWeight: 700, color: C, marginBottom: 16 }}>{title}</h2>
    {children}
  </div>
)
const H = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ fontSize: 17, fontWeight: 600, color: 'var(--text)', marginBottom: 8, marginTop: 24 }}>{children}</h3>
)
const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, marginBottom: 14 }}>{children}</p>
)
const Hl = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: C, fontWeight: 600 }}>{children}</span>
)
const HR = () => <hr style={{ border: 'none', borderTop: `1px solid ${C}22`, margin: '32px 0' }} />
const Block = ({ children }: { children: React.ReactNode }) => (
  <pre style={{
    background: 'var(--code-bg, #1a1a2e)', color: '#e2e8f0', borderRadius: 8,
    padding: '16px 20px', fontSize: 13, overflowX: 'auto', marginBottom: 20,
    border: `1px solid ${C}33`, lineHeight: 1.7, whiteSpace: 'pre-wrap', wordBreak: 'break-word'
  }}>{children}</pre>
)
const IQ = ({ q, a }: { q: string; a: string }) => (
  <div style={{ background: `${C}11`, border: `1px solid ${C}44`, borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
    <div style={{ color: C, fontWeight: 700, fontSize: 13, marginBottom: 6 }}>Interview Question</div>
    <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 6, color: 'var(--text)' }}>{q}</div>
    <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8 }}>{a}</div>
  </div>
)
const Err = ({ title, bad, good }: { title: string; bad: string; good: string }) => (
  <div style={{ background: '#1a0a0a', border: `1px solid ${C}66`, borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
    <div style={{ color: C, fontWeight: 700, fontSize: 13, marginBottom: 6 }}>Common Mistake — {title}</div>
    <div style={{ fontSize: 13, marginBottom: 4 }}><span style={{ color: '#ff6b6b' }}>Bad: </span><span style={{ color: '#ccc' }}>{bad}</span></div>
    <div style={{ fontSize: 13 }}><span style={{ color: '#51cf66' }}>Good: </span><span style={{ color: '#ccc' }}>{good}</span></div>
  </div>
)
const ProTip = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: '#0a1628', border: '1px solid #1e40af', borderRadius: 8, padding: '12px 16px', marginBottom: 16, fontSize: 14, color: '#93c5fd', lineHeight: 1.8 }}>
    <span style={{ fontWeight: 700 }}>Pro Tip: </span>{children}
  </div>
)

export default function Module33() {
  return (
    <LearnLayout
      title="Incident Response — From Alert to Recovery"
      description="Master the full incident response lifecycle: preparation, detection, containment, eradication, recovery, and lessons learned. Build playbooks, work a ransomware scenario, and learn digital forensics fundamentals."
      section="Cybersecurity — Module 33"
      readTime="40 min"
      updatedAt="May 2026"
    >

      <Part title="Incident Response Fundamentals">
        <P>
          An incident is any event that violates — or threatens to violate — the confidentiality, integrity, or availability of an organisation's information systems. Incident response (IR) is the structured process for managing that event: from the first alert to full recovery and documented lessons.
        </P>
        <P>
          The cost of a breach that is contained within two hours is radically different from one that runs undetected for 197 days (the industry median dwell time). <Hl>Speed of detection and containment is the single biggest lever on breach impact.</Hl>
        </P>

        <H>NIST SP 800-61 — The IR Framework</H>
        <P>
          NIST Special Publication 800-61 (Computer Security Incident Handling Guide) is the definitive US government IR framework. All major IR certifications and corporate programmes align to its six phases:
        </P>
        <Block>{`NIST SP 800-61 Incident Response Lifecycle:

Phase 1: PREPARATION
  Build and maintain IR capability before an incident occurs.
  - IR plan, playbooks, contact trees
  - SIEM, EDR, forensics tooling deployed
  - Tabletop exercises run quarterly
  - Legal, PR, and executive contacts pre-established

Phase 2: DETECTION AND ANALYSIS
  Identify that an incident has occurred and understand its scope.
  - Alert triage (SIEM, EDR, user reports)
  - Initial scoping: what systems, what data, what timeline?
  - Severity classification: P1 / P2 / P3
  - Declare incident if evidence is sufficient

Phase 3: CONTAINMENT
  Stop the spread without destroying evidence.
  - Short-term: isolate affected systems
  - Long-term: apply fixes, credential resets
  - Forensic preservation BEFORE containment actions where possible

Phase 4: ERADICATION
  Remove the attacker's presence and root cause.
  - Remove malware, backdoors, persistence mechanisms
  - Patch or mitigate the initial access vector
  - Reset all compromised credentials
  - Rebuild systems from known-good images where needed

Phase 5: RECOVERY
  Restore systems to normal operations securely.
  - Validate systems are clean before reconnecting
  - Monitor closely post-recovery (attackers often return)
  - Staged restoration — critical systems first
  - Communication to users / customers

Phase 6: LESSONS LEARNED (Post-Incident Review)
  Improve future response based on what happened.
  - Timeline reconstruction
  - Root cause analysis
  - Gap identification: detection, containment, communication
  - Update IR plan, playbooks, and detection rules`}
        </Block>

        <H>Incident Severity Classification</H>
        <div style={{ overflowX: 'auto', marginBottom: 20 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: `${C}22` }}>
                {['Severity', 'Criteria', 'Response Time', 'Escalation'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', color: C, fontWeight: 700, border: `1px solid ${C}33` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['P1 — Critical', 'Active data breach, ransomware, critical system compromise, ongoing exfiltration', '15 minutes', 'CISO, Legal, CEO, external IR firm'],
                ['P2 — High', 'Confirmed compromise (contained), significant data access, insider threat', '1 hour', 'CISO, IR team lead, affected system owners'],
                ['P3 — Medium', 'Suspected compromise, malware on endpoint, policy violation with potential impact', '4 hours', 'IR team lead, system owner'],
                ['P4 — Low', 'Policy violation, phishing click (no compromise confirmed), anomalous behaviour', '24 hours', 'Security analyst, manager'],
              ].map(([s, c, r, e], i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : `${C}08` }}>
                  {[s, c, r, e].map((v, j) => (
                    <td key={j} style={{ padding: '9px 14px', color: 'var(--text)', border: `1px solid ${C}22`, fontSize: 13 }}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <IQ
          q="Walk me through the NIST incident response lifecycle."
          a="NIST SP 800-61 defines six phases. Preparation: build IR capability before incidents occur — plan, playbooks, tools, and tabletop exercises. Detection and Analysis: identify that an incident has occurred, triage alerts, scope the impact, and classify severity. Containment: stop the spread — isolate affected systems short-term while preserving forensic evidence. Eradication: remove the attacker's foothold — malware, backdoors, persistence mechanisms — and address the root cause. Recovery: restore systems from clean backups or rebuilt images, validate they are clean, then reconnect with enhanced monitoring. Lessons Learned: within two weeks post-incident, conduct a blame-free retrospective to identify what the team detected well, where gaps exist, and how to update the plan and playbooks."
        />
      </Part>

      <HR />

      <Part title="Preparation — Building IR Capability">
        <P>
          Most of what determines whether an IR goes well is decided before the incident happens. Teams that have practised, have pre-established contacts, and have tooling deployed contain breaches in hours; teams that improvise contain them in weeks.
        </P>

        <H>The IR Plan</H>
        <Block>{`IR Plan — minimum required sections:

1. Purpose and Scope
   - What types of incidents does this plan cover?
   - Which systems / business units are in scope?

2. Roles and Responsibilities
   - Incident Commander: owns the response, makes calls
   - Technical Lead: leads containment/eradication
   - Communications Lead: internal + external comms
   - Legal Counsel: breach notification, privilege
   - Executive Sponsor: resource allocation, decisions

3. Incident Classification Matrix
   - P1 through P4 criteria (severity table)
   - Examples: ransomware = P1, phishing click = P4

4. Notification and Escalation Paths
   - Who to call at each severity level
   - Out-of-hours contact numbers (not just email)
   - External contacts: cyber insurer, external IR firm (retainer)
   - Legal obligations: GDPR 72-hour notification, SEC 4-day disclosure

5. Playbooks (by-reference or inline)
   - Ransomware playbook
   - Data breach playbook
   - Insider threat playbook
   - Phishing response playbook
   - DDoS playbook

6. Communication Templates
   - Internal: "We are investigating a potential incident..."
   - External/customer: approved language reviewed by Legal
   - Press statement: pre-drafted for P1 scenarios

7. Tools and Access
   - SIEM access, EDR console, forensics toolkits
   - Out-of-band communication (Teams/Slack may be compromised)

8. Plan Review Schedule
   - Annual review, after every P1/P2 incident`}
        </Block>

        <H>Tabletop Exercises</H>
        <P>
          A tabletop exercise is a facilitated, discussion-based simulation where stakeholders walk through a realistic incident scenario. No actual systems are affected — it is a structured conversation that surfaces gaps in plans, communication, and decision-making before a real incident exposes them.
        </P>
        <Block>{`Tabletop exercise — Ransomware scenario (90 minutes):

08:47 AM — IT helpdesk receives calls: file shares showing .locked extension
           Discussion: Who gets called first? What is the initial assessment?

08:52 AM — Employee reports ransom note on shared drive
           Discussion: Do we involve Legal now? What is the declaration threshold?

09:00 AM — Initial scoping: 3 file servers, 200 desktops affected
           Discussion: Do we shut down the network? What is the containment strategy?

09:15 AM — Discovery: ransomware spread via domain admin credential (phishing)
           Discussion: Do we disable the compromised domain admin account?
                       What breaks if we do? Who has authority to decide?

09:30 AM — Legal asks: do we have a notification obligation?
           Discussion: What data was on the encrypted servers?
                       Which regulators and when? (GDPR: 72h, HIPAA: 60 days)

09:45 AM — Attacker posts sample of stolen data on leak site
           Discussion: PR statement? Notify customers? When and how?

10:00 AM — Insurance company asks for status update
           Discussion: What can we share? What does the retainer cover?

Debrief questions:
  - Where did the plan work? Where did it fail?
  - What decisions took too long? Why?
  - What tools did we reach for that we did not have?
  - What would have reduced attacker dwell time?`}
        </Block>

        <H>IR Toolkit — Deployed Before You Need It</H>
        <Block>{`Must-have IR tools (deployed in advance):

Detection:
  - SIEM (Splunk, Sentinel, Elastic) with tuned alert rules
  - EDR (CrowdStrike, SentinelOne, Microsoft Defender for Endpoint)
  - Network flow analysis (Zeek, Corelight, NetFlow)
  - Email security with phishing reporting button

Forensics:
  - Velociraptor (open-source; remote forensic collection at scale)
  - GRR (Google Rapid Response)
  - Eric Zimmerman's Tools (Windows forensic artefacts)
  - Autopsy / Sleuth Kit (disk forensics)
  - Volatility 3 (memory forensics)

Communication (out-of-band — assume corp systems compromised):
  - Personal cell numbers for IR team
  - Signal group for encrypted comms during incident
  - Backup email outside corporate domain
  - Conference bridge number (not Teams/Zoom on corp infra)

Evidence collection:
  - Write-blockers (hardware) for physical media
  - Pre-approved cloud evidence storage (S3 bucket, Azure Blob)
  - Chain-of-custody forms

External contacts (have before you need):
  - External IR firm on retainer (Mandiant, CrowdStrike, Palo Alto UNIT42)
  - Cyber insurance carrier 24/7 hotline
  - FBI Cyber Division local field office contact
  - Legal counsel (privacy/breach specialist)`}
        </Block>
      </Part>

      <HR />

      <Part title="Detection and Analysis">
        <P>
          Detection is finding the incident. Analysis is understanding what happened, how far it spread, and what data was accessed. The gap between these two steps is where analysts lose the most time — and where attackers gain the most ground.
        </P>

        <H>Alert Sources and Initial Triage</H>
        <Block>{`Common incident detection sources (in order of frequency):

1. SIEM alert (automated rule triggered)
   - Assess: what rule fired? Is it high-fidelity or noisy?
   - Check: surrounding events in the same timeframe
   - Determine: is this isolated or part of a pattern?

2. EDR alert (endpoint detection and response)
   - CrowdStrike/SentinelOne detections are high-fidelity
   - Review: process tree, parent-child relationships, network calls
   - Isolate host for investigation if needed

3. User report ("my computer is acting weird")
   - Take seriously — users detect things automated tools miss
   - Ask: what did you click? What changed? When did it start?
   - Pull EDR telemetry for the endpoint immediately

4. External notification (FBI, partner, researcher)
   - Verify credential: confirm it is really the FBI / researcher
   - Do NOT dismiss — external parties often catch what you miss

5. Threat intel feed match (IOC detected in logs)
   - Cross-reference IOC against all log sources
   - Determine how long the IOC has been present (dwell time)`}
        </Block>

        <H>Scoping the Incident — Initial Questions</H>
        <Block>{`Initial scoping checklist (answer within first 30 minutes):

WHAT was compromised?
  □ Which specific systems/hosts?
  □ What data was accessible from those systems?
  □ What accounts were used/compromised?

WHEN did it start?
  □ First occurrence of suspicious activity in logs?
  □ When was the initial access vector (phishing email timestamp)?
  □ Timeline of attacker movement (first host → lateral movement → exfil)

HOW did they get in?
  □ Phishing (check email logs for suspicious emails)
  □ Exposed service exploitation (check VPN/RDP/web app logs)
  □ Supply chain (compromised vendor/software)
  □ Insider (check access logs for unusual data access patterns)

HOW FAR did they spread?
  □ Run IOC sweep across all endpoints (EDR hunt)
  □ Check authentication logs for compromised credentials used elsewhere
  □ Review network flow for beaconing or exfiltration traffic

IS IT STILL ACTIVE?
  □ Is the attacker still in the environment?
  □ Are there active C2 (command and control) connections?
  □ Is data still being exfiltrated?`}
        </Block>

        <H>Indicators of Compromise (IOCs) and Indicators of Attack (IOAs)</H>
        <Block>{`IOC types and where to look for them:

IP addresses / domains (C2 infrastructure):
  → Firewall/proxy logs, DNS query logs, EDR network events
  grep -i "185.220.101" /var/log/syslog          # Linux
  Get-WinEvent -LogName Security | where {$_.Message -match "185.220.101"}  # Windows

File hashes (known malware):
  → EDR quarantine events, file creation logs
  # CrowdStrike: search hash in Falcon console IOC manager
  # Velociraptor: hunt for hash across all endpoints
  SELECT FullPath, MD5, Size FROM Artifact.Windows.Search.FileFinder
  WHERE MD5 = "d41d8cd98f00b204e9800998ecf8427e"

Registry persistence keys (Windows):
  HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Run
  HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Winlogon (Shell, Userinit)
  HKLM\SYSTEM\CurrentControlSet\Services\ (malicious service)

Scheduled tasks:
  schtasks /query /fo LIST /v | findstr "Task Name\|Status\|Run As"

LSASS access (credential dumping indicator):
  Event ID 4656 (LSASS handle request) + 10 (process access to LSASS)
  Look for: non-SYSTEM processes requesting PROCESS_VM_READ on LSASS

Lateral movement IOAs:
  - PsExec service creation events (Event ID 7045 "PSEXESVC")
  - WMI process creation events (Event ID 4688, parent: WmiPrvSE.exe)
  - Pass-the-Hash: Event ID 4624 logon type 3 with NTLM from unusual source`}
        </Block>

        <IQ
          q="How do you determine the scope of a breach when an attacker has been in the environment for weeks?"
          a="Start by establishing the earliest known point of attacker presence — typically from the initial access vector (phishing email timestamp, VPN log anomaly). Then work forward: what credentials were compromised? Pull authentication logs for those accounts across all systems. What did they access? Check EDR process telemetry, file access logs, and cloud audit logs. What did they exfiltrate? Look for large outbound data transfers, unusual DNS queries (DNS tunneling), or HTTPS traffic to suspicious destinations. Map the timeline chronologically. In practice this requires: EDR with full process telemetry going back weeks, centralised log retention of 90+ days, and ideally network flow data. If logs are missing, your scope estimate will have gaps — document that uncertainty in your incident report."
        />
      </Part>

      <HR />

      <Part title="Containment and Evidence Preservation">
        <P>
          Containment has a fundamental tension: isolating systems stops the attacker but may destroy volatile evidence. <Hl>Collect memory and critical forensic artefacts before isolating where possible</Hl> — but if the attacker is actively exfiltrating data, isolation takes priority.
        </P>

        <H>Order of Volatility</H>
        <P>
          Collect evidence in order from most volatile (lost when system reboots) to least volatile (survives long term). This is foundational to digital forensics.
        </P>
        <Block>{`Order of volatility — collect in this order:

1. CPU registers, cache                     (lost immediately on power-off)
2. Routing tables, ARP cache, process list  (lost on reboot)
3. Memory (RAM) dump                        (lost on reboot — CRITICAL to capture)
4. Network connections (netstat)            (changes rapidly)
5. Running processes                        (changes)
6. Temp files, /tmp, %TEMP%                 (may be cleared)
7. Disk image                               (survives reboot)
8. Remote logging (SIEM)                    (most durable — offhost)
9. Physical media (backup tapes)            (most durable)

Memory is the most forensically valuable volatile artefact:
- Contains running processes, decrypted file content, passwords in memory
- Malware often lives in memory only (fileless malware)
- MUST be captured before isolation or reboot`}
        </Block>

        <H>Memory Acquisition</H>
        <Block>{`# Windows memory capture — WinPmem (open-source, no install required)
winpmem_mini.exe -o memory.raw

# Windows — using Magnet RAM Capture (free, GUI)
# Download from Magnet Forensics, run as Administrator, save .dmp file

# Linux memory capture — LiME (loadable kernel module)
git clone https://github.com/504ensicsLabs/LiME
cd LiME/src && make
# Load module, acquire memory to file (not over network — too slow)
sudo insmod lime-$(uname -r).ko "path=/tmp/memory.lime format=lime"

# Remote acquisition via Velociraptor (preferred at scale)
# In Velociraptor console, run artifact on target:
# Windows.Memory.Acquisition → saves to server automatically

# Memory analysis with Volatility 3 (cross-platform, Python)
pip install volatility3

# Identify OS profile
vol -f memory.raw windows.info

# Running processes at time of capture
vol -f memory.raw windows.pslist
vol -f memory.raw windows.pstree

# Network connections (sockets, listening ports)
vol -f memory.raw windows.netstat

# Detect injected code (hallmark of malware)
vol -f memory.raw windows.malfind

# Extract command history
vol -f memory.raw windows.cmdline`}
        </Block>

        <H>Disk Forensics</H>
        <Block>{`# Forensic disk imaging — never work on original media
# dd (built-in, no integrity verification)
dd if=/dev/sda of=/evidence/disk.img bs=4M status=progress

# dc3dd (forensic version with hashing and verification)
dc3dd if=/dev/sda of=/evidence/disk.img hash=sha256 log=/evidence/disk.log

# Autopsy (GUI forensics platform — good for beginners)
# Open Autopsy, create new case, add disk image
# Auto-runs: file recovery, keyword search, web artifacts, registry analysis

# Eric Zimmerman's Tools (Windows-focused, highly recommended)
# Registry Explorer — browse and analyse Windows registry hives
# MFTECmd — parse $MFT (master file table) for file creation/deletion
# PECmd — parse prefetch files (evidence of program execution)
# JLECmd — parse jump lists (recently accessed files)
# LECmd — parse LNK files (shortcut files revealing file access)
# AppCompatCacheParser — parse Shimcache (evidence of program execution)
# AmcacheParser — parse Amcache.hve (installed programs, file execution)

# Timeline creation — Plaso / log2timeline
log2timeline.py timeline.plaso /evidence/disk.img
psort.py -o dynamic timeline.plaso > timeline.csv`}
        </Block>

        <H>Containment Strategies</H>
        <Block>{`Containment options by scenario:

Full network isolation (endpoint):
  - EDR: CrowdStrike "Contain Host" button (one click, blocks all network)
  - Network: VLAN isolation, switch port disable, firewall policy
  - Use when: active malware executing, confirmed C2 connection
  - Risk: tips off sophisticated attacker; destroys volatile evidence

Selective containment:
  - Block specific IPs/domains at firewall/DNS
  - Disable compromised user accounts (NOT delete — preserve evidence)
  - Rotate specific API keys/credentials
  - Use when: you want to observe while limiting damage

Sinkholing C2:
  - Redirect attacker C2 domain to internal server
  - Lets you observe attacker commands without executing them
  - Requires DNS control and careful coordination with Legal

Cloud containment:
  # AWS — detach instance from internet
  aws ec2 modify-instance-attribute --instance-id i-xxx \
    --no-source-dest-check
  aws ec2 revoke-security-group-ingress --group-id sg-xxx \
    --protocol all --port all --cidr 0.0.0.0/0

  # AWS — remove IAM role from compromised instance
  aws ec2 disassociate-iam-instance-profile --association-id iip-xxx

  # AWS — disable compromised IAM user
  aws iam update-user --user-name compromised-user \
    --path /disabled/
  aws iam put-user-policy --user-name compromised-user \
    --policy-name DenyAll --policy-document '{"Version":"2012-10-17","Statement":[{"Effect":"Deny","Action":"*","Resource":"*"}]}'`}
        </Block>

        <IQ
          q="A user calls the helpdesk saying their computer is showing a ransom note. What do you do in the first 5 minutes?"
          a="Immediate triage to contain and scope. First 60 seconds: ask the user to leave the computer on and step away (do not power it off — memory evidence). Open EDR console and pull the endpoint telemetry immediately. Two minutes: identify what processes are running, what network connections exist, when the ransom note appeared. Three minutes: check if encryption is still in progress — if yes, isolate the host immediately from the network via EDR containment or switch port disable. Check domain controller logs for the user's account activity — has it been used elsewhere? Four minutes: pull a RAM capture if possible before isolation. Five minutes: escalate to Incident Commander, declare P1, notify CISO. Check adjacent systems: has the ransomware spread to file shares or other hosts?"
        />
      </Part>

      <HR />

      <Part title="Eradication and Recovery">
        <P>
          Eradication removes the attacker's presence. Recovery restores business operations. These phases are sequential — do not recover until you are confident the threat is fully eradicated, or you will rebuild infected systems.
        </P>

        <H>Eradication Checklist</H>
        <Block>{`Eradication checklist — do not skip steps:

1. IDENTIFY ALL PERSISTENCE MECHANISMS
   □ Malicious scheduled tasks (Windows: schtasks, Linux: crontabs)
   □ Malicious services (Event ID 7045, sc query, systemctl list-units)
   □ Registry run keys (HKCU/HKLM Run, RunOnce, Winlogon)
   □ Modified legitimate binaries (check file hashes against baseline)
   □ Backdoor user accounts (net user, Get-LocalUser, /etc/passwd)
   □ SSH authorized_keys modifications (all user home directories)
   □ Web shells (all web directories — look for .php, .aspx anomalies)
   □ Cloud backdoors: new IAM users, access keys, role policies

2. IDENTIFY AND REVOKE COMPROMISED CREDENTIALS
   □ All accounts that logged into affected systems during incident window
   □ Service accounts with access to affected systems
   □ API keys and secrets stored on affected systems
   □ Domain admin accounts if AD was accessed
   □ Cloud root account if cloud was accessed

3. PATCH THE INITIAL ACCESS VECTOR
   □ Vulnerability patched and verified (rescan)
   □ Phishing simulation and awareness training triggered
   □ MFA enforced on the vector (VPN, email, RDP)

4. REBUILD VS CLEAN
   Rule: If in doubt, rebuild. Cleaning is faster but risks missing
   persistence. Rebuilding from a known-good image is definitive.

   Rebuild when:
   - Attacker had root/admin access
   - Evidence of rootkit or kernel-level malware
   - System is critical and risk of reinfection is unacceptable

   Clean when:
   - Isolated malware on non-admin account
   - Single-file malware with no evidence of lateral movement
   - System rebuild cost is prohibitive and risk is accepted`}
        </Block>

        <H>Recovery — Staged Restoration</H>
        <Block>{`Recovery sequence — restore in priority order:

Stage 1: Identity and access (must come first)
  - Domain controllers restored and verified clean
  - All compromised passwords reset (force reset at next login)
  - MFA enforced on all privileged accounts
  - New monitoring rules deployed for re-compromise detection

Stage 2: Core infrastructure
  - DNS, DHCP, Active Directory services
  - Network infrastructure devices verified clean

Stage 3: Business-critical systems
  - Restore from clean backups (verified: backup predates compromise)
  - Validate data integrity (compare checksums against known-good)
  - Test all functions before reconnecting to production network

Stage 4: Standard endpoints
  - Reimaged endpoints with clean OS image
  - Reinstall business applications from vendor (not backups)
  - User data restored from verified clean backup point

Stage 5: Enhanced monitoring period (30-90 days post-incident)
  - Increased logging verbosity
  - Daily review of authentication anomalies
  - Deploy new detection rules based on attacker TTPs
  - Threat hunt for additional persistence

Backup validation before restore:
  - Confirm backup predates earliest known attacker activity
  - Test restore in isolated environment before production
  - Verify ransomware has not encrypted or corrupted backup files
    (attackers specifically target backup systems first)`}
        </Block>

        <H>Ransomware-Specific Response</H>
        <Block>{`Ransomware response decision tree:

1. ISOLATE immediately — stop spread
   (Do not pay ransom yet — explore all options first)

2. IDENTIFY ransomware variant
   Upload sample to ID Ransomware (id-ransomware.malwarehunterteam.com)
   Check No More Ransom project (nomoreransom.org) for free decryptors

3. ASSESS BACKUPS
   - Are backups intact and pre-dating infection?
   - Were backup credentials also compromised? (common attacker tactic)
   - How long to restore? (RTO: Recovery Time Objective)
   - How much data lost? (RPO: Recovery Point Objective)

4. ASSESS RANSOM PAYMENT (last resort, involves Legal + insurance)
   Factors favouring payment (rare):
   - No viable backups
   - RTO of months without payment
   - Attacker group has demonstrated working decryptors
   - Insurer recommends and will cover

   Factors against payment:
   - No guarantee of working decryptor (50% of payers cannot restore)
   - Funds criminal activity
   - May violate OFAC sanctions if group is sanctioned
   - Attacker may publish data regardless

5. NOTIFICATION obligations:
   - Cyber insurer: within 24 hours (read your policy)
   - GDPR: within 72 hours if EU personal data affected
   - HIPAA: within 60 days if PHI affected
   - SEC: within 4 business days for material incidents (public companies)
   - State breach notification: varies by state (30-90 day window)
   - Affected individuals: per applicable regulation`}
        </Block>

        <Err
          title="Restoring from backup without verifying backup integrity"
          bad="Restore from the most recent backup without checking whether the backup itself is infected or whether the backup predates the compromise."
          good="Check the backup creation date against the earliest known attacker activity (which may be weeks before the ransom note appeared). Restore in an isolated environment and run antivirus/EDR scan on the restored data before connecting to production. Ransomware operators deliberately wait 2-4 weeks after initial access before triggering encryption — to ensure backups are also encrypted."
        />

        <Err
          title="Deleting malware instead of preserving evidence"
          bad="IT team runs antivirus to 'clean' infected systems, deleting all forensic artefacts before the IR team can investigate."
          good="Collect forensic images (memory dump, disk image) and export critical log data before any remediation actions. Antivirus cleanup destroys the evidence needed to determine initial access vector, lateral movement paths, and data exfiltration scope — all of which are needed for breach notification decisions."
        />
      </Part>

      <HR />

      <Part title="Digital Forensics Fundamentals">
        <P>
          Digital forensics is the application of scientific methods to the collection, preservation, analysis, and presentation of digital evidence. Every IR analyst needs baseline forensics skills — knowing where artefacts live and what they tell you about attacker behaviour.
        </P>

        <H>Windows Forensic Artefacts</H>
        <div style={{ overflowX: 'auto', marginBottom: 20 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: `${C}22` }}>
                {['Artefact', 'Location', 'What It Tells You'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', color: C, fontWeight: 700, border: `1px solid ${C}33` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Prefetch files', 'C:\\Windows\\Prefetch\\*.pf', 'Programs executed (even after deleted), execution count, last run timestamp'],
                ['Shimcache (AppCompatCache)', 'HKLM\\SYSTEM\\CCS\\Control\\Session Manager\\AppCompatCache', 'Programs that have existed on disk (may not have run)'],
                ['Amcache.hve', 'C:\\Windows\\AppCompat\\Programs\\Amcache.hve', 'File execution: SHA1 hash, first execution timestamp'],
                ['Windows Event Logs', 'C:\\Windows\\System32\\winevt\\Logs\\', 'Authentication, process creation, service installation, network logons'],
                ['LNK files (shortcuts)', 'C:\\Users\\*\\AppData\\Roaming\\Microsoft\\Windows\\Recent\\', 'Files accessed by user, timestamps, original paths'],
                ['Jump Lists', 'C:\\Users\\*\\AppData\\Roaming\\Microsoft\\Windows\\Recent\\AutomaticDestinations\\', 'Recently opened files per application — forensically rich'],
                ['MFT ($MFT)', 'NTFS root — extracted with MFTECmd', 'All file creation/modification/deletion with nanosecond timestamps'],
                ['USN Journal ($J)', 'NTFS — extracted from $Extend\\$UsnJrnl', 'File change journal — captures rename, delete operations'],
                ['Registry hives', 'HKCU (NTUSER.DAT), HKLM (SYSTEM, SOFTWARE, SAM)', 'User activity, installed programs, run keys, typed paths, USB devices'],
                ['Browser artefacts', 'AppData\\Local\\[Browser]\\User Data\\', 'Browsing history, downloads, saved passwords (may contain phishing IOCs)'],
                ['SRUM (Resource Usage)', 'C:\\Windows\\System32\\sru\\SRUDB.dat', 'Network bytes sent/received per process — evidence of exfiltration'],
              ].map(([a, l, w], i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : `${C}08` }}>
                  {[a, l, w].map((c, j) => (
                    <td key={j} style={{ padding: '9px 14px', color: 'var(--text)', border: `1px solid ${C}22`, fontSize: 13 }}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <H>Linux Forensic Artefacts</H>
        <Block>{`Key Linux forensic locations:

/var/log/auth.log (Debian/Ubuntu) or /var/log/secure (RHEL/CentOS)
  → SSH logins, sudo usage, authentication failures
  grep "Accepted\|Failed\|sudo" /var/log/auth.log

/var/log/syslog or /var/log/messages
  → System events, service starts/stops, kernel messages

bash_history, .zsh_history (per-user home directory)
  → Command history (may be cleared by attacker: unset HISTFILE)
  # Hidden commands: check for commands prefixed with space (not logged by default)
  cat ~/.bash_history

Crontabs — persistence via scheduled tasks
  /var/spool/cron/crontabs/*   (per-user crontabs)
  /etc/cron.d/                  (system crontabs)
  /etc/crontab

Systemd service files — malicious service persistence
  /etc/systemd/system/*.service
  /lib/systemd/system/*.service
  systemctl list-units --type=service --all

/etc/passwd and /etc/shadow
  → Backdoor accounts (UID 0 = root-equivalent, suspicious last login)
  awk -F: '($3 == 0) {print}' /etc/passwd  # all UID 0 accounts

Loaded kernel modules — rootkit persistence
  lsmod | grep -v "^Module"
  # Suspicious: unknown modules not in /lib/modules/$(uname -r)/

/proc/ — live process and network forensics
  ls /proc/[pid]/fd      # open file descriptors
  cat /proc/[pid]/net/tcp  # network connections (hex encoded)
  cat /proc/[pid]/cmdline  # full command line including args`}
        </Block>

        <H>Network Forensics</H>
        <Block>{`# PCAP analysis with Wireshark / tshark

# Extract all unique C2 connections from PCAP
tshark -r capture.pcap -T fields -e ip.dst -e tcp.dstport \
  | sort | uniq -c | sort -rn | head -20

# Find DNS queries to unusual domains
tshark -r capture.pcap -Y "dns.qry.type == 1" \
  -T fields -e dns.qry.name | sort | uniq -c | sort -rn

# Extract files from PCAP (HTTP downloads, etc.)
tcpflow -r capture.pcap -C -g

# Detect DNS tunneling (unusually long DNS queries)
tshark -r capture.pcap -Y 'dns.qry.name' \
  -T fields -e dns.qry.name \
  | awk 'length($0) > 50' | sort | uniq

# Zeek (Bro) — network traffic analysis framework
# Generates rich logs: conn.log, dns.log, http.log, ssl.log, files.log
zeek -r capture.pcap local
cat conn.log | zeek-cut id.orig_h id.resp_h id.resp_p duration orig_bytes
cat dns.log  | zeek-cut query answers qtype_name

# Detect beaconing — regular C2 check-ins
# Look for connections at suspiciously regular intervals (e.g., every 60 seconds)
cat conn.log | zeek-cut id.orig_h id.resp_h ts \
  | sort | awk 'BEGIN{prev=""} {if ($3==prev) print; prev=$3}'`}
        </Block>

        <IQ
          q="How do you prove that a specific executable ran on a Windows system, even if the file has been deleted?"
          a="Multiple artefacts provide evidence of execution independently of the file still being present. Prefetch files (in C:\\Windows\\Prefetch) record execution count and timestamps for programs run — they persist even after the binary is deleted. Amcache.hve records a SHA1 hash of executables that ran, with first execution timestamp. Shimcache (AppCompatCache in the SYSTEM registry hive) records programs that existed on disk, though not always execution. Windows Event Log 4688 (process creation, with audit policy enabled) records every process launch with parent process, command line, and user context. SRUM (System Resource Usage Monitor) records network bytes per process — useful for detecting exfiltration. Combining these: even if an attacker deletes their tool and runs a WEVTUTIL command to clear event logs, prefetch and Amcache often survive and prove execution."
        />
      </Part>

      <HR />

      <Part title="Post-Incident Review and Lessons Learned">
        <P>
          The post-incident review (also called a post-mortem or after-action review) is where the organisation improves. Done well, it turns a breach into a programme enhancement. Done poorly — or skipped — it guarantees a similar incident in the future.
        </P>

        <H>Timeline Reconstruction</H>
        <Block>{`Incident timeline template (fill in from log evidence):

ATTACKER TIMELINE:
  [Date/Time]  Initial access — phishing email sent to finance@company.com
  [Date/Time]  User clicked malicious link — browser exploitation
  [Date/Time]  Initial payload executed (Cobalt Strike beacon)
  [Date/Time]  Attacker ran discovery commands (whoami, ipconfig, net user)
  [Date/Time]  Lateral movement — admin credential harvested, used on SQL server
  [Date/Time]  Data staged in C:\\Windows\\Temp\\archive.zip (2.4 GB)
  [Date/Time]  Exfiltration — data uploaded to mega.nz via HTTPS
  [Date/Time]  Ransomware deployed across file shares

DEFENDER TIMELINE:
  [Date/Time]  First alert generated (SIEM — unusual process on endpoint)
  [Date/Time]  Alert triaged — analyst marked as false positive (GAP)
  [Date/Time]  Ransom note discovered by employee
  [Date/Time]  Incident declared — IR team engaged
  [Date/Time]  Containment — file servers isolated
  [Date/Time]  CISO and Legal notified
  [Date/Time]  External IR firm engaged

DWELL TIME: [initial access] to [containment] = X days
DETECTION GAP: What signals were present but missed?`}
        </Block>

        <H>Lessons Learned Report Structure</H>
        <Block>{`Post-Incident Report — required sections:

1. Executive Summary (1 page, non-technical)
   - What happened, what was affected, what we did, current status

2. Incident Timeline
   - Chronological events with timestamps and evidence source

3. Root Cause Analysis
   - 5-Why analysis: why did the breach occur?
   - Initial access vector and how it was enabled
   - Why was detection delayed?
   - Why was containment delayed?

4. Impact Assessment
   - Systems compromised (list with criticality)
   - Data accessed/exfiltrated (classification, volume, affected individuals)
   - Business impact: downtime hours, revenue, regulatory exposure

5. What Went Well (important — recognise effective response)
   - Fast actions that limited damage
   - Tools that worked as expected
   - Communication that was effective

6. Areas for Improvement (blame-free, focus on processes not people)
   - Detection: what signals were missed and why?
   - Response: where did the plan have gaps?
   - Communication: what caused delays or confusion?

7. Action Items (SMART: Specific, Measurable, Assignable, Realistic, Time-bound)
   - Deploy MFA on VPN (Owner: IT, Due: 2026-06-01)
   - Tune SIEM rule to reduce false positives on alertX (Owner: SOC, Due: 2026-05-20)
   - Run ransomware tabletop with executives (Owner: CISO, Due: 2026-07-01)
   - Increase log retention from 30 to 90 days (Owner: IT, Due: 2026-06-15)

8. Regulatory and Legal (with legal review)
   - Notification obligations triggered
   - Notifications sent (date, regulator, content summary)
   - Residual legal exposure`}
        </Block>

        <IQ
          q="How should a post-incident review be run to be genuinely useful?"
          a="Run it within 5-10 business days while memories are fresh, but after the immediate response pressure has eased. It must be explicitly blame-free — the goal is process improvement, not finding a scapegoat. If people fear punishment, they will not surface the real failures. Structure it around the timeline: walk through each phase chronologically, asking 'what information did we have at this point, and why did we make the decision we did?' This surfaces gaps in tooling, process, and training rather than individual failures. Produce SMART action items with owners and deadlines — not vague recommendations. Track action items to completion in your Jira backlog. A post-incident review that results in 10 action items closed within 90 days is worth ten times one that produces a PDF that no one reads."
        />

        <Err
          title="Conducting post-mortems as blame sessions"
          bad="Post-incident review focuses on 'who let this happen' and the analyst who missed the alert gets disciplined."
          good="Blame-free retrospective: the analyst missed the alert because the alert was poorly tuned with a 90% false positive rate and no triage runbook. Fix the alert and write the runbook. Disciplining the individual guarantees the next analyst also fails — the system is broken, not the person."
        />

        <Err
          title="Disconnecting systems before collecting forensic evidence"
          bad="IT team powers off infected servers to 'stop the damage' before forensics team arrives — destroying all volatile evidence."
          good="Disconnect from network (pull cable or use EDR network isolation) but leave powered on. Network isolation stops spread without destroying memory evidence. Collect RAM dump first, then disk image, then power off if needed. Establish this protocol with IT in advance — during the incident is too late to argue about it."
        />

        <Err
          title="Incomplete credential rotation"
          bad="Reset the compromised user's password but not the service accounts, API keys, or other accounts that were used on the same systems."
          good="During eradication, identify every account that authenticated to compromised systems during the incident window and rotate all of them. Attackers commonly harvest multiple credentials and return via a secondary account that was overlooked in the reset sweep."
        />
      </Part>

      <HR />

      <KeyTakeaways items={[
        'The NIST SP 800-61 IR lifecycle has six phases: Preparation, Detection and Analysis, Containment, Eradication, Recovery, and Lessons Learned — in that order, every time.',
        'Most incident outcomes are determined before the incident occurs: teams with practised plans, deployed tools, and pre-established contacts contain breaches hours faster than those that improvise.',
        'Collect evidence in order of volatility: memory (RAM) first, then running process/network state, then disk — memory is lost forever on reboot and contains critical forensic artefacts.',
        'Containment and evidence preservation are in tension — if active exfiltration is occurring, isolate first; if time permits, collect RAM before network isolation.',
        'The order of volatility is: CPU registers → RAM → network connections → running processes → temp files → disk → remote logs → backups.',
        'Windows forensic artefacts (Prefetch, Amcache, Shimcache, SRUM) can prove a program ran even after the file is deleted and event logs are cleared.',
        'Ransomware operators deliberately wait 2-4 weeks before triggering encryption — to ensure backup copies are also encrypted — so your backup validation must check dates against earliest known attacker activity.',
        'Never restore from backup without confirming the backup predates the initial compromise and running EDR/AV on restored data in isolation.',
        'Post-incident reviews must be explicitly blame-free — if people fear punishment they will not surface real failures; the goal is process improvement through SMART action items.',
        'Dwell time (initial access to containment) is the single most important IR metric — reducing it from days to hours dramatically limits breach impact and cost.',
      ]} />

      <Callout type="info">
        <strong>Up Next — Module 34: Threat Intelligence and Threat Hunting</strong><br />
        Module 34 moves you from reactive incident response to proactive defence. You will learn how to consume and produce threat intelligence (STIX/TAXII, threat intel feeds, TLP classifications), build MITRE ATT&CK-based hunting hypotheses, write detection rules from adversary TTPs, and run structured threat hunts before the attackers announce themselves.
      </Callout>

    </LearnLayout>
  )
}
