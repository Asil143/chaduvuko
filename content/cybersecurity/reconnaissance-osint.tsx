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

export default function Module22() {
  return (
    <LearnLayout
      title="Reconnaissance — OSINT and Footprinting"
      description="Passive and active reconnaissance techniques used by professional penetration testers: DNS enumeration, certificate transparency, Shodan, Google dorks, theHarvester, Maltego, and building a complete target profile."
      section="Cybersecurity — Module 22"
      readTime="31 min"
      updatedAt="May 2026"
    >
      <Part>
        <P>
          Before a single exploit is launched, professional attackers — and penetration testers — spend significant time on reconnaissance. Intelligence gathered during recon shapes every decision that follows: which hosts to scan, which vulnerabilities to prioritise, which employees to target with phishing, which cloud services might be misconfigured.
        </P>
        <P>
          The defining characteristic of professional recon is being <Hl>systematic</Hl>. Amateurs get distracted by the first interesting thing they find. Professionals build a complete picture methodically, because the most valuable attack path is often not the obvious one — it is the forgotten dev server, the employee who reused their LinkedIn password, or the S3 bucket named after an internal project.
        </P>
        <Callout type="info">
          This module covers techniques used by penetration testers during authorised engagements and by defenders building attack surface inventories. These same techniques are used by threat actors — which is why defenders must understand them.
        </Callout>
      </Part>

      <HR />

      <Part>
        <H>Passive vs Active Reconnaissance</H>
        <P>
          The fundamental distinction in recon is whether you interact with the target directly:
        </P>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Type</th>
              <th style={s.th}>Definition</th>
              <th style={s.th}>Examples</th>
              <th style={s.th}>Detectability</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Passive', 'Information gathered from public sources — no packets sent to the target', 'WHOIS, crt.sh, Shodan, LinkedIn, GitHub search, Google dorks', 'Zero — target has no log of your activity'],
              ['Semi-passive', 'Normal-looking requests to target infrastructure that would not raise suspicion', 'DNS resolution, visiting the website, downloading public documents', 'Minimal — blends with regular traffic'],
              ['Active', 'Direct interaction that the target could detect: scanning, probing, fingerprinting', 'nmap port scan, banner grabbing, directory brute force, vulnerability scanning', 'Detectable — appears in server logs, IDS/IPS alerts'],
            ].map(([t, d, e, det]) => (
              <tr key={t}>
                <td style={{ ...s.td, fontWeight: 600, color: C }}>{t}</td>
                <td style={s.td}>{d}</td>
                <td style={s.td}>{e}</td>
                <td style={s.td}>{det}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <P>
          For professional engagements, passive and semi-passive recon is done first — it builds the target model cheaply and silently. Active recon (scanning) comes later, after scope is confirmed, because it is detectable and can alert the target.
          For red team engagements with evasion requirements, passive recon may be the only acceptable technique for weeks.
        </P>
      </Part>

      <HR />

      <Part>
        <H>DNS Enumeration — The Attack Surface Map</H>
        <P>
          DNS is a goldmine. Every subdomain is a potential service. A company with 50 subdomains has 50 attack surfaces to investigate. DNS records reveal mail providers, cloud infrastructure, CDN usage, and internal naming conventions.
        </P>
        <Block>{`# Basic DNS record types and what they reveal
dig A target.com        # IPv4 address — web server IPs
dig AAAA target.com     # IPv6 addresses
dig MX target.com       # mail servers (Google Workspace? Self-hosted Exchange?)
dig TXT target.com      # SPF, DKIM, DMARC records — email security posture
                        # Often reveals: "v=spf1 include:salesforce.com include:sendgrid.net"
                        # → tells you what SaaS tools they use
dig NS target.com       # nameservers (Cloudflare? Route53? Self-hosted?)
dig SOA target.com      # zone authority — may reveal internal hostnames
dig SRV _https._tcp.target.com  # service records — used by internal services

# Zone transfer — misconfigured servers leak all DNS records (rare but impactful)
dig AXFR @ns1.target.com target.com
# Most public-facing nameservers block AXFR — but internal ones often don't
# Test this on internal assessments


# Subdomain enumeration methods

# 1. Certificate transparency logs — most reliable, completely passive
# Every TLS certificate issued is logged publicly — including internal-looking ones
curl -s "https://crt.sh/?q=%25.target.com&output=json" | \
  jq -r '.[].name_value' | sort -u | grep -v '*'

# 2. DNS brute force — try common names against DNS
# SecLists provides wordlists optimised for subdomain discovery
gobuster dns -d target.com -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-20000.txt -t 50
# or:
ffuf -u "https://FUZZ.target.com" -w subdomains.txt -mc 200,301,302,403

# 3. theHarvester — aggregates multiple sources
theHarvester -d target.com -b all -l 500
# Sources: Google, Bing, DuckDuckGo, Baidu, Yahoo, LinkedIn, GitHub, Hunter.io, etc.

# 4. Amass — the most comprehensive subdomain enumeration tool
amass enum -d target.com -passive   # passive only
amass enum -d target.com -active    # includes brute force and scraping

# After finding subdomains — check which ones are alive
cat subdomains.txt | httpx -silent -status-code -title -tech-detect
# httpx probes each subdomain and reports status, title, tech stack`}</Block>
        <ProTip>
          Certificate transparency is the most reliable subdomain discovery technique because developers cannot opt out. Every TLS certificate issued for staging.target.com, internal-api.target.com, or dev-payments.target.com is publicly logged. Check crt.sh first — it often reveals infrastructure the company forgot they had exposed.
        </ProTip>
      </Part>

      <HR />

      <Part>
        <H>WHOIS and IP Intelligence</H>
        <P>
          WHOIS records reveal registrant information, nameservers, and registration history. IP intelligence correlates IP addresses with ownership, geolocation, ASN, and historical DNS resolutions.
        </P>
        <Block>{`# WHOIS — registrant info (often privacy-protected for personal domains)
whois target.com
# Look for: registrant org, admin email, creation/expiry date, nameservers

# Historical WHOIS — see registration history (useful if current data is privacy-protected)
# Tools: SecurityTrails, DomainTools (paid), WhoisXMLAPI

# IP ownership and ASN
whois 93.184.216.34            # raw IP WHOIS
curl -s https://ipapi.co/93.184.216.34/json/  # geolocation + ASN
# ASN lookup tells you if IPs are on their own network or cloud-hosted

# BGP data — what IP ranges does this company own?
# https://bgp.he.net/org/ACME-CORP shows all announced prefixes
# Useful for finding IPs not listed in DNS

# Reverse DNS — what hostname does an IP resolve to?
dig -x 93.184.216.34           # PTR record
# Common pattern: mail.target.com resolves to different IP from web server

# Historical DNS — what IP has target.com pointed to in the past?
# SecurityTrails, Passive Total, RiskIQ show historical A records
# Useful: find origin IP behind Cloudflare by looking at pre-Cloudflare history

# Shodan — internet-wide scan database
# What does Shodan know about this IP range?
# shodan.io query examples:
# org:"Target Corporation"          → all IPs attributed to the org
# hostname:target.com               → IPs with target.com in PTR record
# ssl.cert.subject.cn:target.com    → IPs with TLS cert for target.com
# net:192.0.2.0/24                  → everything in a CIDR range

# From the CLI:
shodan search --fields ip_str,port,org,hostnames 'org:"Target Corp"'
shodan host 93.184.216.34          # full details for one IP`}</Block>
        <P>
          Shodan is particularly valuable for finding exposed services that should not be public-facing. Every year it finds thousands of exposed <Hl>industrial control systems, database management interfaces, VPN endpoints</Hl>, and remote desktop services with no authentication.
        </P>
      </Part>

      <HR />

      <Part>
        <H>Google Dorks — Structured Public Search</H>
        <P>
          <Hl>Google dorks</Hl> are advanced search operators that narrow results to specific file types, sites, or content patterns. Security researchers use them to find exposed documents, login pages, and configuration files indexed by search engines.
        </P>
        <Block>{`# Site restriction
site:target.com                       # all indexed pages
site:target.com -www                  # exclude main site, find subdomains
site:target.com inurl:admin           # admin panels
site:target.com inurl:login           # login pages

# Sensitive files
site:target.com filetype:pdf          # PDF documents
site:target.com filetype:xlsx         # spreadsheets
site:target.com filetype:sql          # SQL dumps (sometimes exposed)
site:target.com ext:env               # .env files (dangerous if exposed)
site:target.com ext:config            # config files
site:target.com ext:bak               # backup files
site:target.com ext:log               # log files

# Content patterns
site:target.com intitle:"index of"    # directory listings
site:target.com "password" filetype:txt
site:target.com "api_key" OR "apikey" OR "secret_key"

# GitHub-specific dorks (github.com)
site:github.com "target.com" password
site:github.com "target.com" api_key
site:github.com "target.com" AWS_SECRET

# Version/tech disclosure
site:target.com intext:"Powered by WordPress 5.8"
site:target.com "Server: Apache/2.4.49"  # specific vulnerable version

# Google Hacking Database (GHDB) — searchsploit-style dork library
# exploit-db.com/google-hacking-database — 8,000+ categorised dorks
# Useful categories: Files Containing Passwords, Sensitive Directories, Vulnerable Servers`}</Block>
      </Part>

      <HR />

      <Part>
        <H>GitHub and Source Code Intelligence</H>
        <P>
          Developers frequently push sensitive information to public repositories: API keys, database credentials, internal hostnames, and architecture documentation. GitHub search is one of the highest-value passive recon techniques.
        </P>
        <Block>{`# GitHub search — find repositories related to target
# github.com/search?q=target.com&type=code

# What to search for on GitHub:
"target.com" password
"target.com" secret
"target.com" api_key
"target.com" db_password
"target.com" AKIA         # AWS access key prefix
"@target.com" token

# Organisation-specific:
org:target-corp filename:.env
org:target-corp filename:config.py password
org:target-corp filename:settings.py DATABASE

# Tool: truffleHog — scans for high-entropy strings (secrets) in git history
trufflehog github --org=target-corp --only-verified

# Tool: gitrob — finds sensitive files across GitHub orgs
gitrob analyze target-corp

# Tool: gitleaks — fast secret scanner
gitleaks detect --source /path/to/cloned/repo

# What to look for:
# - AKIA... (AWS access keys)
# - Passwords in config files
# - Private keys (-----BEGIN PRIVATE KEY-----)
# - Database connection strings with credentials
# - Internal API endpoints not listed in public docs
# - Internal hostname naming conventions (helps enumerate internal network later)
# - Architecture decisions, tech stack, deployment infrastructure

# Check commit history — developers often delete secrets but history remains
git log --all --full-history -- "**/.env"
git show <commit-hash>:.env   # view deleted file at specific commit`}</Block>
        <ProTip>
          Search GitHub for employee names and email domains rather than just the company name. Many developers work on side projects or open-source code that references their employer's infrastructure, naming conventions, or internal tools. These repositories are often not associated with the company's official GitHub organisation.
        </ProTip>
      </Part>

      <HR />

      <Part>
        <H>People and Organisational Intelligence</H>
        <P>
          An organisation's employees are part of its attack surface. Email addresses enable spear phishing and credential stuffing. Job listings reveal the tech stack. Employee LinkedIn profiles reveal internal tool names. Org chart data helps target privileged accounts.
        </P>
        <Block>{`# LinkedIn intelligence
# Manual: search "target company name" on LinkedIn
# Look for: CTO/CISO (high-value targets), IT admins, developers
# Job titles often contain system names: "Azure AD Administrator", "Okta Engineer"
# Job postings reveal: tech stack, internal tools, cloud providers

# Email format discovery
# 1. Pattern detection from known public emails
hunter.io           # email finder by domain — shows format (first.last@, f.last@)
clearbit.com        # similar, with additional enrichment
# 2. Validate guessed emails
verify-email.org    # SMTP validation without sending email
# 3. Scraping tools
theHarvester -d target.com -b linkedin,google,bing

# Email patterns to try (once format is identified):
# john.smith@target.com
# jsmith@target.com
# john_smith@target.com
# johnsmith@target.com

# Breach data — check if employees have credentials in known breaches
# haveibeenpwned.com API (use k-anonymity endpoint — does not leak email)
# DeHashed, Snusbase — paid, more complete (for authorised professional use)

# Social media intelligence
# Twitter/X: employees often post about outages, tech choices, internal projects
# Conference talks: SlideShare, YouTube — devs present internal architecture
# Medium/Dev.to: developers blog about their tech stack with real config examples

# Maltego — visual OSINT platform, automates relationship mapping
# Transforms: domain → subdomains → IPs → emails → LinkedIn profiles
# Community Edition is free; paid version has more data sources`}</Block>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Data type</th>
              <th style={s.th}>Attack value</th>
              <th style={s.th}>Tool</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Employee email addresses', 'Phishing targets, credential stuffing, O365 spray', 'Hunter.io, theHarvester, LinkedIn'],
              ['Job titles and departments', 'Identify high-privilege targets (IT admin, cloud engineer)', 'LinkedIn, company website'],
              ['Tech stack from job postings', 'Learn what vulnerabilities to prioritise', 'LinkedIn Jobs, Indeed, Glassdoor'],
              ['Employee GitHub repos', 'Leaked credentials, internal tool names, API patterns', 'GitHub search, gitrob'],
              ['Conference presentations', 'Internal architecture, naming conventions, tool choices', 'YouTube, SlideShare, conference sites'],
              ['LinkedIn connections', 'Org chart — who reports to whom, identify IT admin chain', 'LinkedIn'],
            ].map(([d, a, t]) => (
              <tr key={d}>
                <td style={{ ...s.td, fontWeight: 600 }}>{d}</td>
                <td style={s.td}>{a}</td>
                <td style={{ ...s.td, fontFamily: 'monospace', fontSize: 13 }}>{t}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Part>

      <HR />

      <Part>
        <H>Web Application Fingerprinting</H>
        <P>
          Before testing a web application, fingerprinting identifies the technology stack — web server, framework, CMS, CDN, WAF — so you test relevant vulnerabilities instead of guessing randomly.
        </P>
        <Block>{`# Manual fingerprinting — HTTP headers reveal a lot
curl -I https://target.com
# Response headers to examine:
# Server: nginx/1.18.0       → web server and version
# X-Powered-By: PHP/7.4.3    → application language and version
# X-Generator: Drupal 9      → CMS
# CF-RAY: abc123-DFW         → Cloudflare CDN
# X-Cache: HIT               → caching layer present

# Cookie names reveal frameworks:
# PHPSESSID  → PHP
# JSESSIONID → Java (Tomcat, JBoss)
# .ASPXAUTH  → ASP.NET
# laravel_session → Laravel
# _rails_session → Ruby on Rails

# Tool: WhatWeb — automated web technology fingerprinting
whatweb -a 3 https://target.com    # -a 3 = aggressive (more requests)
# Output: jQuery, Bootstrap, WordPress, Google Analytics, CDN, etc.

# Tool: Wappalyzer — browser extension + CLI
wappalyzer https://target.com

# CMS-specific scanners:
wpscan --url https://target.com --enumerate u,vp,vt
# WordPress: finds version, installed plugins (with CVEs), usernames

joomscan -u https://target.com
# Joomla: version, components, vulnerabilities

droopescan scan drupal -u https://target.com
# Drupal: version, themes, modules

# WAF detection — important to know before testing
wafw00f https://target.com
# Detects: Cloudflare, AWS WAF, Akamai, F5, ModSecurity, Imperva, etc.
# Knowing the WAF helps choose bypass techniques or adjust payload encoding

# JavaScript analysis — frontend code reveals API endpoints, keys, internal paths
# Browser DevTools → Sources → search for: api, key, secret, token, internal, localhost
# Tools: RetireJS (finds vulnerable JS libraries), LinkFinder (finds endpoints in JS)`}</Block>
      </Part>

      <HR />

      <Part>
        <H>Building a Target Profile — Putting It Together</H>
        <P>
          The output of reconnaissance is not a collection of screenshots — it is a structured <Hl>target profile</Hl> that drives every subsequent phase. A good target profile answers: what is the attack surface, where are the weakest entry points, and who are the highest-value targets?
        </P>
        <Block>{`TARGET PROFILE: AcmeCorp Financial Services
Assessment date: 2026-05-01
Scope: External black-box

━━ INFRASTRUCTURE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
IP Ranges (owned):
  - 203.0.113.0/24 (ASN 64496, primary data center)
  - 198.51.100.0/28 (ASN 64496, mail infrastructure)
  - Significant AWS presence (us-east-1, us-west-2)

Active subdomains (47 found):
  PRIORITY (likely containing auth or sensitive functions):
  - app.acmecorp.com        → main application (Cloudflare WAF)
  - admin.acmecorp.com      → admin panel (403 from external — investigate)
  - api.acmecorp.com        → REST API (JWT auth observed)
  - vpn.acmecorp.com        → Cisco AnyConnect VPN (port 443, 10443)
  - mail.acmecorp.com       → Microsoft Exchange (OWA accessible)

  INTERESTING (possibly forgotten/less hardened):
  - dev-api.acmecorp.com    → DEV environment, no WAF, different version headers
  - staging.acmecorp.com    → staging env, basic auth only (found via crt.sh)
  - jenkins.acmecorp.com    → Jenkins 2.289 (CVE-2021-21985 — check)
  - old.acmecorp.com        → Apache/2.2.15 (end of life 2017)

━━ TECHNOLOGY STACK ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Web:    Cloudflare CDN, nginx, React frontend
API:    Node.js/Express (X-Powered-By header on dev env)
Auth:   Okta SSO (identified from job posting + cookie names)
Mail:   Microsoft 365 (MX: acmecorp-com.mail.protection.outlook.com)
Cloud:  AWS (IAM policies in GitHub), some GCP (TXT records)
VPN:    Cisco AnyConnect
Monitoring: Datadog (referenced in job posts)

━━ CREDENTIALS / BREACH DATA ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3 employee email addresses found in known breach databases:
  - j.smith@acmecorp.com (LinkedIn: IT Systems Administrator)
  - m.jones@acmecorp.com (LinkedIn: Cloud Infrastructure Engineer)
  - a.kumar@acmecorp.com (LinkedIn: DevOps Lead)
  Recommendation: Priority targets for credential stuffing and phishing

━━ GITHUB FINDINGS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Repository "acme-infra" (public): Terraform code references S3 bucket
  names that match naming convention "acme-{env}-{service}"
- Commit 3f7a2b1 (deleted but in history): contained AWS access key
  AKIA... (now rotated per AWS credential report)
- Internal API base URL: https://internal-api.acmecorp.com (not in scope
  from external test but confirms internal network structure)

━━ ATTACK SURFACE PRIORITY ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
P1: jenkins.acmecorp.com — potentially unpatched CVE
P1: old.acmecorp.com — Apache 2.2 (EOL), multiple critical CVEs
P1: Credential stuffing against VPN/OWA with breach data
P2: staging.acmecorp.com — weaker controls than production
P2: dev-api.acmecorp.com — dev environment, potentially debug mode
P3: app.acmecorp.com — full testing through Cloudflare WAF`}</Block>
      </Part>

      <HR />

      <Part>
        <H>Defensive Use — Attack Surface Management</H>
        <P>
          Everything in this module is exactly what a defender should do to their own infrastructure before attackers do it for them. <Hl>Attack Surface Management (ASM)</Hl> is the practice of continuously discovering and inventorying your own external-facing assets.
        </P>
        <P>
          Many breaches start with an asset the security team did not know existed: a forgotten dev environment, an S3 bucket from an acquired company, an intern's test server that got added to a wildcard DNS record. Organisations typically discover 30–40% more external assets when they run a recon exercise against themselves than they have in their official asset inventory.
        </P>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>ASM practice</th>
              <th style={s.th}>Frequency</th>
              <th style={s.th}>Tool</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Certificate transparency monitoring', 'Real-time (alert on new certs)', 'certstream, Facebook CT Monitor'],
              ['Subdomain enumeration', 'Weekly', 'Amass, theHarvester'],
              ['Shodan/Censys scan of owned IPs', 'Monthly', 'Shodan API, Censys'],
              ['GitHub secret scanning', 'Continuous CI gate + daily org scan', 'GitHub Advanced Security, truffleHog'],
              ['Breach credential monitoring', 'Continuous', 'HaveIBeenPwned Enterprise, SpyCloud'],
              ['Domain monitoring (typosquatting)', 'Daily', 'dnstwist, OpenSquat'],
            ].map(([p, f, t]) => (
              <tr key={p}>
                <td style={{ ...s.td, fontWeight: 600 }}>{p}</td>
                <td style={s.td}>{f}</td>
                <td style={{ ...s.td, fontFamily: 'monospace', fontSize: 13 }}>{t}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Part>

      <HR />

      <Part>
        <H>Interview Questions — Reconnaissance and OSINT</H>
        <IQ q="What is the difference between passive and active reconnaissance?">
          Passive reconnaissance gathers information from public sources without sending any packets to the target — the target has no log of your activity. Examples: searching certificate transparency logs, reading WHOIS records, reviewing LinkedIn profiles, examining Shodan data. Active reconnaissance involves direct interaction with the target infrastructure — the target could detect it in server logs or IDS alerts. Examples: port scanning, DNS brute force, directory enumeration, web crawling. In professional engagements, passive recon is always done first to build a target model before making noise with active techniques.
        </IQ>
        <IQ q="How do certificate transparency logs help with subdomain discovery?">
          Certificate transparency (CT) is a public audit system for TLS certificates. Every CA must submit issued certificates to public CT logs, which are searchable. When a company issues a TLS certificate for any hostname — staging.internal.company.com, dev-payments.company.com, or any other subdomain — it appears in the public CT log within minutes. Querying crt.sh or similar CT search tools gives you every certificate ever issued for a domain, including subdomains the company may have forgotten about or considers non-public. Unlike DNS brute force, it is completely passive and finds names that are not guessable from a wordlist.
        </IQ>
        <IQ q="You discover employee email addresses in a breach database. What do you do with them?">
          This is credential stuffing and phishing context — valuable intelligence during an authorised pentest. The immediate actions: check if the breached password hashes can be cracked or if plaintext passwords are in the dataset; attempt these credentials against external services listed in the RoE (VPN, OWA, web application) with the rate limiting and account lockout restrictions defined in the RoE; document the finding regardless of whether login succeeds — the existence of employee credentials in a breach database is a reportable risk even without exploitation. If social engineering is in scope, these addresses become phishing targets. If not in scope, document for the credential stuffing finding only.
        </IQ>
        <IQ q="What does Shodan tell you that a regular port scan does not?">
          Shodan performs internet-wide scans continuously and stores historical data — it knows what services are exposed on IP addresses across the internet and can search that data without you sending a single packet to the target. You can query Shodan for all IPs attributed to an organisation, find services with specific banners or TLS certificate subjects, see historical data showing services that were exposed in the past, and cross-correlate IPs with vulnerability data. A regular port scan requires you to know the IP range, generates detectable traffic, and only captures the current state at scan time. Shodan answers "what does this company expose to the internet?" before you touch their infrastructure.
        </IQ>
        <IQ q="What is attack surface management and why do organisations underestimate their own attack surface?">
          Attack surface management is the continuous practice of discovering, inventorying, and monitoring all externally exposed assets. Organisations underestimate their attack surface for several structural reasons: shadow IT (teams deploy infrastructure without informing security), acquisitions (acquired companies bring assets not yet inventoried), dev/test environments (provisioned quickly, decommissioned slowly), and DNS sprawl (wildcard records or forgotten CNAMEs pointing to running services). Studies consistently find that organisations discover 30–40% more external assets when they run systematic recon against themselves than they have in their official CMDB. The assets outside the inventory are typically the least patched and monitored — making them prime attacker targets.
        </IQ>
      </Part>

      <HR />

      <Part>
        <H>Common Mistakes — Reconnaissance</H>
        <Err
          title="Stopping at the main domain and missing subdomains"
          cause="Testers enumerate target.com but miss dev.target.com, staging.target.com, and old.target.com — which are often less hardened, less monitored, and running older software versions."
          fix="Always run subdomain enumeration as the first active recon step. Use at minimum two techniques: certificate transparency (crt.sh) for comprehensive coverage and DNS brute force for names that may not have been issued TLS certificates. Then probe every live subdomain."
        />
        <Err
          title="Ignoring GitHub and source code repositories"
          cause="Teams focus on network infrastructure and skip code repository intelligence. GitHub is consistently one of the highest-value sources of credentials, architecture information, and internal naming conventions — and it is completely passive."
          fix="Always search GitHub for the company name, domain, and email format before touching any infrastructure. Use truffleHog or gitrob to scan for secrets in all public repositories associated with the target organisation. Check commit history — deleted files remain accessible in git history."
        />
        <Err
          title="Running active scans before confirming scope"
          cause="Testers run nmap against a broad IP range before verifying all IPs are in scope, inadvertently scanning cloud providers' shared infrastructure, CDN endpoints, or third-party services."
          fix="Resolve every subdomain and domain in scope to IPs before scanning. Verify that each IP is owned by the client (via WHOIS/ASN lookup) or explicitly included in the RoE. IPs belonging to cloud providers or CDNs without explicit client authorisation are out of scope — they are shared infrastructure."
        />
        <Err
          title="Recording only findings, not the full enumeration output"
          cause="Testers document interesting findings but discard the full subdomain list, full port scan output, and raw tool logs. When a client later disputes a finding or asks 'did you check X', there is no evidence."
          fix="Save all raw tool output to timestamped files organised by phase. Use a structured note-taking tool (CherryTree, Obsidian with a pentest template) and create a findings directory with subfolders for each phase. Evidence completeness is as important as finding quality."
        />
        <Err
          title="Treating Google dorks as a complete recon technique"
          cause="Google indexes a fraction of the web and may not have crawled recently deployed or low-traffic pages. Relying on Google dorks alone misses services that are not indexed."
          fix="Use Google dorks as one of many techniques, not the primary one. Combine it with certificate transparency, Shodan, theHarvester, and DNS enumeration. For each discovered subdomain, do independent investigation — Google may not know a site exists."
        />
      </Part>

      <HR />

      <KeyTakeaways items={[
        'Passive reconnaissance gathers intelligence from public sources with zero detectability. Certificate transparency logs, WHOIS, Shodan, GitHub, and LinkedIn reveal enormous amounts before touching a single target system.',
        'Certificate transparency is the most reliable subdomain discovery technique — every TLS certificate is publicly logged, including for internal-looking subdomains developers think are private.',
        'Shodan continuously scans the internet and stores service banners — it answers "what does this organisation expose?" before you send a single packet to the target.',
        'GitHub is consistently one of the highest-value recon sources. Developers commit API keys, database passwords, internal hostnames, and architecture documentation to public repositories.',
        'Google dorks use advanced search operators to find exposed config files, directory listings, login panels, and sensitive documents indexed by search engines.',
        'A complete target profile maps IP ranges, all live subdomains, technology stack, employee email addresses, and prioritises attack entry points before scanning begins.',
        'DNS enumeration reveals far more than just IP addresses: MX records identify mail providers, TXT records reveal SaaS tools (SPF includes), SRV records map internal services.',
        'Attack Surface Management applies these same recon techniques defensively — organisations typically discover 30–40% more external assets than in their official inventory when they run systematic reconnaissance against themselves.',
        'Active reconnaissance (nmap, directory brute force) is detectable — always run it after passive recon confirms scope and always verify IPs are client-owned before scanning.',
        'The most valuable attack paths are often not the obvious ones — they are the forgotten dev server, the expired SSL cert still accepting traffic, or the employee whose LinkedIn reveals they manage the domain controller.',
      ]} />

      <HR />

      <Callout type="info">
        Reconnaissance maps the attack surface. In{' '}
        <Link href="/learn/cybersecurity/scanning-enumeration">
          Module 23: Scanning and Enumeration
        </Link>
        , you move to active interaction: systematic port scanning techniques, service fingerprinting, vulnerability scanning with Nessus and Nuclei, and building the vulnerability hypothesis list that drives exploitation.
      </Callout>
    </LearnLayout>
  )
}
