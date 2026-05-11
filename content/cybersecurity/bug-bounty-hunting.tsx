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

export default function Module38() {
  return (
    <LearnLayout
      title="Bug Bounty Hunting — From Beginner to First Valid Report"
      description="Earn money finding real vulnerabilities. Learn how to choose programmes, build a recon workflow, escalate findings into high-severity reports, and develop a reputation on HackerOne and Bugcrowd."
      section="Cybersecurity — Module 38"
      readTime="36 min"
      updatedAt="May 2026"
    >

      <Part title="What Is Bug Bounty Hunting?">
        <P>
          Bug bounty programmes are agreements where organisations pay researchers to find and responsibly disclose security vulnerabilities. Companies get crowdsourced security testing from thousands of skilled researchers; researchers get legal permission to test and financial rewards for valid findings.
        </P>
        <P>
          The global bug bounty market pays out over $300 million annually. Top researchers earn six-figure incomes. The median payout for a critical vulnerability on HackerOne is approximately $10,000. <Hl>But most beginners make nothing for the first 3-6 months</Hl> — the learning curve is steep, competition is intense, and skill development takes time.
        </P>

        <H>The Major Platforms</H>
        <div style={{ overflowX: 'auto', marginBottom: 20 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: `${C}22` }}>
                {['Platform', 'Focus', 'Beginner Friendly?', 'Notable Programmes'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', color: C, fontWeight: 700, border: `1px solid ${C}33` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['HackerOne', 'Largest platform; enterprise + government', 'Yes — public programmes with wide scope', 'DoD, Uber, Spotify, Twitter, PayPal'],
                ['Bugcrowd', 'Enterprise-focused; strong VDP programmes', 'Yes — many public programmes', 'Tesla, Mastercard, Red Bull, Netgear'],
                ['Intigriti', 'European-focused; growing globally', 'Moderate', 'Coca-Cola, BMW, European banks'],
                ['Synack', 'Invitation-only (vetted researchers)', 'No — requires vetting', 'US government, high-value targets'],
                ['YesWeHack', 'European platform', 'Moderate', 'French government, tech companies'],
                ['Open Bug Bounty', 'No fees; responsible disclosure only', 'Yes — no registration needed', 'Websites with XSS/CSRF/SQLi'],
              ].map(([p, f, b, n], i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : `${C}08` }}>
                  {[p, f, b, n].map((c, j) => (
                    <td key={j} style={{ padding: '9px 14px', color: 'var(--text)', border: `1px solid ${C}22`, fontSize: 13 }}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <H>Programme Types</H>
        <Block>{`Bug bounty programme types:

Public programme:
  - Open to all registered researchers
  - Higher competition (more hunters looking)
  - Good starting point — no invitation needed

Private / invitation-only programme:
  - Invitation based on reputation, skills, or previous reports
  - Less competition — higher chance of finding bugs
  - Accessed by building reputation on public programmes first

Vulnerability Disclosure Programme (VDP):
  - No monetary reward — recognition and thanks only
  - Useful for building reputation if bounties are blocked
  - Many government agencies run VDPs (US Air Force, DoD)

Live hacking event (LHE):
  - In-person or virtual events with select researchers
  - Coordinated time window; bonuses for critical findings
  - By invitation (usually top-ranked researchers)

Private bug bounty (direct with company):
  - Company hires you directly as a researcher
  - Negotiated scope and terms
  - Typically for senior researchers with track record`}
        </Block>

        <IQ
          q="Is bug bounty hunting a good way to get into cybersecurity?"
          a="Yes, but not as a first step. Bug bounty hunting rewards applied skill — you need to be able to find real vulnerabilities in production systems against experienced developers who have hardened their code. Beginners who jump straight to bug bounty typically spend months getting duplicate reports (someone found it first), out-of-scope rejections, and N/A (not a vulnerability) responses. The better path: build skills through TryHackMe, HackTheBox, and web exploitation labs first. Learn OWASP Top 10 deeply. Practice on deliberately vulnerable apps (DVWA, PortSwigger Web Security Academy — all free). Once you can reliably find vulnerabilities in controlled environments, move to private or VDP programmes, then public bounty programmes. Bug bounty is an excellent supplement to a security career — it provides real-world experience, income, and a portfolio that demonstrates practical skill."
        />
      </Part>

      <HR />

      <Part title="Choosing the Right Programme">
        <P>
          Not all programmes are equally good for beginners. Wide scope, active response, and fair payouts make the difference between a productive hunting experience and months of frustration.
        </P>

        <H>Programme Selection Criteria</H>
        <Block>{`Evaluate a programme before spending time on it:

1. Scope — what can you test?
   GOOD: "*.example.com" (wildcard — many assets, more attack surface)
   BAD:  "www.example.com/contact-us only" (one page — nothing to find)
   Check: Does scope include APIs, mobile apps, infrastructure?

2. Response time and ratio
   On HackerOne: check "median time to first response" and "% resolved"
   GOOD: < 5 days first response, > 80% resolved rate
   BAD:  > 30 days first response — reports go unread for weeks

3. Payout reputation
   Check HackerOne's "Hall of Fame" and researcher comments
   Red flags: "we don't pay for this type of vulnerability" applied inconsistently
   Look for: clear severity-to-payout table in the programme policy

4. Competition level
   New private programme: few researchers, many uncharted bugs
   Mature public programme (Google, Facebook): extremely competitive, most bugs found

5. Technology stack
   Match your skills to the programme:
   - Strong in PHP/WordPress: target smaller companies with WordPress sites
   - Strong in API security: target API-heavy platforms
   - Strong in iOS/Android: look for mobile-focused programmes

Beginner-friendly programmes to start with:
  - US DoD Vulnerability Disclosure Program (hackerone.com/dod)
  - HackerOne public programmes with recent activity
  - Bugcrowd's university/student-friendly programmes
  - PortSwigger Web Security Academy (learning labs, not a real programme,
    but best training resource available)`}
        </Block>

        <H>Reading the Policy — What NOT to Test</H>
        <Block>{`Critical policy reading — you are legally bound by the scope:

Always check for explicit exclusions:
  - "Denial of service attacks are out of scope" — never test DoS
  - "Social engineering is out of scope" — no phishing of employees
  - "Third-party services are out of scope" — don't test their vendors
  - "Rate limiting is not a valid finding" — they won't pay for it

Test environment vs production:
  Some programmes want testing ONLY on staging environments
  NEVER test on production systems if policy says staging only
  If unclear: ask the programme's triage team BEFORE testing

Data handling requirements:
  "Do not exfiltrate data" — even if you find SQLi, do not download the DB
  "Do not access other users' data" — use your own test accounts
  "Do not modify or delete data" — read-only exploitation only

Safe harbour language:
  Most good programmes include "safe harbour" stating they won't pursue legal action
  for good-faith testing within scope. Verify this clause exists before testing.
  Without it: even legitimate testing may have legal risk (CFAA in the US).`}
        </Block>
      </Part>

      <HR />

      <Part title="Recon Workflow for Bug Bounty">
        <P>
          Bug bounty hunting is primarily a recon game — most successful hunters spend 60-70% of their time on reconnaissance to build a comprehensive map of the attack surface before touching any specific endpoint.
        </P>

        <H>Subdomain Enumeration</H>
        <Block>{`# Comprehensive subdomain enumeration workflow

# Step 1: Passive enumeration (no direct contact with target)
# amass — comprehensive OSINT-based enumeration
amass enum -passive -d example.com -o amass_passive.txt

# subfinder — fast, many data sources
subfinder -d example.com -o subfinder.txt -all

# crt.sh — certificate transparency logs
curl -s "https://crt.sh/?q=%.example.com&output=json" | \
  jq -r '.[].name_value' | sort -u > crtsh.txt

# Combine all sources
cat amass_passive.txt subfinder.txt crtsh.txt | sort -u > all_subdomains.txt
wc -l all_subdomains.txt   # know your attack surface size

# Step 2: Resolve live hosts
# httpx — probe which subdomains have live web servers
httpx -l all_subdomains.txt -o live_hosts.txt \
  -status-code -title -tech-detect -follow-redirects

# Step 3: Screenshot all live hosts
# gowitness — take screenshots at scale
gowitness file -f live_hosts.txt --screenshot-path ./screenshots/

# Step 4: Identify interesting targets from screenshots
# Look for: admin panels, login pages, unusual apps, internal-looking pages
# Most valuable: internal tools accidentally exposed, dev/staging environments`}
        </Block>

        <H>Content Discovery</H>
        <Block>{`# Find hidden endpoints, admin panels, backup files

# ffuf — fast web fuzzer (best for directory/endpoint discovery)
# Standard directory discovery
ffuf -u https://target.com/FUZZ -w /usr/share/seclists/Discovery/Web-Content/raft-medium-directories.txt \
  -mc 200,201,301,302,401,403 -t 50 -o ffuf_dirs.json

# API endpoint discovery (REST API pattern)
ffuf -u https://api.target.com/FUZZ -w /usr/share/seclists/Discovery/Web-Content/api/api-endpoints.txt \
  -H "Authorization: Bearer YOUR_TOKEN" -mc 200,201,401

# Backup file discovery (common mistake — backup files left in web root)
ffuf -u https://target.com/FUZZ -w /usr/share/seclists/Discovery/Web-Content/raft-medium-files.txt \
  -e .bak,.old,.zip,.tar.gz,.sql,.env,.config -mc 200

# Parameter discovery (finding hidden parameters)
arjun -u https://target.com/api/user -m GET

# JavaScript file analysis (find hidden endpoints in JS)
# LinkFinder — extracts endpoints from JS files
python linkfinder.py -i https://target.com -d -o results.html

# Wayback Machine — historical endpoint discovery
# Find old endpoints that may still work
gau target.com | grep -E "\.js$" | sort -u > js_files.txt
gau target.com | grep -E "api|admin|login" | sort -u > interesting_urls.txt`}
        </Block>

        <H>GitHub Intelligence for Bug Bounty</H>
        <Block>{`# Companies often accidentally commit secrets, internal URLs, and API keys

# Search GitHub for company-related secrets
# Manually search: site:github.com "example.com" AND ("api_key" OR "password" OR "secret")

# truffleHog — scan GitHub repos for secrets
trufflehog github --org=targetcompany --only-verified

# gitrob — find sensitive files in GitHub organisations
gitrob analyze targetcompany

# What to look for in GitHub:
# 1. Hardcoded API keys (Stripe, Twilio, AWS, Slack)
# 2. Internal hostnames and IP addresses (admin panels, internal APIs)
# 3. Database connection strings (often in config files)
# 4. Commented-out code with credentials
# 5. Old branches with different security controls
# 6. .env files accidentally committed

# Common high-value finds:
# - AWS_ACCESS_KEY_ID in a config file → cloud account access
# - Stripe secret key → payment processing control
# - Internal API documentation revealing undocumented endpoints`}
        </Block>

        <H>Technology Fingerprinting</H>
        <Block>{`# Identify the technology stack to focus your attack

# whatweb — technology identification
whatweb https://target.com -v -a 3

# Wappalyzer (browser extension or CLI)
wappalyzer https://target.com

# Shodan — identify the infrastructure
shodan host 93.184.216.34    # search by IP
# Or search by org: shodan search org:"Target Company"

# wafw00f — detect WAF (important for testing approach)
wafw00f https://target.com

# Information from stack:
# WordPress → check for plugin vulnerabilities (wpvulndb.com)
# React SPA → look for client-side vulnerabilities, exposed API endpoints
# GraphQL → introspection enabled? IDOR via direct object references?
# Spring Boot → Actuator endpoints exposed? (/actuator/env, /actuator/heapdump)
# Django DEBUG=True → exposed debug page with settings
# PHP → file inclusion, RCE via upload if misconfigured`}
        </Block>

        <IQ
          q="How do top bug bounty hunters consistently find vulnerabilities in hardened targets?"
          a="Top hunters focus on attack surface that most researchers overlook. Rather than hammering the main application (which thousands of others have tested), they expand scope: new features released in the last 30 days, mobile apps, APIs, acquisition targets that are not yet integrated into the security programme, and developer-facing assets like internal tools or staging environments. They also invest heavily in automation: a custom tool that pings newly added subdomains every 6 hours, reads the programme changelog for new scope additions, and immediately fuzzes new assets — while most hunters sleep. Additionally, they specialise: instead of broad shallow coverage, they become experts in one vulnerability class (IDOR, OAuth misconfigurations, SSRF) and hunt it systematically across their entire target list. Deep specialisation finds complex, high-payout bugs that checklist hunters miss."
        />
      </Part>

      <HR />

      <Part title="High-Value Vulnerability Classes">
        <P>
          Focus on vulnerabilities with the highest expected payout-to-effort ratio. Automated scanners catch the easy stuff — what pays is what requires manual analysis and creative chaining.
        </P>

        <H>IDOR — Insecure Direct Object Reference</H>
        <Block>{`IDOR is the most common high-severity finding in bug bounty programmes.
It occurs when you can access another user's resources by changing an identifier.

Basic IDOR discovery:
  1. Create two test accounts (attacker: A@mail.com, victim: B@mail.com)
  2. Log in as B and perform actions: create documents, orders, profile updates
  3. Log in as A and attempt to access B's resources using observed IDs
  4. If A can read/modify/delete B's data: IDOR found

Common IDOR patterns:

// Numeric ID in URL — most obvious, often caught
GET /api/users/1234/profile    → try 1235, 1236

// UUID — harder, but worth testing
GET /api/orders/550e8400-e29b-41d4-a716-446655440000
// Find victim UUID from: email notifications, shared links, source code

// Indirect IDOR — through a reference object
POST /api/export
{"report_id": 42}   → change to another user's report_id

// IDOR in file download
GET /files/download?filename=invoice_1234.pdf
→ try invoice_1235.pdf, invoice_1.pdf

// IDOR via HTTP method change
PUT /api/users/1234   (your account)
PUT /api/users/1235   (another user — should be forbidden)

Burp Suite automation:
  - Use Intruder with a range payload (1-10000) on the user ID
  - Filter responses by unique response length (different length = different data)
  - Autorize extension: auto-tests all requests with a different user's cookie`}
        </Block>

        <H>OAuth and Authentication Misconfigurations</H>
        <Block>{`OAuth/SSO bugs can lead to account takeover — top-tier payouts

1. State parameter CSRF:
   // OAuth flow should include unpredictable state parameter
   GET /oauth/authorize?client_id=app&redirect_uri=...&state=RANDOM_VALUE
   // If state is missing or predictable: CSRF attack possible
   // Can lead to: account linking hijack (attacker's account linked to victim)

2. Open redirect in redirect_uri:
   // Some providers allow partial matching on redirect_uri
   GET /oauth/authorize?client_id=app&redirect_uri=https://evil.com/
   // If accepted: authorization code stolen by attacker's server

3. Code/token leakage in Referer header:
   // OAuth code appears in URL → if page loads third-party resources,
   // code appears in the Referer header of those requests
   GET /callback?code=SECRET_CODE  → loads analytics.js → Referer: /callback?code=SECRET_CODE
   // Result: code leaked to analytics provider

4. Token fixation in OAuth PKCE:
   // PKCE code_challenge must be validated against code_verifier
   // If validation is skipped: code interception attack possible

5. Insufficient token validation:
   // App accepts JWT tokens with any signature ("alg: none" attack)
   // Change "alg": "RS256" to "alg": "none" → remove signature → forge any claims

// Testing OAuth with Burp:
// 1. Capture entire OAuth flow in Proxy
// 2. Identify state, code, redirect_uri parameters
// 3. Replay requests with modified parameters
// 4. Check: does state change between requests? Is redirect_uri validated exactly?`}
        </Block>

        <H>SSRF — Server-Side Request Forgery</H>
        <Block>{`SSRF lets you make the server send requests to internal services

High-impact SSRF targets:
  - AWS EC2 IMDS: http://169.254.169.254/latest/meta-data/iam/security-credentials/
  - GCP metadata: http://metadata.google.internal/computeMetadata/v1/
  - Azure IMDS: http://169.254.169.254/metadata/instance?api-version=2021-02-01
  - Internal services: Redis, Elasticsearch, internal APIs (http://localhost:6379)

Common SSRF injection points:
  - URL/webhook parameters: ?url=, ?webhook=, ?callback=, ?image=
  - PDF generators (often fetch external URLs)
  - Import/export features (import from URL)
  - Image processors

# SSRF testing workflow:
# 1. Set up an out-of-band receiver (Burp Collaborator or interactsh)
interactsh-client   # generates a unique URL: abc123.oast.pro

# 2. Submit your collaborator URL in SSRF candidates
POST /api/process-url
{"url": "http://abc123.oast.pro/test"}

# 3. Check collaborator for DNS/HTTP callbacks (proves SSRF)
# 4. If callback received: test cloud metadata URL for credentials

# SSRF bypass techniques (when naive filter blocks 169.254.x.x):
# IPv6: http://[::ffff:a9fe:a9fe]/latest/meta-data/
# Decimal: http://2852039166/latest/meta-data/
# Hex: http://0xa9fea9fe/latest/meta-data/
# URL shortener redirect: https://tinyurl.com/→ 169.254.169.254
# DNS rebinding: DNS resolves to internal IP after WAF check`}
        </Block>

        <H>Business Logic Vulnerabilities</H>
        <Block>{`Business logic bugs are manual-only — scanners cannot find them
They often have high payout because they require understanding the application flow

Common business logic patterns:

1. Price manipulation:
   POST /cart/update {"item_id": 1, "quantity": 1, "price": 0.01}
   // Does server trust client-submitted price? If yes: buy anything for $0.01

2. Coupon/discount abuse:
   // Apply same coupon multiple times
   // Apply coupon to items explicitly excluded by terms
   // Chain multiple discount types not intended to stack

3. Race conditions (concurrent requests):
   // Two simultaneous requests to redeem a gift card
   // Two simultaneous transfers from same account
   // Use asyncio or Turbo Intruder (Burp extension) for parallel requests

   import asyncio, aiohttp
   async def redeem(session, code):
       async with session.post("/redeem", json={"code": code}) as r:
           return await r.json()

   async def race():
       async with aiohttp.ClientSession() as s:
           results = await asyncio.gather(*[redeem(s, "GIFT100") for _ in range(10)])
   asyncio.run(race())

4. Account takeover via password reset:
   // Request reset for victim@example.com
   // Check if host header injection changes the reset link domain
   POST /forgot-password
   Host: attacker.com
   {"email": "victim@example.com"}
   // If reset email contains http://attacker.com/reset?token=xxx → token stolen

5. Mass assignment:
   // PATCH /api/users/me  {"name": "new name", "role": "admin"}
   // If server blindly applies all submitted fields: privilege escalation`}
        </Block>
      </Part>

      <HR />

      <Part title="Writing a High-Quality Bug Report">
        <P>
          A mediocre vulnerability reported brilliantly pays more than a brilliant vulnerability reported mediocrely. Triage teams process hundreds of reports — clear, reproducible, impact-focused reports get prioritised and paid faster.
        </P>

        <H>Report Structure</H>
        <Block>{`Bug bounty report template:

**Title:** [Vulnerability Type] in [Component] — [Impact Summary]
Example: "IDOR in /api/users/{id} allows reading any user's private profile data"

**Severity:** Critical / High / Medium / Low
(Use CVSS v3.1 calculator for objective scoring)

**Description:**
2-3 sentences: what is the vulnerability, where is it, and what can an attacker do?
"The /api/v2/documents/{document_id} endpoint fails to verify that the
authenticated user owns the requested document. An attacker can enumerate
document IDs and read any user's private documents without authorisation."

**Steps to Reproduce:**
(Numbered, exact, reproducible — triage must be able to follow these)

1. Create two accounts:
   - Victim: victim@test.com (account ID: 54321)
   - Attacker: attacker@test.com (account ID: 54322)

2. Log in as victim@test.com and create a private document.
   Note the document ID from the URL: /documents/99887

3. Log out. Log in as attacker@test.com.

4. Send the following request:
   GET /api/v2/documents/99887
   Host: app.example.com
   Authorization: Bearer [attacker's token]

5. Observe: the response contains the victim's private document content.

**Impact:**
"An attacker can read all private documents belonging to any user by
enumerating document IDs (which are sequential integers from 1 to N).
This exposes potentially sensitive personal and business data of all
users on the platform. Estimated exposure: all N documents."

**Proof of Concept:**
[Screenshot: attacker's browser showing victim's document]
[Screenshot: response headers showing 200 OK with victim's content]
[Optional: short video walkthrough]

**Suggested Remediation:**
"Verify that the authenticated user's ID matches the document's owner_id
before returning document content. Example: SELECT * FROM documents
WHERE id = ? AND owner_id = current_user_id"`}
        </Block>

        <H>CVSS Scoring — Communicate Impact Objectively</H>
        <Block>{`CVSS v3.1 scoring for bug bounty reports:

Key metrics:
  Attack Vector (AV):      Network (N) / Adjacent (A) / Local (L) / Physical (P)
  Attack Complexity (AC):  Low (L) / High (H)
  Privileges Required (PR): None (N) / Low (L) / High (H)
  User Interaction (UI):   None (N) / Required (R)
  Scope (S):               Unchanged (U) / Changed (C)
  Confidentiality Impact:  None (N) / Low (L) / High (H)
  Integrity Impact:        None (N) / Low (L) / High (H)
  Availability Impact:     None (N) / Low (L) / High (H)

IDOR example scoring:
  AV:N / AC:L / PR:L / UI:N / S:U / C:H / I:N / A:N
  = CVSS 6.5 (Medium) for reading own-scope data

  AV:N / AC:L / PR:L / UI:N / S:C / C:H / I:H / A:N
  = CVSS 9.1 (Critical) if scope changed (admin data) or write access

Use the NVD CVSS calculator: nvd.nist.gov/vuln-metrics/cvss/v3-calculator`}
        </Block>

        <H>Common Report Rejection Reasons</H>
        <div style={{ overflowX: 'auto', marginBottom: 20 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: `${C}22` }}>
                {['Rejection Reason', 'What It Means', 'How to Avoid'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', color: C, fontWeight: 700, border: `1px solid ${C}33` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Duplicate', 'Someone else found it first', 'Move fast; hunt new features; automate notifications for scope changes'],
                ['N/A (Not Applicable)', 'Not a real security vulnerability', 'Understand security impact; missing rate limiting alone is usually N/A'],
                ['Out of Scope', 'Asset or vulnerability type excluded in policy', 'Read the entire policy BEFORE testing; when unsure, ask first'],
                ['Informational', 'Acknowledged but not rewarded (too low impact)', 'Chain vulnerabilities to demonstrate real impact; provide attack scenario'],
                ['Cannot Reproduce', 'Triage cannot follow your steps', 'Test your steps in a clean browser session before submitting; include screenshots'],
                ['Accepted — No Bounty', 'Fixed but programme chose not to pay', 'Check "bounty" vs "VDP" programme type before investing time'],
              ].map(([r, w, h], i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : `${C}08` }}>
                  {[r, w, h].map((c, j) => (
                    <td key={j} style={{ padding: '9px 14px', color: 'var(--text)', border: `1px solid ${C}22`, fontSize: 13 }}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <IQ
          q="You find a vulnerability that reveals user email addresses. How do you write the report to maximise the payout?"
          a="Frame the impact concretely and chain it to downstream attacks. Rather than 'email addresses can be seen', write: 'The /api/users endpoint returns email addresses for all users when queried with any valid authentication token (full enumeration possible). This enables: (1) targeted phishing campaigns against all users using their real email addresses; (2) credential stuffing attacks using these emails against other services; (3) privacy violation affecting approximately N users. An attacker could automate the enumeration and extract the full user list in under 10 minutes.' Include the mathematical scope: number of affected users, time to exploit, ease of automation. Attach a screenshot showing the enumeration working. Rate it using CVSS. This transforms a medium finding into a high by demonstrating the real attack chain — which is what triage teams need to justify higher payouts to their security leadership."
        />
      </Part>

      <HR />

      <Part title="Building Your Bug Bounty Workflow">
        <H>Automation Framework</H>
        <Block>{`# Automated monitoring for new scope and new subdomains
# When programmes add new domains, you want to be first on them

# notify — alert you on new subdomains
amass enum -passive -d example.com | anew known_subdomains.txt | notify -provider slack

# Fresh asset workflow (run daily via cron)
#!/bin/bash
TARGET="example.com"
DATE=$(date +%Y-%m-%d)

# Enumerate subdomains
subfinder -d $TARGET -all -silent | anew subdomains_$TARGET.txt | \
  # Probe only new subdomains
  httpx -silent -status-code -title -tech-detect | \
  anew live_hosts_$TARGET.txt | \
  # Alert on new live hosts
  notify -provider discord -bulk

# Nuclei scan on new hosts
cat live_hosts_$TARGET.txt | \
  nuclei -t technologies/ -t exposures/ -t cves/ \
    -severity critical,high -silent | \
  notify -provider slack

# Track programme changes
# Follow @ariane or use h1-update-bot to track HackerOne programme changes`}
        </Block>

        <H>Burp Suite Configuration for Bug Bounty</H>
        <Block>{`Essential Burp Suite setup for bug bounty:

Extensions to install (BApp Store + GitHub):
  Autorize:        Auto-test access control on all requests with a second account cookie
  Param Miner:     Discover hidden parameters via header/query fuzzing
  JS Miner:        Extract endpoints and secrets from JavaScript files
  403 Bypasser:    Test path-based authorization bypass techniques
  JWT Editor:      Modify and test JWT tokens (alg:none, key confusion)
  Turbo Intruder:  High-speed fuzzing for race conditions and rate limit testing
  Active Scan++:   Enhanced active scanning rules
  GAP:             Gather endpoints from JS and responses

Scope configuration:
  1. Add target to scope (Target > Scope > Add)
  2. Check "Use advanced scope control"
  3. Add wildcards: *.example.com
  4. Set proxy to filter in-scope only (reduces noise)

Useful Burp workflow:
  1. Crawl app while logged in — Burp captures all requests
  2. Review Target > Site Map for all observed endpoints
  3. Right-click any endpoint: "Send to Repeater" for manual testing
  4. Autorize: paste victim's cookie → all future requests auto-tested for IDOR
  5. Export full request list for ffuf wordlist generation`}
        </Block>

        <H>Responsible Disclosure Ethics</H>
        <Block>{`Bug bounty ethics — be the researcher you would want testing your own systems:

DO:
  ✓ Test only in-scope assets and vulnerability types
  ✓ Use your own test accounts; never access real user data
  ✓ Stop testing once you have proof of concept — do not go further than needed
  ✓ Report promptly — do not hoard vulnerabilities
  ✓ Give companies reasonable time to fix before public disclosure (90 days typical)
  ✓ Communicate professionally — triage are people doing their job

DON'T:
  ✗ Exfiltrate user data (even to prove impact — describe the exposure, do not download it)
  ✗ Modify or delete data
  ✗ Perform DoS attacks
  ✗ Escalate beyond demonstrating the vulnerability
  ✗ Threaten to publish unless paid (this is extortion — it is illegal)
  ✗ Share unpatched vulnerabilities publicly before disclosure period expires
  ✗ Test out of scope assets even if you find something interesting
  ✗ Use automated scanners aggressively against production systems

On grey areas — when in doubt, ask:
  "Is [X] in scope? I found [general description] and want to confirm I can test it"
  Better to spend 5 minutes confirming scope than to get a report rejected or face legal risk.`}
        </Block>

        <Err
          title="Submitting low-quality reports to rack up volume"
          bad="Submit every minor finding regardless of impact — self-XSS, missing security headers, username enumeration without account takeover chain — to build report count."
          good="Self-XSS requires physical access to the victim's browser — it is not a real attack. Missing headers are typically informational. Focus on reports that demonstrate real attacker impact. Low-quality reports damage your reputation with triage teams, reduce response priority on future reports, and get you filtered to lower priority queues on major programmes."
        />

        <Err
          title="Hitting out-of-scope targets"
          bad="While testing example.com, you notice that internal.corp-example.com is accessible. You test it because it looks interesting — it is not on the exclusion list."
          good="If it is not explicitly in scope, it is out of scope. 'Not explicitly excluded' does not mean in scope. Send a message to the programme: 'I found internal.corp-example.com while testing your programme — is this in scope?' If they say yes, test. If no response after 48 hours, treat as out of scope and move on."
        />

        <Err
          title="Giving up after duplicate reports"
          bad="Get 5 duplicate reports in a row and quit bug bounty, concluding there are no bugs left to find."
          good="Duplicates mean you are finding the right bugs too slowly. Speed up your recon — automate subdomain monitoring, be the first on new scope additions. Shift to hunting logic vulnerabilities and business-specific flaws that require deep application understanding, which are much harder for automation to find first. Top hunters welcome competition — it forces them to go deeper and find harder bugs."
        />

        <ProTip>Subscribe to programme changelog feeds and set up automated notifications when programmes add new scope. New scope means new attack surface that no one has tested yet — get there within 24 hours of the announcement and you have a first-mover advantage over thousands of other hunters.</ProTip>
      </Part>

      <HR />

      <KeyTakeaways items={[
        'Bug bounty platforms (HackerOne, Bugcrowd) provide legal permission to test in-scope systems — always read and stay within the programme policy, which is a legally binding scope document.',
        'Beginners should expect 3-6 months before a first valid payout — build skills on PortSwigger Web Security Academy and TryHackMe before hunting real programmes.',
        'Programme selection matters: choose wide scope, active response (under 5 days), clear payout tables, and technology matching your skills.',
        'Top hunters spend 60-70% of time on recon: subdomain enumeration (subfinder, amass, crt.sh), content discovery (ffuf), GitHub intelligence, and technology fingerprinting.',
        'IDOR is the most common high-severity bug bounty finding — systematically test all endpoints that reference user IDs with two accounts and the Autorize Burp extension.',
        'SSRF targeting cloud metadata endpoints (AWS IMDS: 169.254.169.254) is critical-severity — always test URL-accepting parameters against out-of-band collaborator URLs.',
        'Write reports in the format triage teams need: clear title with impact, exact reproducible steps, screenshots, CVSS score, and concrete attack scenario showing real-world damage.',
        'Never exfiltrate real user data to prove impact — describe the exposure, show that access is possible, and stop there. Downloading a database full of real user data to prove SQLi turns a bounty into a criminal case.',
        'Automate new scope notifications — new programme assets have no prior testing, giving first-mover advantage over thousands of other hunters.',
        'Build a reputation for quality over quantity — clean, well-written reports get faster responses, higher payouts, and invitations to private programmes.',
      ]} />

      <Callout type="info">
        <strong>Up Next — Module 39: Home Lab Setup</strong><br />
        Module 39 is your practical guide to building a cybersecurity home lab from scratch. You will set up a virtualisation environment, build a realistic vulnerable network with Active Directory, deploy security tools (SIEM, IDS, EDR), and create a safe space to practise every technique from this course without legal risk.
      </Callout>

    </LearnLayout>
  )
}
