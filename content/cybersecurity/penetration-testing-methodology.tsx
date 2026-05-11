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

export default function Module21() {
  return (
    <LearnLayout
      title="Penetration Testing — Methodology, Scoping, and Legal Framework"
      description="The five-phase pentest methodology, rules of engagement, scoping, legal authorisation, report writing, and the ethical framework that separates professional testing from criminal hacking."
      section="Cybersecurity — Module 21"
      readTime="32 min"
      updatedAt="May 2026"
    >
      <Part>
        <P>
          Penetration testing is the practice of <Hl>simulating attacks against a system with explicit written permission</Hl> from the owner, in order to identify vulnerabilities before malicious actors do.
          A penetration tester uses the same techniques and tools as an attacker — the only difference is authorisation.
          That difference is everything: it separates a six-figure security career from a federal computer crime conviction.
        </P>
        <P>
          This module covers what professional penetration testing actually looks like — not just the hacking techniques, but the business context that makes it legal, repeatable, and valuable. You will learn how engagements are scoped and contracted, the five-phase methodology that structures every professional pentest, how findings are documented and communicated, and the certifications that validate your skills in the US job market.
        </P>
        <Callout type="info">
          The techniques described in this module are legal only when performed with explicit written authorisation on systems you own or are contracted to test. Performing any of these actions against systems without authorisation is a federal crime under the Computer Fraud and Abuse Act (CFAA), regardless of intent.
        </Callout>
      </Part>

      <HR />

      <Part>
        <H>Types of Penetration Tests</H>
        <P>
          Not all penetration tests are the same. The scope, knowledge level provided to the tester, and objective vary significantly by engagement type:
        </P>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Type</th>
              <th style={s.th}>What the tester knows</th>
              <th style={s.th}>When to use</th>
              <th style={s.th}>Realistic?</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Black box', 'Nothing — same as an external attacker. No credentials, no docs, no source', 'Testing perimeter from an adversary perspective', 'Highest realism, misses internal logic issues'],
              ['Grey box', 'Some info — credentials, architecture docs, or a user account', 'Internal application testing, authenticated endpoint review', 'Most common in industry — best ROI'],
              ['White box', 'Full access — source code, credentials, architecture, runbooks', 'Code review combined with dynamic testing, compliance testing', 'Most thorough, finds logic flaws that black-box misses'],
              ['Red team', 'None — multi-vector persistent campaign over weeks/months targeting detection evasion', 'Testing the detection and response capability of the security team', 'Closest to APT — tests people and processes, not just technology'],
              ['Purple team', 'Full collaboration — red and blue team work together simultaneously', 'Building detection rules, tuning SIEM, training defenders', 'Not adversarial — focused on knowledge transfer'],
            ].map(([t, k, w, r]) => (
              <tr key={t}>
                <td style={{ ...s.td, fontWeight: 600, color: C }}>{t}</td>
                <td style={s.td}>{k}</td>
                <td style={s.td}>{w}</td>
                <td style={{ ...s.td, fontSize: 13, color: '#aaa' }}>{r}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <P>
          The industry has largely shifted toward <Hl>grey-box testing</Hl> for most engagements. It produces more actionable findings per dollar than black-box (which can spend 80% of time on reconnaissance that the client already knows about) while being more realistic than white-box about what an attacker with a foothold can do.
        </P>
      </Part>

      <HR />

      <Part>
        <H>The Legal Framework — Authorisation First, Everything Else Second</H>
        <P>
          In the United States, the <Hl>Computer Fraud and Abuse Act (CFAA)</Hl> criminalises accessing a computer without authorisation or exceeding authorised access. The penalty for a first offence involving financial damage exceeds $250K and five years imprisonment. State laws stack on top. International operators face additional jurisdictions.
        </P>
        <P>
          Professional penetration testing requires three documents before any work begins:
        </P>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Document</th>
              <th style={s.th}>Purpose</th>
              <th style={s.th}>Key contents</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Statement of Work (SOW)', 'The contract defining deliverables and timeline', 'Scope, methodology, timeline, deliverables, cost, legal liability clauses'],
              ['Rules of Engagement (RoE)', 'Operational constraints for the engagement', 'In-scope IPs/domains, excluded systems, allowed techniques, emergency stop contacts, working hours, data handling'],
              ['Permission to Test letter', 'Explicit written authorisation signed by an executive', 'IP ranges authorised, test window, emergency contact, tester identity, escalation procedures'],
            ].map(([d, p, k]) => (
              <tr key={d}>
                <td style={{ ...s.td, fontWeight: 600 }}>{d}</td>
                <td style={s.td}>{p}</td>
                <td style={s.td}>{k}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <P>
          The Rules of Engagement document is the most operationally important. It defines exactly what you are allowed to do and what will trigger an emergency stop. Common RoE clauses:
        </P>
        <Block>{`Rules of Engagement — Example Clauses

IN-SCOPE:
  - IP ranges: 192.168.100.0/24, 10.50.0.0/16
  - Domains: *.acmecorp.com, acmecorp.com
  - Applications: app.acmecorp.com, admin.acmecorp.com
  - Internal network access via provided VPN

OUT-OF-SCOPE (do not test, do not touch):
  - Production database servers (192.168.100.50–192.168.100.60)
  - Third-party payment processor (payments.stripe.com)
  - Employee personal devices
  - Physical security (badge readers, cameras)
  - Social engineering of employees

ALLOWED TECHNIQUES:
  - Network scanning, port scanning
  - Web application testing (OWASP Top 10)
  - Authenticated API testing
  - Password spraying (max 3 attempts per account per hour)
  - Privilege escalation on compromised hosts

PROHIBITED TECHNIQUES:
  - Denial of service or load-generating attacks
  - Destructive actions (deleting files, dropping tables)
  - Accessing or exfiltrating real customer PII
  - Persistent backdoors surviving engagement end

EMERGENCY STOP PROCEDURE:
  - If critical business impact detected: immediately stop all activity
  - Contact: Jane Smith (CISO) at +1-555-0100 or jane@acmecorp.com
  - Document last actions taken and provide immediately

WORKING HOURS:
  - Business hours only: Mon–Fri 09:00–17:00 Eastern
  - After-hours testing requires 24hr advance notice and approval

DATA HANDLING:
  - No client data to leave engagement environment
  - All findings encrypted at rest
  - Report delivered via encrypted email
  - Evidence deleted 30 days after final report acceptance`}</Block>
        <ProTip>
          Always carry the signed permission to test letter when doing on-site work. Law enforcement cannot tell the difference between a pentester and a criminal without documentation. Multiple professional pentesters have been detained mid-engagement when someone called the police.
        </ProTip>
      </Part>

      <HR />

      <Part>
        <H>The Five-Phase Methodology</H>
        <P>
          Professional penetration tests follow a consistent five-phase structure. Every phase has a defined goal, outputs, and handoff to the next phase. Skipping phases or treating them as optional produces incomplete results and unprofessional reports.
        </P>

        <H>Phase 1 — Reconnaissance</H>
        <P>
          Gather information about the target without touching it. <Hl>Passive reconnaissance</Hl> uses public sources — no packets sent to the target. <Hl>Active reconnaissance</Hl> involves direct interaction (DNS lookups, WHOIS, port scans).
        </P>
        <Block>{`Passive reconnaissance sources:
  WHOIS / RDAP    — registrant info, nameservers, registration dates
  DNS records     — A, MX, TXT, SRV, AAAA, NS — maps infrastructure
  Certificate transparency logs — crt.sh lists all TLS certs issued for a domain
  Shodan/Censys   — internet-wide scan data, exposed services, banners
  LinkedIn        — org chart, employee names, job titles, tech stack clues
  GitHub/GitLab   — leaked credentials, internal tooling, architecture hints
  Google dorks    — filetype:pdf site:target.com, intitle:"index of" site:target.com
  Wayback Machine — historical pages, old endpoints, removed content

Active reconnaissance:
  nmap -sn 192.168.1.0/24          # host discovery (ping sweep)
  nmap -p- --open 192.168.1.10     # all ports on a single host
  dig ANY target.com               # DNS record enumeration
  theHarvester -d target.com -b all # email, subdomain, host harvesting

Goal: Build an asset inventory and understand the attack surface
Output: IP ranges, domain list, employee names/emails, tech stack, potential entry points`}</Block>

        <H>Phase 2 — Scanning and Enumeration</H>
        <P>
          Actively probe discovered targets to identify open services, versions, and configurations. This phase generates significant network traffic — it is detectable by a good blue team.
        </P>
        <Block>{`# Port scanning — identify open services
nmap -sV -sC -p- -T4 192.168.1.10
# -sV: version detection
# -sC: default scripts (banner grab, basic vuln checks)
# -p-: all 65535 ports
# -T4: aggressive timing (faster, noisier)

# Service enumeration examples
# Web:
nikto -h http://192.168.1.10      # web server misconfigs, common files
gobuster dir -u http://192.168.1.10 -w /usr/share/seclists/Discovery/Web-Content/raft-medium-directories.txt

# SMB:
nmap --script smb-enum-shares,smb-enum-users 192.168.1.10
enum4linux -a 192.168.1.10

# LDAP / Active Directory:
ldapsearch -x -H ldap://192.168.1.10 -b "dc=corp,dc=local"

# MySQL:
nmap --script mysql-info,mysql-empty-password 192.168.1.10 -p 3306

# SSH:
nmap --script ssh-auth-methods,ssh-hostkey 192.168.1.10 -p 22

Goal: For each service — identify exact version, default creds, misconfigs, potential CVEs
Output: Vulnerability hypothesis list, attack vectors to test in phase 3`}</Block>

        <H>Phase 3 — Exploitation</H>
        <P>
          Attempt to gain initial access by exploiting confirmed vulnerabilities. The goal is a foothold — a shell, a session, or a privileged API call — not destruction.
          Every action must be documented (timestamp, command, output) in real time.
        </P>
        <Block>{`Exploitation categories and examples:

Network services:
  - Exploit unpatched services (Metasploit module for specific CVE)
  - Default or weak credentials (admin:admin, root:toor, service:service)
  - Anonymous/guest access to FTP, SMB, LDAP, Redis, MongoDB

Web applications:
  - SQL injection via sqlmap or manual payload
  - XSS leading to session hijacking
  - File upload bypassing extension checks
  - IDOR on object identifiers
  - JWT manipulation (alg:none, weak secret)

Authentication:
  - Password spraying against VPN, OWA, O365
  - Credential stuffing with known breached passwords
  - Phishing (if social engineering is in scope)

Client-side:
  - Malicious document delivery (if phishing in scope)
  - Browser exploit via hosted malicious page (lab environments)

Metasploit workflow example:
  msfconsole
  use exploit/multi/handler
  set PAYLOAD windows/x64/meterpreter/reverse_tcp
  set LHOST 10.50.0.100
  set LPORT 4444
  run

  # After getting a shell:
  sysinfo                          # host info
  getuid                           # current user
  run post/multi/recon/local_exploit_suggester  # privesc suggestions

DOCUMENTATION RULE: Every command run → timestamp → output → screenshot.
If you cannot prove it, it did not happen for the report.`}</Block>

        <H>Phase 4 — Post-Exploitation</H>
        <P>
          Once a foothold is established, demonstrate the business impact: what data could be accessed, what lateral movement is possible, and whether domain or cloud admin can be reached. This phase proves impact, not just access.
        </P>
        <Block>{`Post-exploitation objectives:

1. Situational awareness
   whoami /all              # Windows — user, groups, privileges
   id; hostname; uname -a  # Linux — user, hostname, kernel
   ipconfig /all            # Windows — network interfaces (pivot potential)
   netstat -ano             # Windows — active connections

2. Privilege escalation
   # Windows:
   winPEAS.exe              # automated PrivEsc scan
   PowerUp.ps1              # PowerShell PrivEsc checks
   # Linux:
   linpeas.sh               # automated PrivEsc scan
   sudo -l                  # what can this user sudo?
   find / -perm -4000 2>/dev/null  # SUID binaries

3. Credential harvesting
   # Windows:
   mimikatz.exe "sekurlsa::logonpasswords"   # LSASS credentials
   # Linux:
   cat /etc/shadow           # if root
   find / -name "*.conf" 2>/dev/null | xargs grep -l "password"

4. Lateral movement evidence
   # Document which other hosts are reachable from this foothold
   # Demonstrate pivot potential — do NOT actually move to out-of-scope systems

5. Data exfiltration proof
   # Access a sensitive file, document its path and access method
   # Do NOT exfiltrate real PII — capture a screenshot of the file listing

Goal: Business impact proof — "with this access, an attacker could..."
Output: Documented attack path from initial access to highest-value asset reached`}</Block>

        <H>Phase 5 — Reporting</H>
        <P>
          The report is the deliverable — the only thing the client keeps after the engagement ends. A technically excellent pentest with a poor report is a failed engagement. Reports have two audiences with different needs: executives who need risk context, and engineers who need precise technical details to remediate.
        </P>
        <Block>{`Professional pentest report structure:

EXECUTIVE SUMMARY (1–2 pages)
  - Assessment scope and dates
  - Overall risk rating (Critical/High/Medium/Low finding counts)
  - Top 3 most impactful findings in plain language
  - Business risk statement: "An attacker could access all customer financial data"
  - Remediation priority recommendations
  - NO technical jargon — this is for the CISO and board

METHODOLOGY (0.5 pages)
  - Testing type (black/grey/white box)
  - Phases conducted
  - Tools used (high level)
  - Limitations (out-of-scope items, time constraints)

FINDINGS (bulk of report — one section per finding)
  Finding: SQL Injection in /api/search endpoint
  ┌─────────────────────────────────────────────────────┐
  │ Severity:     Critical (CVSS 9.8)                   │
  │ CVSS vector:  CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H │
  │                                      /I:H/A:H        │
  │ Affected URL: https://app.target.com/api/search      │
  │ Parameter:    q                                      │
  └─────────────────────────────────────────────────────┘

  Description:
    The search endpoint constructs SQL queries using unsanitised user input.

  Proof of concept:
    Request:  GET /api/search?q=' OR '1'='1
    Response: 200 OK with all 12,847 user records returned
    [Screenshot of response with PII redacted]

  Impact:
    Full database read access. Attacker can extract all user credentials,
    payment tokens, and PII. With stacked queries, can modify or delete data.

  Remediation:
    Replace string concatenation with parameterised queries:
      cursor.execute("SELECT * FROM products WHERE name = %s", (q,))
    Estimated developer effort: 1 hour

  References:
    CWE-89: SQL Injection
    OWASP Top 10 A03:2021 - Injection

REMEDIATION SUMMARY TABLE
  Finding | Severity | Effort | Owner | Due Date

APPENDIX
  - Full tool output logs
  - Raw scan data
  - Evidence screenshots`}</Block>
        <ProTip>
          Write the executive summary last, not first. After documenting all findings, you understand which are truly impactful enough to highlight. Many junior pentesters write the executive summary as a template and never update it to reflect what they actually found.
        </ProTip>
      </Part>

      <HR />

      <Part>
        <H>Vulnerability Severity Rating</H>
        <P>
          Every finding must be rated consistently. Most firms use <Hl>CVSS 3.1</Hl> as the baseline and apply contextual adjustments for the specific client environment. A critical CVSS score on a development server with no sensitive data becomes a medium in context. A medium CVSS score on the authentication system protecting all customer data becomes a critical in context.
        </P>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Rating</th>
              <th style={s.th}>CVSS range</th>
              <th style={s.th}>Characteristics</th>
              <th style={s.th}>Typical remediation SLA</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Critical', '9.0–10.0', 'Unauthenticated RCE, SQLi with full DB access, credential dump', '24–48 hours'],
              ['High', '7.0–8.9', 'Authenticated RCE, IDOR accessing all records, privilege escalation to admin', '7 days'],
              ['Medium', '4.0–6.9', 'Stored XSS, CSRF on sensitive action, information disclosure', '30 days'],
              ['Low', '0.1–3.9', 'Reflected XSS, missing security headers, verbose errors', '90 days'],
              ['Informational', 'N/A', 'Best practice deviations, hardening opportunities, not directly exploitable', 'No SLA'],
            ].map(([r, c, ch, sla]) => (
              <tr key={r}>
                <td style={{ ...s.td, fontWeight: 600, color: r === 'Critical' ? '#ff4757' : r === 'High' ? '#ffa502' : r === 'Medium' ? '#ffdd59' : r === 'Low' ? '#2ed573' : '#aaa' }}>{r}</td>
                <td style={s.td}>{c}</td>
                <td style={s.td}>{ch}</td>
                <td style={{ ...s.td, fontFamily: 'monospace', fontSize: 13 }}>{sla}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Part>

      <HR />

      <Part>
        <H>Pentest Certifications That Matter in the US Job Market</H>
        <P>
          Penetration testing roles almost universally require or prefer certifications. The US market has settled on a clear hierarchy:
        </P>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Certification</th>
              <th style={s.th}>Issuer</th>
              <th style={s.th}>Format</th>
              <th style={s.th}>Market value</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['OSCP (Offensive Security Certified Professional)', 'Offensive Security', '24hr practical exam — get shells on 5 machines', 'Gold standard for pentest roles. Required or preferred in most US job postings'],
              ['CEH (Certified Ethical Hacker)', 'EC-Council', 'Multiple choice exam', 'Widely listed in job postings but dismissed by practitioners — better than nothing for HR filters'],
              ['PNPT (Practical Network Penetration Tester)', 'TCM Security', '5-day practical exam with report', 'Highly respected for entry-level, cheaper than OSCP, good bridge cert'],
              ['eJPT (eLearnSecurity Junior Penetration Tester)', 'INE Security', 'Practical lab exam', 'Good starter cert — no prior experience required'],
              ['GPEN / GWAPT', 'SANS / GIAC', 'Multiple choice + practical', 'Respected, expensive (~$8K with training), preferred in government/DoD'],
              ['OSEP / OSED', 'Offensive Security', 'Advanced practical exam', 'For experienced pentesters — evasion and exploit development focus'],
            ].map(([c, i, f, m]) => (
              <tr key={c}>
                <td style={{ ...s.td, fontWeight: 600 }}>{c}</td>
                <td style={s.td}>{i}</td>
                <td style={s.td}>{f}</td>
                <td style={{ ...s.td, color: m.startsWith('Gold') ? '#2ed573' : 'inherit' }}>{m}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <P>
          The recommended path for a US-market career in penetration testing: <Hl>eJPT → PNPT → OSCP</Hl>. Each builds skills required by the next. OSCP opens most senior pentest doors and provides a 20–30% salary premium over non-certified candidates.
        </P>
      </Part>

      <HR />

      <Part>
        <H>Workplace Scenario — A Fortune 500 External Pentest</H>
        <P>
          A financial services firm hires a penetration testing firm for a two-week external black-box assessment of its public-facing infrastructure. Scope: all IPs and domains registered to the company. Budget: $25,000.
        </P>
        <P>
          <Hl>Day 1–2 (Reconnaissance):</Hl> Testers enumerate 847 subdomains via certificate transparency logs and DNS brute force. They identify 23 servers running outdated software via Shodan, find an internal Confluence wiki inadvertently exposed via a misconfigured firewall rule, and discover employee email addresses on LinkedIn that match a breached credential dump from 2022.
        </P>
        <P>
          <Hl>Day 3–5 (Scanning and Enumeration):</Hl> Systematic port scanning identifies a publicly accessible Jenkins server (TCP 8080) and a forgotten dev environment at <code>dev-old.corp.example.com</code> running Apache 2.4.49 — vulnerable to CVE-2021-41773 (path traversal + RCE, CVSS 9.8).
        </P>
        <P>
          <Hl>Day 6–8 (Exploitation):</Hl> The Apache CVE is confirmed exploitable — remote code execution without authentication. The testers get a shell as the <code>www-data</code> user. Separately, credential stuffing with the 2022 leaked credentials succeeds on two employee VPN accounts (the employees reused passwords).
        </P>
        <P>
          <Hl>Day 9–10 (Post-Exploitation):</Hl> From the Apache shell, internal network access reveals a backup S3 bucket accessible from the server's IAM role — containing 11 months of encrypted database backups. The VPN account pivot reaches the internal employee portal but hits MFA, containing the breach path.
        </P>
        <P>
          <Hl>Day 11–12 (Reporting):</Hl> The team documents 3 critical, 7 high, 12 medium, and 18 low/informational findings. The executive summary: <Hl>"An unauthenticated attacker could gain remote code execution on your public web server and access encrypted database backups. Two employee VPN accounts are compromised using publicly available breach data."</Hl> The client immediately patches the Apache server, rotates the IAM credentials, and enforces MFA on VPN — all before the final report is delivered.
        </P>
        <ProTip>
          The most valuable pentest engagements find the same things real attackers would find on the first day of targeting your company — not the exotic 0-days that require nation-state capabilities. CVE-2021-41773 was patched in October 2021. The dev server had not been touched since 2020.
        </ProTip>
      </Part>

      <HR />

      <Part>
        <H>Interview Questions — Penetration Testing Methodology</H>
        <IQ q="What is the difference between a vulnerability assessment and a penetration test?">
          A vulnerability assessment identifies and catalogues vulnerabilities — it uses automated scanners (Nessus, Qualys) to produce a list of potential weaknesses, rated by severity. It does not confirm exploitability. A penetration test attempts to actively exploit vulnerabilities to demonstrate real-world impact — it answers "can an attacker actually use this, and how far can they get?" A pentest produces a narrative attack path with proof-of-concept evidence, not just a list. Vulnerability assessments are broader and faster; penetration tests are narrower and deeper. Most organisations need both on a regular schedule.
        </IQ>
        <IQ q="What must you have before starting a penetration test, and why?">
          Three things: a Statement of Work (contract defining scope and deliverables), a Rules of Engagement document (what is in/out of scope, allowed techniques, emergency contacts, working hours), and a signed permission-to-test letter from an executive with authority over the target systems. You need all three because the CFAA makes accessing computers without authorisation a federal crime — verbal permission is not a defence. The RoE is especially critical because it defines the operational boundaries that prevent you from accidentally causing harm or exceeding your authorisation. Even with good intent, going beyond the agreed scope is a criminal offence.
        </IQ>
        <IQ q="Walk me through the five phases of a penetration test.">
          Phase 1 is reconnaissance — passive and active information gathering about the target: subdomains, IP ranges, employee names, tech stack, exposed services. Phase 2 is scanning and enumeration — actively probing discovered targets to identify running services, versions, and configurations. Phase 3 is exploitation — using discovered vulnerabilities to gain initial access, generating a foothold with thorough documentation of every action. Phase 4 is post-exploitation — demonstrating business impact from the foothold: what data is accessible, what lateral movement is possible, how far toward the crown jewels can an attacker reach. Phase 5 is reporting — documenting all findings with proof-of-concept evidence, CVSS ratings, business impact context, and precise remediation steps for two audiences: executives (risk context) and engineers (technical detail).
        </IQ>
        <IQ q="What should a pentest report include for each finding?">
          Each finding should include: a title and severity rating (with CVSS vector), the affected system and vulnerable component, a clear description of the vulnerability, a step-by-step proof of concept that a developer can reproduce in their own environment, a screenshot or request/response showing exploitation, a clear statement of business impact, specific remediation steps with estimated developer effort, and relevant references (CWE, CVE, OWASP). The proof of concept is the most important element — without it, developers cannot confirm they fixed the right thing, and the client cannot verify remediation was successful.
        </IQ>
        <IQ q="An automated scanner reports 500 findings. How do you prioritise what to include in the report?">
          Automated scanner output is the starting point, not the final report. First, manually verify every finding — scanners have high false-positive rates (30–60% for some tools). Unverified findings waste the client's remediation time and destroy your credibility. After verification, prioritise by exploitability (can I actually exploit this from the attacker position in scope?) and impact (what is the worst-case outcome if exploited?). Combine these into a contextual severity rating — a theoretically critical CVE on an isolated dev server might rate as medium in this engagement. Report what matters, not everything the scanner found. An appendix with the full scanner output is appropriate for completeness, clearly labelled as unverified automated output.
        </IQ>
      </Part>

      <HR />

      <Part>
        <H>Common Mistakes — Penetration Testing</H>
        <Err
          title="Testing without written authorisation"
          cause="A manager says 'go ahead and test it' verbally, or a developer gives you credentials 'for testing'. Without a signed permission letter from someone with legal authority over the systems, you have no legal protection under the CFAA."
          fix="Stop. No test begins without three signed documents: SOW, RoE, and permission-to-test letter. If the client resists paperwork, that is a red flag about the engagement. Protect yourself legally — no verbal authorisation is ever sufficient."
        />
        <Err
          title="Exceeding scope during exploitation"
          cause="You find a server that is clearly the same organisation but not listed in the RoE. You test it anyway because 'it seems like it should be in scope'. This is a CFAA violation regardless of the target organisation's identity."
          fix="Scope is defined by the RoE document, not by your judgement about what seems related. If you discover assets that appear relevant but are out of scope, document them and notify the client contact — they can amend the scope. Never test without explicit inclusion in the signed RoE."
        />
        <Err
          title="Destroying data or causing downtime"
          cause="Running aggressive exploits, uploading webshells that other attackers find, triggering buffer overflows on production services, or running sqlmap with --level=5 on a production database causing it to crash."
          fix="Never run destructive techniques on production systems. Stage exploits in a test environment first. Understand what a tool does before running it. When in doubt, ask the client contact whether the system can tolerate the technique. Causing downtime in a pentest makes you liable and ends the engagement."
        />
        <Err
          title="Reporting scanner output without manual verification"
          cause="Running Nessus and submitting the HTML report as the deliverable. Automated scanners report theoretical vulnerabilities — many are false positives, and none demonstrate real exploitability or business impact."
          fix="Manually verify every finding before it enters the report. A finding with no proof of concept has no business being rated Critical. Verified exploitation with screenshots and request/response captures is what clients pay for — it is what separates a professional penetration test from a scan."
        />
        <Err
          title="Forgetting to document actions in real time"
          cause="You pop a shell, pivot through three servers, and reach the domain controller — then try to reconstruct your path two days later for the report. You cannot remember which command you ran at 2am, the screenshots are blurry, and you have no timestamps."
          fix="Log everything in real time. Use a terminal multiplexer with logging (tmux + script), keep a timestamped notes file, take screenshots immediately. Tools like Tmux-Logging or CherryTree help structure notes. The report is only as good as your real-time documentation."
        />
      </Part>

      <HR />

      <KeyTakeaways items={[
        'A penetration test requires explicit written authorisation before any work begins. The CFAA makes unauthorised computer access a federal crime — verbal permission is not a legal defence.',
        'The three required documents are: Statement of Work (contract), Rules of Engagement (operational constraints), and a signed permission-to-test letter from an executive with authority over the target systems.',
        'The five phases are: Reconnaissance → Scanning and Enumeration → Exploitation → Post-Exploitation → Reporting. Skipping phases produces incomplete results.',
        'Grey-box testing (some knowledge provided) produces the best ROI for most engagements — it spends time on finding vulnerabilities, not rediscovering publicly known information.',
        'Every action during a pentest must be documented in real time: timestamp, command, output, screenshot. Without documentation, the finding cannot be reported.',
        'The penetration test report has two audiences: executives need risk context in plain language; engineers need precise technical detail to remediate. Both sections are required.',
        'Each finding requires a proof of concept — a reproducible demonstration of exploitation. Theoretical findings from automated scanners without manual verification have no place in a professional report.',
        'Scope is defined by the signed RoE document. Systems not listed in scope are off-limits regardless of how related they appear. Exceeding scope is a crime.',
        'The recommended US-market certification path is eJPT → PNPT → OSCP. OSCP is the gold standard and is required or preferred by most professional penetration testing firms.',
        'The most impactful pentest findings are usually the same things real attackers find on day one: unpatched CVEs on internet-facing services, reused credentials from breach data, and misconfigured cloud storage.',
      ]} />

      <HR />

      <Callout type="info">
        Penetration testing methodology gives you the professional framework. In{' '}
        <Link href="/learn/cybersecurity/reconnaissance-osint">
          Module 22: Reconnaissance and OSINT
        </Link>
        , you go deep on Phase 1 — the systematic techniques professionals use to map an organisation's attack surface before touching a single target: certificate transparency, DNS enumeration, OSINT frameworks, and building a target profile that drives every subsequent phase.
      </Callout>
    </LearnLayout>
  )
}
